import { useContext } from "react";

import PaymentContext from "./PaymentContext";

const usePayment = () => {
  const context = useContext(PaymentContext);

  if (context === undefined) {
    throw new Error(
      "usePayment hook must be used within a PaymentProvider context.",
    );
  }

  return context;
};

export default usePayment;
