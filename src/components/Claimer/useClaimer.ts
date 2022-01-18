import { useConnectedWallet } from "@terra-money/wallet-provider";
import useEstimator from "./useEstimator";
import Contract from "contracts/Contract";
import { useSetter } from "store/accessors";
import { setStage } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import useTxErrorHandler from "hooks/useTxErrorHandler";
import handleTerraError from "helpers/handleTerraError";
import { terra } from "services/terra/terra";
import { gov, tags, user } from "services/terra/tags";

function useClaimer() {
  const dispatch = useSetter();
  const handleTxError = useTxErrorHandler();
  const wallet = useConnectedWallet();
  const tx = useEstimator();

  async function claimer() {
    try {
      if (!wallet) {
        dispatch(
          setStage({
            step: Step.error,
            content: { message: "Wallet is disconnected" },
          })
        );
        return;
      }

      dispatch(
        setStage({
          step: Step.submit,
          content: { message: "Submitting transaction..." },
        })
      );

      const response = await wallet.post(tx!);

      dispatch(
        setStage({
          step: Step.broadcast,
          content: {
            message: "Waiting for transaction result",
            url: `https://finder.terra.money/${wallet.network.chainID}/tx/${response.result.txhash}`,
          },
        })
      );

      if (response.success) {
        const contract = new Contract(wallet);
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          dispatch(
            setStage({
              step: Step.success,
              content: {
                message: "HALO successfully claimed",
                url: `https://finder.terra.money/${wallet.network.chainID}/tx/${txInfo.txhash}`,
              },
            })
          );
          //refetch new data
          dispatch(
            terra.util.invalidateTags([
              { type: tags.gov, id: gov.staker },
              { type: tags.gov, id: gov.halo_balance },
              { type: tags.user, id: user.halo_balance },
            ])
          );
        } else {
          dispatch(
            setStage({
              step: Step.error,
              content: {
                message: "Transaction failed",
                url: `https://finder.terra.money/${wallet.network.chainID}/tx/${txInfo.txhash}`,
              },
            })
          );
        }
      }
    } catch (err) {
      console.error(err);
      handleTerraError(err, handleTxError);
    }
  }

  //choose sender depending on active wallet
  return claimer;
}

export default useClaimer;