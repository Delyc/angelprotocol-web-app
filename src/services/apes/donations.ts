import createAuthToken from "helpers/createAuthToken";
import { UserTypes } from "services/user/types";
import { ReceiptPayload, TxDetails } from "./types";
import { apes } from "./apes";

const donations_api = apes.injectEndpoints({
  endpoints: (builder) => ({
    logDonation: builder.mutation<any, TxDetails>({
      query: (txPayload) => {
        const generatedToken = createAuthToken(UserTypes.WEB_APP);
        return {
          url: "donation",
          method: "POST",
          headers: { authorization: generatedToken },
          body: txPayload,
        };
      },
    }),
    requestReceipt: builder.mutation<any, ReceiptPayload>({
      query: (receiptPayload) => {
        const generatedToken = createAuthToken(UserTypes.WEB_APP);
        const { transactionId, ...restOfPayload } = receiptPayload;
        return {
          url: `donation`,
          params: { transactionId },
          method: "PUT",
          headers: { authorization: generatedToken },
          body: restOfPayload,
        };
      },
    }),
  }),
});

export const { useLogDonationMutation, useRequestReceiptMutation } =
  donations_api;
