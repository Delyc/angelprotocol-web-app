import { Dec } from "@terra-money/terra.js";
import { ErrorMessage } from "@hookform/error-message";
import { currency_text, denoms } from "constants/currency";
import { useFormContext } from "react-hook-form";
import Balance from "./Balance";
import { Values } from "./types";
import useStakerBalance from "./useStakerBalance";

export default function Amount() {
  const {
    watch,
    register,
    formState: { errors },
    setValue,
  } = useFormContext<Values>();
  const is_stake = watch("is_stake");
  const { balance, locked } = useStakerBalance(is_stake);
  const onMaxClick = () => {
    setValue("amount", balance.sub(locked).div(1e6).toFixed(3, Dec.ROUND_DOWN));
  };
  return (
    <div className="grid">
      <label
        htmlFor="amount"
        className="flex justify-between text-angel-grey font-bold items-end"
      >
        <span>{is_stake ? "Stake amount" : "Amount to withdraw"}</span>
        <Balance
          amount={balance.div(1e6).toNumber()}
          title={is_stake ? "Balance" : "Staked"}
        />
      </label>
      {!is_stake && (
        <Balance amount={locked.div(1e6).toNumber()} title={"Vote Locked"} />
      )}
      <span className="my-3 text-angel-grey italic text-xs">
        There is a 7 day wait period to unstake HALO. You will not be able to
        claim your HALO until this period has passed.
      </span>
      <div className="flex flex-wrap items-stretch border-b border-angel-blue border-opacity-20">
        <input
          {...register("amount")}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder={currency_text[denoms.uhalo]}
          className="flex-auto p-1 pl-0 outline-none text-angel-grey text-lg"
        />
        <div
          className="p-2 outline-none text-gray-400 text-sm hover:text-gray-800 cursor-pointer"
          onClick={onMaxClick}
        >
          max
        </div>
      </div>
      <ErrorMessage
        errors={errors}
        name="amount"
        as="span"
        className="text-red-400 text-xs mb-1 mt-0.5"
      />
    </div>
  );
}