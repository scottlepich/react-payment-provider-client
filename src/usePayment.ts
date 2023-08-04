import { useEffect } from "react";

import useScript from "react-script-hook";

import { PaymentType } from "./constants";
import { ActionTypes } from "./types/index.d";

import useProvider from "./useProvider";
import usePaymentContext from "./usePaymentContext";

const { SET_SRC_LOADED, SET_ERRORS } = ActionTypes;

const usePayment = (paymentType: PaymentType) => {
  const { state, dispatch } = usePaymentContext();

  // Get payment provider specific config
  const { src, hasWindowModule, initialize, attachEvents } =
    useProvider(paymentType);

  // Attach provider script
  const [scriptLoading] = useScript({
    src,
    checkForExisting: true, // prevent multiple script injection
  });

  // Init payment provider
  useEffect(() => {
    if (hasWindowModule) {
      dispatch({
        type: SET_SRC_LOADED,
      });
      initialize();
      attachEvents(dispatch);
    }
  }, [scriptLoading, dispatch]);

  // TODO:  callbacks
  // TODO: dispatch?
  const clearErrors = (dispatch: any) => {
    dispatch({
      type: SET_ERRORS,
      error: undefined,
    });
  };

  return { state, clearErrors };
};

export default usePayment;
