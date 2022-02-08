import { useEffect } from "react";
import { ethers } from "ethers";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Dec } from "@terra-money/terra.js";
import { setIsUpdating, setWalletDetails } from "services/wallet/walletSlice";
import { useBalances, useHaloBalance } from "services/terra/queriers";
import { Providers, XdefiWindow } from "services/provider/types";
import { TerraIdentifiers } from "services/wallet/types";
import { chainIDs } from "constants/chainIDs";
import { denoms } from "constants/currency";
import { useSetter } from "store/accessors";

export default function useWalletUpdator(activeProvider: Providers) {
  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  const { main, others, terraBalancesLoading } = useBalances(denoms.uusd);
  const { haloBalance, haloBalanceLoading } = useHaloBalance();

  //updator for terra-station and wallet connect
  useEffect(() => {
    if (activeProvider !== Providers.terra) {
      return;
    }
    if (!wallet) {
      return;
    }

    if (
      //only run this updator when wallet is terra extension or leap-wallet or wallet-connect
      !(
        wallet.connection.identifier === TerraIdentifiers.station ||
        wallet.connection.identifier === TerraIdentifiers.leap ||
        wallet.connection.identifier === undefined
      )
    ) {
      return;
    }
    if (terraBalancesLoading || haloBalanceLoading) {
      dispatch(setIsUpdating(true));
      return;
    }
    //append halo balance
    const coinsWithHalo = [
      ...others,
      { amount: haloBalance, denom: denoms.uhalo },
    ];
    dispatch(
      setWalletDetails({
        id: wallet.connection.identifier || TerraIdentifiers.terra_wc,
        icon: wallet.connection.icon,
        displayCoin: { amount: main, denom: denoms.uusd },
        coins: haloBalance !== 0 ? coinsWithHalo : others,
        address: wallet.walletAddress,
        chainId: wallet.network.chainID as chainIDs,
        supported_denoms: [denoms.uusd, denoms.uluna],
      })
    );
    dispatch(setIsUpdating(false));
    //eslint-disable-next-line
  }, [wallet, activeProvider, terraBalancesLoading, haloBalanceLoading]);

  //updator of xdefi
  useEffect(() => {
    (async () => {
      try {
        if (activeProvider !== Providers.terra) {
          return;
        }
        if (!wallet) {
          return;
        }

        if (
          //only run this updator when wallet is terra extension or wallet connect
          !(wallet.connection.identifier === TerraIdentifiers.xdefi)
        ) {
          return;
        }

        if (terraBalancesLoading || haloBalanceLoading) {
          dispatch(setIsUpdating(true));
          return;
        }
        const xwindow: XdefiWindow = window;
        //xwindow.xfi.ethereum is guaranteed to be defined here since it's available on
        //wallet connection selection

        const provider = new ethers.providers.Web3Provider(
          xwindow.xfi?.ethereum!
        );
        const signer = provider.getSigner();
        const wei_balance = await signer.getBalance();
        const eth_balance = new Dec(parseInt(wei_balance.toHexString(), 16))
          .div(1e18)
          .toNumber();

        const coins_copy = [...others];
        coins_copy.push({ amount: eth_balance, denom: denoms.ether });

        dispatch(
          setWalletDetails({
            id: wallet.connection.identifier || TerraIdentifiers.terra_wc,
            icon: wallet.connection.icon,
            displayCoin: { amount: main, denom: denoms.uusd },
            coins: coins_copy,
            address: wallet.terraAddress,
            //for multi-chain wallets, should just be testnet or mainnet
            chainId:
              wallet.network.chainID === chainIDs.mainnet
                ? chainIDs.gen_mainnet
                : chainIDs.gen_testnet,
            supported_denoms: [denoms.uusd, denoms.ether, denoms.uluna],
          })
        );
        dispatch(setIsUpdating(false));
      } catch (err) {
        console.error(err);
      }
    })();
    //eslint-disable-next-line
  }, [wallet, activeProvider, haloBalanceLoading, terraBalancesLoading]);
}