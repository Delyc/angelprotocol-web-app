import { AiOutlineCheckCircle } from "react-icons/ai";
import { Step, SuccessStage } from "services/transaction/types";
import { setStage } from "services/transaction/transactionSlice";
import { useSetModal } from "components/Modal/Modal";
import getTxUrl from "helpers/getTxUrl";
import { useSetter } from "store/accessors";

export default function Success(props: SuccessStage) {
  if (props.step !== Step.success) throw new Error("wrong component rendered");
  const { hideModal } = useSetModal();
  const dispatch = useSetter();
  const { chainId, txHash, message, isReceiptEnabled } = props;

  function acknowledge() {
    if (isReceiptEnabled) {
      dispatch(setStage({ step: Step.receipt, chainId, txHash }));
    } else {
      dispatch(setStage({ step: Step.form }));
      hideModal();
    }
  }

  return (
    <div className="bg-white-grey grid p-4 rounded-md w-full shadow-lg min-h-115 content-center place-items-center">
      <AiOutlineCheckCircle className="text-blue-accent text-3xl mb-1" />
      <p className="text-center text-blue-accent mb-2 font-bold">{message}</p>

      <a
        href={getTxUrl(chainId, txHash)}
        target="_blank"
        rel="noreferrer noopener"
        className="text-center text-angel-blue cursor-pointer mb-6 text-sm"
      >
        view transaction details
      </a>

      <button
        onClick={acknowledge}
        className="bg-angel-orange text-white rounded-md uppercase py-1 px-4 font-bold"
      >
        {isReceiptEnabled ? "get receipt" : "ok"}
      </button>
    </div>
  );
}