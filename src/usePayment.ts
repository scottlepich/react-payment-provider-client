import { useContext } from "react";

import PaymentContext from "./PaymentContext";

import { PaymentType } from "./constants";

// TODO: Stripe

const usePayment = (paymentType: PaymentType) => {
  if (paymentType !== PaymentType.Spreedly) {
    throw new Error("Unknown PaymentType passed to usePayment");
  }

  // TODO: use paymentprovier for vars
  // get script
  // get env

  const context = useContext(PaymentContext);

  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};

export default usePayment;
