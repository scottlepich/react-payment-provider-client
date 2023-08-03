import { useContext } from "react";

import PaymentContext from "./PaymentContext";

import useProviderScript from "./useProviderScript";

import { PaymentType } from "./constants";

// TODO: Stripe

const usePayment = (paymentType: PaymentType) => {
  const context = useContext(PaymentContext);

  useProviderScript();

  // end hooks

  if (context === undefined) {
    throw new Error(
      "usePayment hook must be used within a PaymentProvider context.",
    );
  }

  if (paymentType !== PaymentType.Spreedly) {
    throw new Error("Unknown PaymentType passed to usePayment.");
  }

  return context.state;
};

export default usePayment;
