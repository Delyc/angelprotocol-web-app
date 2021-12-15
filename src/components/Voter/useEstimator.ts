import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { CreateTxOptions, Dec } from "@terra-money/terra.js";
import Halo from "contracts/Halo";
import { denoms } from "constants/currency";
import useDebouncer from "hooks/useDebouncer";
// import useTerraBalance from "hooks/useTerraBalance";
import { useBalances, useHaloBalance } from "services/terra/hooks";
import { Values } from "./types";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { Vote } from "contracts/types";
import toCurrency from "helpers/toCurrency";
import { useGovStaker } from "services/terra/hooks";

export default function useEstimator() {
  const { watch } = useFormContext<Values>();
  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
  const { main: UST_balance } = useBalances(denoms.uusd);
  //TODO:check staked_balance instead
  const halo_balance = useHaloBalance();
  const wallet = useConnectedWallet();
  const gov_staker = useGovStaker();
  const amount = Number(watch("amount")) || 0;
  const vote = watch("vote");
  const poll_id = watch("poll_id") || "0";
  const debounced_amount = useDebouncer(amount, 300);
  const debounced_vote = useDebouncer<Vote>(vote, 300);
  const debounced_id = useDebouncer<string>(poll_id, 300);

  //TODO: check also if voter already voted
  useEffect(() => {
    (async () => {
      try {
        dispatch(setFormError(""));
        if (!wallet) {
          dispatch(setFormError("Wallet is disconnected"));
          return;
        }

        if (!debounced_amount) {
          dispatch(setFee(0));
          return;
        }

        if (poll_id === undefined || poll_id === "0") {
          dispatch(setFormError("Error getting poll info"));
          return;
        }

        //check if voter already voted
        const is_voted =
          gov_staker.locked_balance.find(
            ([_poll_id]) => _poll_id === +poll_id
          ) !== undefined;

        if (is_voted) {
          dispatch(setFormError("You already voted"));
          return;
        }

        //check if voter has enough staked
        const staked_amount = new Dec(gov_staker.balance).div(1e6);
        const vote_amount = new Dec(debounced_amount);

        if (vote_amount.gt(staked_amount)) {
          dispatch(
            setFormError(
              `You only have ${toCurrency(
                staked_amount.toNumber(),
                2
              )} HALO staked `
            )
          );
          return;
        }

        dispatch(setFormLoading(true));
        const contract = new Halo(wallet);
        const tx = await contract.createVoteTx(
          debounced_id,
          debounced_vote,
          debounced_amount
        );

        const estimatedFee = tx
          .fee!.amount.get(denoms.uusd)!
          .mul(1e-6)
          .amount.toNumber();

        //2nd balance check including fees
        if (estimatedFee >= UST_balance) {
          dispatch(setFormError("Not enough UST to pay fees"));
          return;
        }

        dispatch(setFee(estimatedFee));
        setTx(tx);
        dispatch(setFormLoading(false));
      } catch (err) {
        console.error(err);
        dispatch(setFormError("Error estimating transcation"));
      }
    })();
    //eslint-disable-next-line
  }, [
    debounced_amount,
    debounced_vote,
    debounced_id,
    wallet,
    UST_balance,
    halo_balance,
    gov_staker,
  ]);

  return tx;
}