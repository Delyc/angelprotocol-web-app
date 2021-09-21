import { useHistory } from "react-router-dom";
import { register_routes } from "types/types";

// TCA Member's Login Auth Process
// after check useRequest hook, remove it
const TCAAuthProcess = async (password: string) => {
  const url = process.env.REACT_APP_AWS_TCA_LOGIN_URL;
  try {
    const response: any = await fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify({ password: password }),
    });

    const data: { accessToken: string; errorMessage: string } =
      await response.json();
    if (data.accessToken) {
      console.log("Access Token: ", data.accessToken);
    } else {
      console.log("Error Message: ", data.errorMessage);
    }
  } catch (error) {
    console.error(error);
  }
};

// Charity Registration Process
// Initial Registration
const ContactDetailsFormSubmit = async (contactData: any) => {
  const url = process.env.REACT_APP_AWS_REGISTER_CONTACT_PERSON_URL;
  let body;

  // if (contactData.orgRole === "other") {
  //   body = {
  //     Registration: { CharityName: contactData.charityName },
  //     ContactPerson: {
  //       FirstName: contactData.firstName,
  //       LastName: contactData.lastName,
  //       Email: contactData.email,
  //       PhoneNumber: contactData.phone,
  //       Role: contactData.otherRole,
  //     },
  //   };
  // } else {
  //   body = {
  //     Registration: { CharityName: contactData.charityName },
  //     ContactPerson: {
  //       FirstName: contactData.firstName,
  //       LastName: contactData.lastName,
  //       Email: contactData.email,
  //       PhoneNumber: contactData.phone,
  //       Role: contactData.orgRole,
  //     },
  //   };
  // }
  if (contactData.orgRole === "other") {
    body = {
      Registration: { CharityName: contactData.charityName },
      ContactPerson: {
        FirstName: contactData.firstName,
        LastName: contactData.lastName,
        Email: contactData.email,
        PhoneNumber: contactData.phone,
      },
    };
  } else {
    body = {
      Registration: { CharityName: contactData.charityName },
      ContactPerson: {
        FirstName: contactData.firstName,
        LastName: contactData.lastName,
        Email: contactData.email,
        PhoneNumber: contactData.phone,
      },
    };
  }

  try {
    const response: any = await fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const data: { message: string; UUID: string } = await response.json();

    // If there's a UUID returned, it means registration is a success
    if (data.UUID) {
      console.log("message:", data.message, "UUID:", data.UUID);
      localStorage.setItem("userData", JSON.stringify(data));
    } else {
      console.log("message:", data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

export { TCAAuthProcess, ContactDetailsFormSubmit };
