import { useFormContext } from "react-hook-form";
import { useGetter } from "store/accessors";
import Amount from "./Amount";
import { Values } from "./types";
import useStake from "./useStake";
import Status from "../Status";
import Fee from "../Fee";

export default function StakeForm() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<Values>();
  const staker = useStake();

  return (
    <form
      onSubmit={handleSubmit(staker)}
      className="bg-white grid p-4 rounded-md w-full"
      autoComplete="off"
    >
      <Status />
      <Amount />
      <Fee />
      <button
        disabled={isSubmitting || form_loading || !!form_error}
        className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {form_loading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}