import { useContext, useEffect } from "react";
import useScript from "react-script-hook";

import { ActionTypes } from "./types/index.d";

import PaymentContext from "./PaymentContext";

import { PaymentType } from "./constants";

const { SET_SRC_LOADED } = ActionTypes;

// TODO: Stripe

const usePayment = (paymentType: PaymentType) => {
  const context = useContext(PaymentContext);

  // TODO: useDispatch
  if (!context?.dispatch) {
    return;
  }

  // Attach provider script.
  const [scriptLoading] = useScript({
    src: "", // TODO: use paymentType for src
    checkForExisting: true, // prevent multiple script injection
  });

  useEffect(() => {
    if (!scriptLoading) {
      // && window.* provider script
      context.dispatch({
        type: SET_SRC_LOADED,
      });
      // TODO:
      // initialize provider
      // attach lifecycle listeners
    }
  }, [scriptLoading]);

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
