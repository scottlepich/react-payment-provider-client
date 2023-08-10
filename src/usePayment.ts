import { useEffect } from "react";

import useScript from "react-script-hook";

import { ActionTypes, PaymentType } from "./constants";

import useProvider from "./useProvider";
import usePaymentContext from "./context/usePaymentContext";

const { SET_SRC_LOADED, SET_ERRORS } = ActionTypes;

// TODO: figure out isomorphic app
const useHasWindowGlobal = () => typeof window !== "undefined";

const usePayment = (paymentType: PaymentType) => {
  // check for window
  const hasWindowGlobal = useHasWindowGlobal();

  useEffect(() => {
    if (!hasWindowGlobal) {
      return;
    }
  }, [hasWindowGlobal]);

  // Load up our context
  const { state, dispatch } = usePaymentContext();

  // Get payment provider specific config
  const { src, initialize, attachEvents } = useProvider(paymentType);

  // Attach payment provider script
  const [isLoadingSrc] = useScript({
    src,
    checkForExisting: true, // prevent multiple script injection
  });

  // Initialize payment provider
  useEffect(() => {
    if (!state.hasLoadedScript && !isLoadingSrc && hasWindowGlobal) {
      dispatch({
        type: SET_SRC_LOADED,
      });
      initialize();
      attachEvents(dispatch);
    }
  }, [isLoadingSrc]);

  // Todo: additional callbacks?
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
