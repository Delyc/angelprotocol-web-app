import { useFormContext } from "react-hook-form";
import { useGetter } from "store/accessors";
import { Values } from "./types";
import toCurrency from "helpers/toCurrency";

function Misc(props: { title: string; value: string }) {
  return (
    <div className="flex justify-between font-heading text-opacity-80 items-center text-xs text-angel-grey mt-1 mb-0.5">
      <p className="text-xs font-semibold uppercase">{props.title}</p>
      <p className="font-bold">{props.value}</p>
    </div>
  );
}

export function Fee() {
  const { fee } = useGetter((state) => state.transaction);
  return <Misc title="tx fee" value={`${toCurrency(fee, 3)} UST`} />;
}

export function Total() {
  const { watch } = useFormContext<Values>();
  const total_ust = watch("total_ust");
  return <Misc title="total" value={`${toCurrency(total_ust, 3)} UST`} />;
}

export function ToReceive() {
  const { watch } = useFormContext<Values>();
  const total_receive = watch("total_receive");
  return (
    <Misc title="to receive" value={`${toCurrency(total_receive, 3)} UST`} />
  );
}
