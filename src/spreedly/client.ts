import {
  CARD_NUMBER_FIELD_ID,
  CVV_FIELD_ID,
  CHALLENGE_IFRAME_ID,
  CHALLENGE_IFRAME_CLASS,
  HIDDEN_IFRAME_ID,
  ActionTypes,
} from "../constants";

import { CreditCardData } from "../types/spreedly";

import { SpreedlyEvents } from "./constants";

const { SET_3DS_EVENTS, SET_CREDIT_CARD, SET_ERRORS, SET_INPUTS, SET_READY } =
  ActionTypes;

const { READY, ERRORS, PAYMENT_METHOD, INPUT, THREEDS_STATUS } = SpreedlyEvents;

// TODO: figure out where to store env keys
const environmentKey = process.env.SPREEDLY_DEMO || "";

// TODO: figure out isomorphic app
const Spreedly = typeof window !== "undefined" ? window?.Spreedly || {} : {};

export const initializeSpreedly = () => {
  if (Spreedly) {
    Spreedly.init(environmentKey, {
      numberEl: CARD_NUMBER_FIELD_ID,
      cvvEl: CVV_FIELD_ID,
    });
  }
};

export const attachEvents = ({ state, dispatch }: any) => {
  if (Spreedly) {
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
      hiddenIframeLocation: HIDDEN_IFRAME_ID,
      challengeIframeLocation: CHALLENGE_IFRAME_ID,
      transactionToken,
      challengeIframeClasses: CHALLENGE_IFRAME_CLASS,
    });
    // TODO: track when 3ds journey is triggered
    // console.log(`starting 3ds lifecycle for transaction ${transactionToken}`);
    threeDSLifecycle.current.start();
  }
};
