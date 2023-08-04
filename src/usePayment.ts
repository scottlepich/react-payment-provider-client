import { useContext, useEffect } from "react";

import useScript from "react-script-hook";
import PaymentContext, { useDispatch } from "./PaymentContext";

import useProvider from "./useProvider";

import { PaymentType } from "./constants";
import { ActionTypes } from "./types/index.d";

// TODO: Stripe

const usePayment = (paymentType: PaymentType) => {
  const context = useContext(PaymentContext);

  const dispatch = useDispatch();

  const { src } = useProvider(paymentType);

  // Attach provider script.
  const [scriptLoading] = useScript({
    src, // TODO: use paymentType for src
    checkForExisting: true, // prevent multiple script injection
  });

  useEffect(() => {
    if (context === undefined) {
      throw new Error(
        "usePayment hook must be used within a PaymentProvider context.",
      );
    }
  }, []);

  // Set loaded, init, attach lifecycle
  useEffect(() => {
    // TODO: figure out isomorphic app
    // other script locations
    if (window?.Spreedly) {
      // TODO: undefined disptach?
      dispatch({
        type: ActionTypes.SET_SRC_LOADED,
      });
      // TODO:
      // initialize provider
      // attach lifecycle listeners
    }
  }, [scriptLoading]);

  // end hooks

  return context;
};

export default usePayment;
