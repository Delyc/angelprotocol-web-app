import defaultIcon from "assets/images/angelprotocol-horiz-blu.png";
import { chains } from "contracts/types";
import { useAccountsQuery } from "services/aws/endowments/endowments";

export default function useDescription(address: string, chainID: string) {
  const isTest = chainID === chains.testnet;
  const { data } = useAccountsQuery(isTest);
  const details = data?.[address];

  const name = details?.name || "Charity";
  const description = details?.description || "Getting charity data...";

  const url = details?.url || "https://angelprotocol.io";
  const icon = details?.icon || defaultIcon;
  const iconLight = details?.iconLight;

  return { name, description, url, icon, iconLight };
}
