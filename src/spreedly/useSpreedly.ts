import * as React from "react";
import { useEffect, useState } from "react";
import useScript from "react-script-hook";
import { SpreedlyEnvironmentKeys } from "./environmentKeys";
import { createSingletonHook } from "./singletonHook";
import {
  CreditCardData,
  InputField,
  SpreedlyEvents,
  SpreedlyPaymentMethod,
  ThreeDSEvent,
} from "./spreedlyTypes";
import {
  CHALLENGE_IFRAME,
  CHALLENGE_IFRAME_CLASSES,
  HIDDEN_IFRAME,
  SPREEDLY_CVV_FIELD,
  SPREEDLY_NUMBER_FIELD,
  SPREEDLY_SCRIPT_URL,
} from "./constants";

// Window definition for spreedly
declare global {
  interface Window {
    Spreedly: any;
  }
}

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
  setEnvironmentKey: (environmentKey: SpreedlyEnvironmentKeys) => void;
};

export const useSpreedly = (): UseSpreedlyReturnType => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cardToken, setCardToken] = useState("");
  const [cardData, setCardData] = useState<SpreedlyPaymentMethod>();
  const [inputs, setInputs] = useState<InputField[]>([]);
  const [threeDSEvents, setThreeDSEvents] = useState<ThreeDSEvent[]>([]);
  const [spreedlyIsLoaded, setSpreedlyIsLoaded] = useState(false);
  const [environmentKey, setEnvironmentKey] = useState(
    SpreedlyEnvironmentKeys.DEMO
  );
  const threeDSLifecycle = React.useRef<any>();

  // Load the Spreedly script.
  const [scriptLoading] = useScript({
    src: SPREEDLY_SCRIPT_URL,
    checkForExisting: true, // prevent multiple script injection
  });

  useEffect(() => {
    if (window.Spreedly) {
      setSpreedlyIsLoaded(true);
      window.Spreedly.on(SpreedlyEvents.READY, () => {
        setLoading(false);
      });

      window.Spreedly.on(SpreedlyEvents.ERRORS, (errors: any) => {
        setError(errors);
      });

      window.Spreedly.on(
        SpreedlyEvents.PAYMENT_METHOD,
        (token: string, pmData: SpreedlyPaymentMethod) => {
          setCardToken(token);
          setCardData(pmData);
        }
      );

      window.Spreedly.on(
        SpreedlyEvents.INPUT,
        (name: string, value: string, activeElement: any) => {
          setInputs((inputs) => [...inputs, { name, value }]);
        }
      );

      window.Spreedly.on(SpreedlyEvents.THREEDS_STATUS, (data: any) => {
        setThreeDSEvents((events) => [{ name: data.event, data }, ...events]);
      });
    }
  }, [scriptLoading, environmentKey]);

  const initializeSpreedly = () => {
    if (window.Spreedly) {
      window.Spreedly.init(environmentKey, {
        numberEl: SPREEDLY_NUMBER_FIELD,
        cvvEl: SPREEDLY_CVV_FIELD,
      });
    }
  };

  const tokenizeCard = (creditCard: any) => {
    if (window.Spreedly) {
      window.Spreedly.tokenizeCreditCard(creditCard);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  const startThreeDS = (transactionToken: string) => {
    if (window.Spreedly) {
      threeDSLifecycle.current = new window.Spreedly.ThreeDS.Lifecycle({
        environmentKey: environmentKey,
        hiddenIframeLocation: HIDDEN_IFRAME,
        challengeIframeLocation: CHALLENGE_IFRAME,
        transactionToken: transactionToken,
        challengeIframeClasses: CHALLENGE_IFRAME_CLASSES,
      });

      console.log(`starting 3ds lifecycle for transaction ${transactionToken}`);
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
    setEnvironmentKey,
  };
};

export const [useSpreedlySingleton, SpreedlySingletonProvider] =
  createSingletonHook(useSpreedly);
