import DonateForm from "components/DonateForm/DonateForm";
import { ReactNode } from "react";
import { useGetter, useSetter } from "store/accessors";
import ErrPop from "./ErrPop";
import Submit from "./Submit";
import Broadcast from "./Broadcast";
import Success from "./Success";
import { MdOutlineClose } from "react-icons/md";
import { useSetModal } from "components/Nodal/Nodal";
import { setStage } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";

type Display = { [key in Step]: ReactNode };

export default function DonateSuite(props: { inModal?: true }) {
  const { hideModal } = useSetModal();
  const dispatch = useSetter();
  const { stage } = useGetter((state) => state.transaction);
  const display: Display = {
    [Step.form]: <DonateForm />,
    [Step.submit]: <Submit />,
    [Step.broadcast]: <Broadcast />,
    [Step.success]: <Success />,
    [Step.error]: <ErrPop />,
  };

  function close() {
    dispatch(setStage({ step: Step.form, content: null }));
    hideModal();
  }

  return (
    <div
      className={`max-w-md w-full relative ${
        props.inModal ? "bg-white rounded-md pt-4" : ""
      }`}
    >
      {props.inModal && (
        <button
          onClick={close}
          className="absolute right-2 top-2 text-angel-grey hover:text-black"
        >
          <MdOutlineClose />
        </button>
      )}
      {display[stage.step]}
    </div>
  );
}