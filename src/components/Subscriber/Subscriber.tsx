import LineLoader from "components/Loader/LineLoader";
import Modal from "components/Modal/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Handler } from "types/types";
import ErrorPopup from "./ErrorPopup";
import handleSubscribe from "./handleSubscribe";
import SuccessPopup from "./SuccessPopup";
import validator from "./validator";

export interface Values {
  email: string;
}

export default function Subscriber() {
  return (
    <Formik
      initialValues={{ email: "" }}
      validate={validator}
      onSubmit={handleSubscribe}
    >
      {({ isSubmitting, status, resetForm }) => (
        <>
          {renderModal(status, resetForm)}
          <Form
            autoComplete="off"
            className="flex flex-col items-center lg:items-start"
          >
            <span>{status}</span>
            <Field
              placeholder="Email"
              disabled={isSubmitting}
              autoComplete="off"
              type="text"
              name="email"
              className="block p-2 rounded-md w-72 disabled:bg-thin-grey text-blue-accent font-semibold 
            focus:outline-none focus:ring-2 focus:ring-white-grey focus:ring-opacity-50"
            />
            <ErrorMessage
              name="email"
              className="text-sm text-yellow-300 font-semibold mt-1"
              component="div"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange w-48 h-10 rounded-xl uppercase text-base font-bold text-white block mt-3 disabled:bg-grey-accent"
            >
              {isSubmitting ? (
                <LineLoader color="thin-grey" size={"4"} spacing={"2"} />
              ) : (
                "Subscribe"
              )}
            </button>
          </Form>
        </>
      )}
    </Formik>
  );
}

function renderModal(status: string, resetForm: Handler) {
  switch (status) {
    case "success":
      return (
        <Modal
          render={(closeModal) => (
            <SuccessPopup
              clickHandler={() => {
                resetForm();
                closeModal();
              }}
            />
          )}
        />
      );
    case "failed":
      return (
        <Modal
          render={(closeModal) => (
            <ErrorPopup
              clickHandler={() => {
                resetForm();
                closeModal();
              }}
            />
          )}
        />
      );
    default:
      return null;
  }
}