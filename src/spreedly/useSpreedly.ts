import "dotenv/config";

import { useEffect, useRef, useState } from "react";

import useScript from "react-script-hook";

import { createSingletonHook } from "./singletonHook";

import {
  CreditCardData,
  InputField,
  SpreedlyEvents,
  SpreedlyPaymentMethod,
  ThreeDSEvent,
} from "../types/spreedly";

import {
  CHALLENGE_IFRAME,
  CHALLENGE_IFRAME_CLASSES,
  HIDDEN_IFRAME,
  SPREEDLY_CVV_FIELD,
  SPREEDLY_NUMBER_FIELD,
  SPREEDLY_SCRIPT_URL,
} from "./constants";

// useSpreedly Return Type
type UseSpreedlyReturnType = {
  loading: boolean;
  error: any;
  cardToken: string;
  inputs: InputField[];
  threeDSEvents: ThreeDSEvent[];
  cardData?: SpreedlyPaymentMethod;
  spreedlyIsLoaded: boolean;
  tokenizeCard: (creditCard: CreditCardData) => void;
  startThreeDS: (transactionToken: string) => void;
  initializeSpreedly: () => void;
  clearErrors: () => void;
};

const environmentKey = process.env.SPREEDLY_DEMO || "";

const { Spreedly } = window;

export const useSpreedly = (): UseSpreedlyReturnType => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cardToken, setCardToken] = useState("");
  const [cardData, setCardData] = useState<SpreedlyPaymentMethod>();
  const [inputs, setInputs] = useState<InputField[]>([]);
  const [threeDSEvents, setThreeDSEvents] = useState<ThreeDSEvent[]>([]);
  const [spreedlyIsLoaded, setSpreedlyIsLoaded] = useState(false);
  const threeDSLifecycle = useRef<any>();

  // Load the Spreedly script.
  const [scriptLoading] = useScript({
    src: SPREEDLY_SCRIPT_URL,
    checkForExisting: true, // prevent multiple script injection
  });

  useEffect(() => {
    if (Spreedly) {
      setSpreedlyIsLoaded(true);

      const { READY, ERRORS, PAYMENT_METHOD, INPUT, THREEDS_STATUS } =
        SpreedlyEvents;

      Spreedly.on(READY, () => {
        setLoading(false);
      });

      Spreedly.on(ERRORS, (errors: any) => {
        setError(errors);
      });

      Spreedly.on(
        PAYMENT_METHOD,
        (token: string, pmData: SpreedlyPaymentMethod) => {
          setCardToken(token);
          setCardData(pmData);
        },
      );

      Spreedly.on(INPUT, (name: string, value: string) => {
        setInputs((inputs) => [...inputs, { name, value }]);
      });

      Spreedly.on(THREEDS_STATUS, (data: any) => {
        setThreeDSEvents((events) => [{ name: data.event, data }, ...events]);
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
    setError(null);
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

      // TODO: should prob loglov3 this?
      // console.log(`starting 3ds lifecycle for transaction ${transactionToken}`);
      threeDSLifecycle.current.start();
    }
  };

  return {
    loading,
    error,
    cardToken,
    inputs,
    threeDSEvents,
    cardData,
    spreedlyIsLoaded,
    tokenizeCard,
    startThreeDS,
    initializeSpreedly,
    clearErrors,
  };
};

export const [useSpreedlySingleton, SpreedlySingletonProvider] =
  createSingletonHook(useSpreedly);
