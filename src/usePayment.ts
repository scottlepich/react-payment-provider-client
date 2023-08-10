import { useEffect } from "react";

import useScript from "react-script-hook";

import { ActionTypes, PaymentType } from "./constants";

import useProvider from "./useProvider";

import usePaymentContext from "./context/usePaymentContext";

const { SET_SRC_LOADED, SET_ERRORS } = ActionTypes;

const useHasWindowGlobal = () => typeof window !== "undefined";

const usePayment = (paymentType: PaymentType) => {
  const hasWindowGlobal = useHasWindowGlobal();

  useEffect(() => {
    if (!hasWindowGlobal) {
      return; // Must be in a browser
    }
  }, [hasWindowGlobal]);

  // Initialize context
  const { state, dispatch } = usePaymentContext();

  // Payment provider config
  const { src, initialize, attachEvents } = useProvider(paymentType);

  // Attach payment provider <script />
  useScript({
    src,
    checkForExisting: true, // prevent multiple script injection
    onload: () => {
      dispatch({
        type: SET_SRC_LOADED,
      });
    },
  });

  // Initialize payment provider
  useEffect(() => {
    if (state.hasLoadedScript && hasWindowGlobal) {
      initialize();
      attachEvents({ state, dispatch });
    }
  }, [state.hasLoadedScript]);

  const clearErrors = () => {
    dispatch({
      type: SET_ERRORS,
      error: undefined,
    });
  };

  // Provide state and callback(s)
  return { state, clearErrors };
};

export default usePayment;
