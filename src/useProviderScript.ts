import { useEffect } from "react";

import useScript from "react-script-hook";

import { useDispatch } from "./PaymentContext";

import { ActionTypes } from "./types/index.d";

const { SET_SRC_LOADED } = ActionTypes;

const useProviderScript = () => {
  const dispatch = useDispatch();

  // Attach provider script.
  const [scriptLoading] = useScript({
    src: "", // TODO: use paymentType for src
    checkForExisting: true, // prevent multiple script injection
  });

  // Set loaded, init, attach lifecycle
  useEffect(() => {
    // TODO: figure out isomorphic app
    // other script locations
    if (window?.Spreedly) {
      // todo: undefined disptach?
      dispatch({
        type: SET_SRC_LOADED,
      });
      // TODO:
      // initialize provider
      // attach lifecycle listeners
    }
  }, [scriptLoading]);
};

export default useProviderScript;
