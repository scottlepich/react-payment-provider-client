import "dotenv/config";

import { useEffect, useRef, useReducer, Reducer } from "react";

import useScript from "react-script-hook";

import initialState from "./initialState";

import reducer from "./reducer";

import {
  UseSpreedlyReturnType,
  SpreedlyPaymentMethod,
  State,
  Actions,
  ActionTypes,
  CreditCardData,
} from "../types/spreedly";

import {
  CHALLENGE_IFRAME,
  CHALLENGE_IFRAME_CLASSES,
  HIDDEN_IFRAME,
  SPREEDLY_CVV_FIELD,
  SPREEDLY_NUMBER_FIELD,
  SPREEDLY_SCRIPT_URL,
  SpreedlyEvents,
} from "./constants";

const environmentKey = process.env.SPREEDLY_DEMO || "";

const { READY, ERRORS, PAYMENT_METHOD, INPUT, THREEDS_STATUS } = SpreedlyEvents;

const {
  SET_ERRORS,
  SET_3DS_EVENTS,
  SET_CREDIT_CARD,
  SET_INPUTS,
  SET_READY,
  SET_SRC_LOADED,
} = ActionTypes;

export const useSpreedly = (): UseSpreedlyReturnType | undefined => {
  // TODO: figure out isomorphic app
  if (!window) {
    return;
  }

  const { Spreedly } = window;

  const [state, dispatch] = useReducer<Reducer<State, Actions>>(
    reducer,
    initialState,
  );

  const threeDSLifecycle = useRef<any>();

  // Load the Spreedly script.
  const [scriptLoading] = useScript({
    src: SPREEDLY_SCRIPT_URL,
    checkForExisting: true, // prevent multiple script injection
  });

  useEffect(() => {
    if (Spreedly) {
      dispatch({
        type: SET_SRC_LOADED,
      });

      Spreedly.on(READY, () => {
        dispatch({
          type: SET_READY,
        });
      });

      Spreedly.on(ERRORS, (error: Error) => {
        dispatch({
          type: SET_ERRORS,
          error,
        });
      });

      Spreedly.on(PAYMENT_METHOD, (token: string, data: CreditCardData) => {
        dispatch({
          type: SET_CREDIT_CARD,
          card: {
            token,
            data,
          },
        });
      });

      Spreedly.on(INPUT, (name: string, value: string) => {
        dispatch({
          type: SET_INPUTS,
          inputs: [...state.inputs, { name, value }],
        });
      });

      // TODO: 3ds status data type
      Spreedly.on(THREEDS_STATUS, (data: any) => {
        dispatch({
          type: SET_3DS_EVENTS,
          threeDsEvents: [{ name: data.event, data }, ...state.threeDsEvents],
        });
      });
    }
  }, [scriptLoading]);

  const initializeSpreedly = () => {
    if (Spreedly) {
      Spreedly.init(environmentKey, {
        numberEl: SPREEDLY_NUMBER_FIELD,
        cvvEl: SPREEDLY_CVV_FIELD,
      });
    }
  };

  const tokenizeCard = (creditCard: any) => {
    if (Spreedly) {
      Spreedly.tokenizeCreditCard(creditCard);
    }
  };

  const clearErrors = () => {
    dispatch({
      type: SET_ERRORS,
      error: undefined,
    });
  };

  const startThreeDS = (transactionToken: string) => {
    if (Spreedly) {
      threeDSLifecycle.current = new Spreedly.ThreeDS.Lifecycle({
        environmentKey,
        hiddenIframeLocation: HIDDEN_IFRAME,
        challengeIframeLocation: CHALLENGE_IFRAME,
        transactionToken: transactionToken,
        challengeIframeClasses: CHALLENGE_IFRAME_CLASSES,
      });
      // TODO: track when 3ds journey is triggered
      // console.log(`starting 3ds lifecycle for transaction ${transactionToken}`);
      threeDSLifecycle.current.start();
    }
  };

  // TODO: cleanup return values
  return {
    loading: state.loading,
    error: state.error,
    cardToken: state.card.token || "",
    inputs: state.inputs,
    threeDSEvents: state.threeDsEvents,
    cardData: state.card.data as SpreedlyPaymentMethod,
    spreedlyIsLoaded: state.scriptIsLoaded,
    tokenizeCard,
    startThreeDS,
    initializeSpreedly,
    clearErrors,
  };
};

export default useSpreedly;
