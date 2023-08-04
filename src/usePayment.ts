import { useContext, useEffect } from "react";

import useScript from "react-script-hook";
import PaymentContext from "./PaymentContext";

import useProvider from "./useProvider";

import { PaymentType } from "./constants";
import { ActionTypes } from "./types/index.d";

// TODO: Stripe

const { SET_SRC_LOADED, SET_ERRORS } = ActionTypes;

const usePayment = (paymentType: PaymentType) => {
  const context = useContext(PaymentContext);

  // Get provider specific config
  const { src, hasWindowModule, initialize, attachEvents } =
    useProvider(paymentType);

  // Attach provider script
  const [scriptLoading] = useScript({
    src,
    checkForExisting: true, // prevent multiple script injection
  });

  // Init provider
  useEffect(() => {
    if (context && hasWindowModule) {
      const { dispatch } = context;
      dispatch({
        type: SET_SRC_LOADED,
      });
      initialize();
      attachEvents(context);
    }
  }, [scriptLoading, context]);

  // must be after hooks:
  if (context === undefined) {
    throw new Error(
      "usePayment hook must be used within a PaymentProvider context.",
    );
  }

  // TODO: callbacks?
  // TODO: dispatch?
  const clearErrors = (dispatch: any) => {
    dispatch({
      type: SET_ERRORS,
      error: undefined,
    });
  };

  return { ...context, clearErrors };
};

export default usePayment;
