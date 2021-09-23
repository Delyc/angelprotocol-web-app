import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { routes } from "types/types";
import { ContactInfoSchema, useContactDetails } from "./useContactDetails";

export type ContactDetails = {
  charityName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  orgRole: string;
  otherRole: string;
  checkedPolicy: boolean;
  uniqueID: string;
};
export const ContactDetailsForm = (props: any) => {
  const { saveContactInfo } = useContactDetails();
  console.log(props.contactData);
  return (
    <Formik
      initialValues={{
        charityName: props.contactData?.charityName || "",
        firstName: props.contactData?.firstName || "",
        lastName: props.contactData?.lastName || "",
        email: props.contactData?.email || "",
        phone: props.contactData?.phone || "",
        orgRole: props.contactData?.orgRole || "ceo",
        otherRole: props.contactData?.otherRole || "",
        checkedPolicy: false,
        uniqueID: props.contactData?.uniqueID || "",
      }}
      validationSchema={ContactInfoSchema}
      onSubmit={saveContactInfo}
    >
      {({ values, isSubmitting }) => (
        <div className="flex items-center justify-center">
          <Form className="md:w-4/5 text-left">
            <div className=" grid grid-cols-1 sm:grid-cols-2">
              <div className="">
                <div className="items-center justify-center mb-4">
                  <div className="text-left">
                    <span className="text-base">
                      Name of your organization
                      <span className="text-base text-failed-red">*</span>
                      <Field
                        type="hidden"
                        value={values.uniqueID}
                        name="uniqueID"
                      />
                    </span>
                  </div>
                  <div className="">
                    <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                      <Field
                        type="text"
                        className="outline-none border-none w-full px-3"
                        placeholder="Organization"
                        value={values.charityName}
                        name="charityName"
                      />
                    </div>
                    <ErrorMessage
                      className="text-sm text-failed-red"
                      name="charityName"
                      component="div"
                    />
                  </div>
                </div>
                <div className="items-center justify-center mb-4">
                  <div className="text-left">
                    <span className="text-base text-left">
                      First name
                      <span className="text-base text-failed-red">*</span>
                    </span>
                  </div>
                  <div className="">
                    <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                      <Field
                        type="text"
                        className="outline-none border-none w-full px-3"
                        placeholder="First Name"
                        value={values.firstName}
                        name="firstName"
                      />
                    </div>
                    <ErrorMessage
                      className="text-sm text-failed-red"
                      name="firstName"
                      component="div"
                    />
                  </div>
                </div>
                <div className="items-center justify-center mb-4">
                  <div className="text-left">
                    <span className="text-base text-left">
                      Last name
                      <span className="text-base text-failed-red">*</span>
                    </span>
                  </div>
                  <div className="">
                    <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                      <Field
                        type="text"
                        className="outline-none border-none w-full px-3"
                        placeholder="Last Name"
                        value={values.lastName}
                        name="lastName"
                      />
                    </div>
                    <ErrorMessage
                      className="text-sm text-failed-red"
                      name="lastName"
                      component="div"
                    />
                  </div>
                </div>
                <div className="items-center justify-center mb-4">
                  <div className="text-left">
                    <span className="text-base text-left">
                      E-mail address
                      <span className="text-base text-failed-red">*</span>
                    </span>
                  </div>
                  <div className="">
                    <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                      <Field
                        type="email"
                        className="outline-none border-none w-full px-3"
                        placeholder="email Address"
                        value={values.email}
                        name="email"
                      />
                    </div>
                    <ErrorMessage
                      className="text-sm text-failed-red"
                      name="email"
                      component="div"
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="items-center justify-center mb-4">
                  <div className="text-left">
                    <span className="text-base text-left">phone number</span>
                  </div>
                  <div className="">
                    <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                      <Field
                        type="text"
                        className="outline-none border-none w-full px-3"
                        placeholder="phone Number"
                        value={values.phone}
                        name="phone"
                      />
                    </div>
                  </div>
                </div>
                <div className="items-center justify-center mb-4">
                  <div className="text-left">
                    <span className="text-base text-left">
                      What's your role within the organization?
                      <span className="text-base text-failed-red">*</span>
                    </span>
                  </div>
                  <div className="">
                    <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                      <Field
                        as="select"
                        className="outline-none border-none w-full px-3"
                        placeholder="Role"
                        value={values.orgRole}
                        defaultValue="ceo"
                        name="orgRole"
                      >
                        <option value="president">
                          Chairperson / President
                        </option>
                        <option value="vice-president">
                          Vice-chairperson / Vice president
                        </option>
                        <option value="secretary">Secretary</option>
                        <option value="treasurer">Treasurer</option>
                        <option value="ceo">CEO</option>
                        <option value="cfo">CFO</option>
                        <option value="other">Other</option>
                      </Field>
                    </div>
                    <ErrorMessage
                      className="text-sm text-failed-red"
                      name="orgRole"
                      component="div"
                    />
                  </div>
                </div>
                {values.orgRole === "other" && (
                  <div className="items-center justify-center mb-4">
                    <div className="text-left">
                      <span className="text-base text-left">
                        please specify
                        <span className="text-base text-failed-red">*</span>
                      </span>
                    </div>
                    <div className="">
                      <div className="mr-5 rounded-md bg-white flex items-center w-2/5text-black py-2">
                        <Field
                          type="text"
                          className="outline-none border-none w-full px-3 text-black"
                          placeholder="Specify Your Role"
                          value={values.otherRole}
                          name="otherRole"
                        />
                      </div>
                      <ErrorMessage
                        className="text-sm text-failed-red"
                        name="otherRole"
                        component="div"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 items-center justify-center mb-4 mt-10">
              <div className="flex text-center justify-center">
                <div className="mr-5 flex items-center py-2">
                  <label>
                    <Field
                      type="checkbox"
                      name="checkedPolicy"
                      className="mr-2"
                    />
                    <span className="text-base">
                      {" "}
                      By checking this box, you declare that you have read and
                      agreed our{" "}
                      <Link to={routes.privacy_policy} className="underline">
                        Privacy Policy
                      </Link>
                      <span className="text-base text-failed-red">*</span>
                    </span>
                  </label>
                </div>
                <ErrorMessage
                  className="text-base text-failed-red"
                  name="checkedPolicy"
                  component="div"
                />
              </div>
            </div>
            <div className="text-center">
              <button
                className="bg-orange disabled:bg-gray-300 w-48 h-12 rounded-xl uppercase text-base font-bold text-white"
                type="submit"
                disabled={isSubmitting}
              >
                continue
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

// import { ErrorMessage, Field, Form, Formik } from "formik";
// import { Link } from "react-router-dom";
// import { routes } from "types/types";
// import { boolean } from "yup/lib/locale";
// // import { ContactInfoSchema, useContactDetails } from "./useContactDetails";
// import { CreateNewCharity } from "aws-settings.config";

// export type ContactDetails = {
//   charityName: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   orgRole: string;
//   otherRole: string;
//   checkedPolicy: boolean;
//   uniqueID: string;
// };

// export const ContactDetailsForm = () => {
//   const initialValues = {
//     charityName: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     orgRole: "",
//   };

//   const onSubmit = (values: any) => {
//     console.log(values);
//     CreateNewCharity(values); // returns a message and the charity's UUID
//   };

//   return (
//     <Formik initialValues={initialValues} onSubmit={onSubmit}>
//       <Form>
//         <div className="text-black">
//           <label htmlFor="charityName">Charity Name</label>
//           <Field
//             id="charityName"
//             name="charityName"
//             placeholder="Charity Name"
//           />
//           <br />
//           <br />
//           <label htmlFor="firstName">First Name</label>
//           <Field id="firstName" name="firstName" placeholder="First Name" />
//           <br />
//           <br />
//           <label htmlFor="lastName">Last Name</label>
//           <Field id="lastName" name="lastName" placeholder="Last Name" />
//           <br />
//           <br />
//           <label htmlFor="email">email</label>
//           <Field id="email" name="email" placeholder="email" type="email" />
//           <br />
//           <br />
//           <label htmlFor="phone">phone</label>
//           <Field id="phone" name="phone" placeholder="phone" />
//           <br />
//           <br />
//           <label htmlFor="orgRole">Role</label>
//           <Field id="orgRole" name="orgRole" placeholder="Role" />
//           <br />
//           <br />
//           <button type="submit">Submit</button>
//         </div>
//       </Form>
//     </Formik>
//   );
// };