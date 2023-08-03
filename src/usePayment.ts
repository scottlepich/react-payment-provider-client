import { useContext } from "react";

import PaymentContext from "./PaymentContext";

// TODO choose provider when using

const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};

export default usePayment;
