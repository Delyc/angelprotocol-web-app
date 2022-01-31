import { useState } from "react";
import { useRequestReceiptMutation } from "services/apes/donations";
import { Step, ReceiptStage } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import { useGetter } from "store/accessors";
import { Values } from "./types";

export default function useReceiptForm() {
  const { updateTx } = useTxUpdator();
  const [processing, setProcessing] = useState(false);
  const [requestReceipt] = useRequestReceiptMutation();
  const { stage } = useGetter((state) => state.transaction);

  const { chainId, txHash } = stage as ReceiptStage; //check made on Receipter

  const submitHandler = async (body: Values) => {
    const receipt = {
      transactionId: body.transactionId,
      body: {
        fullName: body.fullName,
        email: body.email,
        streetAddress: body.streetAddress,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        country: body.country,
        split_liq: body.splitLiq,
      },
    };
    setProcessing(true);
    const response: any = await requestReceipt({ receipt });
    setProcessing(false);
    if (response.data) {
      updateTx({
        step: Step.success,
        message:
          "Receipt request successfully sent, Your receipt will be sent to your email address",
        txHash,
        chainId,
      });
    } else {
      updateTx({
        step: Step.error,
        message: "Error processing your receipt",
        txHash,
        chainId,
      });
    }
  };

  return { submitHandler, processing };
}
