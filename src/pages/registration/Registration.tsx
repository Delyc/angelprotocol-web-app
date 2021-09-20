import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import { register_routes } from "types/types";
import banner1 from "assets/images/banner-register-1.jpg";

const Registration = () => {
  const history = useHistory();
  // const userData: any = JSON.parse(localStorage.getItem("userData") || "");

  // if (userData) {
  //   history.push({
  //     pathname: register_routes.confirm,
  //     state: { is_sent: true },
  //   });
  // }

  return (
    <div>
      <div className="rounded-xl mb-5">
        <img src={banner1} width="100%" className="rounded-xl" alt="banner" />
      </div>
      <div>
        <span className="text-2xl font-bold">
          Thank you for registering, we'd love to have you on board!
        </span>
      </div>
      <div className="my-10">
        <span className="text-xl">
          First, we need to collect information about you and your organization
          to prevent fraud. The registration only takes a few minutes and it can
          be interrupted and resumed as many times as necessary. We’ll be making
          it easy for you to come back to it.
        </span>
      </div>
      <div className="mb-2">
        <button
          className="bg-orange w-48 h-12 rounded-xl uppercase text-md font-bold text-white mb-3"
          onClick={() => history.push("/register/detail")}
        >
          Start
        </button>
        <div className="cursor-pointer mb-3">
          <p className="text-xl font-bold">OR</p>
        </div>
      </div>
      <div className="">
        <Formik
          initialValues={{ refer: "" }}
          validate={(values) => {
            const errors = { refer: "" };
            if (!values.refer) {
              errors.refer = "Please enter your registration reference.";
              return errors;
            }
            return {};
          }}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(true);
            // API integration.
            // set error
            setFieldError(
              "refer",
              "Can`t find a registration file with this reference!"
            );
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting }) => (
            <div>
              <Form>
                <div className="flex items-center justify-center mb-2">
                  <div className="mr-5 rounded-md bg-white flex items-center w-2/5 text-black py-2">
                    <Field
                      type="text"
                      className="outline-none border-none w-full px-3"
                      placeholder="Enter your registration reference"
                      value={values.refer}
                      name="refer"
                    />
                  </div>
                </div>
                <ErrorMessage
                  className="text-md text-failed-red"
                  name="refer"
                  component="div"
                />
                <button
                  className="bg-thin-blue w-48 h-12 rounded-xl uppercase text-md font-bold text-white mt-3"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Resume
                </button>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Registration;
