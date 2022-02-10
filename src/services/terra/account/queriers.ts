import { useConnectedWallet } from "@terra-money/use-wallet";
import Account from "contracts/Account";
import { account_api } from "./account";
import { holdings } from "./placeholders";

export function useEndowmentHoldings(address: string, skip = false) {
  const wallet = useConnectedWallet();
  const { useEndowmentHoldingsQuery } = account_api;
  const contract = new Account(address);
  const {
    data = holdings,
    isError,
    isLoading,
    isFetching,
  } = useEndowmentHoldingsQuery(contract.balance, {
    skip: skip || !wallet,
  });

  return {
    holdings: data,
    isHoldingsError: isError,
    isHoldingsLoading: isLoading || isFetching,
  };
}