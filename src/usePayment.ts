import { useEffect } from "react";

import useScript from "react-script-hook";

import { PaymentType } from "./constants";
import { ActionTypes } from "./types/index.d";

import useProvider from "./useProvider";
import usePaymentContext from "./context/usePaymentContext";

const { SET_SRC_LOADED, SET_ERRORS } = ActionTypes;

const usePayment = (paymentType: PaymentType) => {
  // Load up our context
  const { state, dispatch } = usePaymentContext();

  // Get payment provider specific config
  const { src, hasWindowModule, initialize, attachEvents } =
    useProvider(paymentType);

  // Attach payment provider script
  const [scriptLoading] = useScript({
    src,
    checkForExisting: true, // prevent multiple script injection
  });

  // Initialize payment provider
  useEffect(() => {
    if (hasWindowModule) {
      dispatch({
        type: SET_SRC_LOADED,
      });
      initialize();
      attachEvents(dispatch);
    }
  }, [scriptLoading, dispatch]);

  // TODO: additional callbacks?
  // What do the forms need?
  const clearErrors = () => {
    dispatch({
      type: SET_ERRORS,
      error: undefined,
    });
  };

  return { state, clearErrors };
};

export default usePayment;
