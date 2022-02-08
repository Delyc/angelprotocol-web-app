import toCurrency from "helpers/toCurrency";
import { useFormContext } from "react-hook-form";
import { useHaloBalance, useBalances } from "services/terra/queriers";
import { denoms } from "constants/currency";
import { Values } from "./types";
export default function Balance() {
  const { watch, setValue } = useFormContext<Values>();
  const { haloBalance } = useHaloBalance();
  const { main: ust_balance } = useBalances(denoms.uusd);
  const is_buy = watch("is_buy");
  const balance = is_buy ? ust_balance : haloBalance;

  function setAmount() {
    setValue("amount", `${balance}`);
  }

  return (
    <p className="ml-auto mr-1 text-xs font-light font-heading flex items-baseline text-angel-grey">
      <span className="mr-1 text-2xs font-semibold uppercase">balance</span>
      <button
        type="button"
        onClick={setAmount}
        className="inline hover:text-angel-blue"
      >
        {toCurrency(balance, 3, true)} {is_buy ? "UST" : "HALO"}
      </button>
    </p>
  );
}