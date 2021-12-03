import {
  SigningStargateClient,
  coin as create_coin,
  StdFee,
} from "@cosmjs/stargate";
import { Dec } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import { Values } from "components/Donater/types";
import handleTerraError from "./handleTerraError";
import useUSTEstimator from "./useUSTEstimator";
import Contract from "contracts/Contract";
import { useGetKeplr } from "wallets/Keplr";
import { chains } from "contracts/types";
import { terra_mainnet_rpc } from "wallets/info_terra_mainnet";
import { denoms } from "constants/currency";
import { useGetter, useSetter } from "store/accessors";
import { setStage } from "services/donation/donationSlice";
import { Wallets } from "services/wallet/types";
import { ap_wallets } from "constants/contracts";
import handleKeplrError from "./handleKeplrError";
import { Step } from "services/donation/types";
import useErrorHandler from "./useErrorHandler";

function useUSTSender() {
  const dispatch = useSetter();
  const active_wallet = useGetter((state) => state.wallet.activeWallet);
  const { reset, setValue } = useFormContext<Values>();
  const { provider } = useGetKeplr();
  const wallet = useConnectedWallet();
  const tx = useUSTEstimator();
  const handleError = useErrorHandler();

  //data:Data
  async function terra_sender() {
    try {
      if (!wallet) {
        setStage({
          step: Step.error,
          content: { message: "Wallet is disconnected" },
        });
        return;
      }

      dispatch(
        setStage({
          step: Step.submit,
          content: { message: "Submitting transaction.." },
        })
      );

      const response = await wallet.post(tx!);

      if (response.success) {
        dispatch(
          setStage({
            step: Step.broadcast,
            content: {
              message: "Transaction submitted, waiting for transaction result",
              url: `https://finder.terra.money/${wallet.network.chainID}/tx/${response.result.txhash}`,
            },
          })
        );

        const contract = new Contract(wallet);
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          dispatch(
            setStage({
              step: Step.success,
              content: {
                message: "Thank you for your donation!",
                url: `https://finder.terra.money/${wallet.network.chainID}/tx/${txInfo.txhash}`,
              },
            })
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
      handleTerraError(err, handleError);
    } finally {
      reset();
    }
  }

  async function keplr_sender(data: Values) {
    try {
      if (!provider) {
        setStage({
          step: Step.error,
          content: { message: "Wallet is disconnected" },
        });
        return;
      }

      provider.defaultOptions = {
        sign: { preferNoSetFee: true },
      };

      const offline_signer = provider.getOfflineSigner!(chains.mainnet);
      const accounts = await offline_signer.getAccounts();
      const address = accounts[0].address;

      const client = await SigningStargateClient.connectWithSigner(
        terra_mainnet_rpc,
        offline_signer
      );

      //this fee will be overriden by wallet
      //but can opt to override wallet config once fee estimation is clear
      //balance check will also be done by the wallet
      const gas_limit = "80000";
      const fee: StdFee = {
        //0.25utoken is recommended but num input here is required to be whole number
        amount: [create_coin(1, denoms.uusd)],
        gas: gas_limit,
      };

      const dec_amount = new Dec(data.amount).mul(1e6);

      dispatch(
        setStage({
          step: Step.submit,
          content: { message: "Submitting transaction.." },
        })
      );

      const res = await client.sendTokens(
        address,
        ap_wallets[denoms.uusd][chains.mainnet],
        [create_coin(dec_amount.toNumber(), denoms.uusd)],
        fee
      );

      if ("code" in res) {
        if (res.code !== 0) {
          dispatch(
            setStage({
              step: Step.error,
              content: {
                message: "Transaction failed",
                url: `https://finder.terra.money/${chains.mainnet}/tx/${res.transactionHash}`,
              },
            })
          );

          return;
        }
      }

      dispatch(
        setStage({
          step: Step.success,
          content: {
            message: "Thank you for your donation!",
            url: `https://finder.terra.money/${chains.mainnet}/tx/${res.transactionHash}`,
          },
        })
      );
    } catch (err) {
      handleKeplrError(err, handleError, denoms.uusd);
    } finally {
      setValue("amount", "");
    }
  }

  //choose sender depending on active wallet
  return active_wallet === Wallets.keplr ? keplr_sender : terra_sender;
}

export default useUSTSender;
