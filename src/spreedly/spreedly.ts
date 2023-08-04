// TODO: figure out isomorphic app
const Spreedly = window?.Spreedly || {};

import { ActionTypes } from "../types/index.d";

import { CreditCardData } from "../types/spreedly";

import {
  CHALLENGE_IFRAME,
  CHALLENGE_IFRAME_CLASSES,
  HIDDEN_IFRAME,
  SPREEDLY_CVV_FIELD,
  SPREEDLY_NUMBER_FIELD,
  SpreedlyEvents,
} from "./constants";

const { SET_3DS_EVENTS, SET_CREDIT_CARD, SET_ERRORS, SET_INPUTS, SET_READY } =
  ActionTypes;

const { READY, ERRORS, PAYMENT_METHOD, INPUT, THREEDS_STATUS } = SpreedlyEvents;

// TODO:
const environmentKey = process.env.SPREEDLY_DEMO || "";

export const initializeSpreedly = () => {
  if (Spreedly) {
    Spreedly.init(environmentKey, {
      numberEl: SPREEDLY_NUMBER_FIELD,
      cvvEl: SPREEDLY_CVV_FIELD,
    });
  }
};

export const attachEvents = ({ state, dispatch }: any) => {
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
};

export const tokenizeCard = (creditCard: any) => {
  if (Spreedly) {
    Spreedly.tokenizeCreditCard(creditCard);
  }
};

export const startThreeDS = (
  transactionToken: string,
  threeDSLifecycle: any,
) => {
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
