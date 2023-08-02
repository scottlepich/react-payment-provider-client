import { createSingletonHook } from "./singletonHook";

import useSpreedly from "~spreedly/useSpreedly";

export enum PaymentProviderNames {
  Spreedly = "spreedly",
  // TODO: Stripe: "stripe",
}

interface UsePaymentProvider {
  name: PaymentProviderNames;
}

// return provider hook and context
type ReturnType = {
  usePayment: any;
  PaymentProvider: any;
};

export const usePaymentProvider = ({
  name,
}: UsePaymentProvider): ReturnType => {
  // TODO: elseif stripe
  if (name !== PaymentProviderNames.Spreedly) {
    throw new Error("Unknown PaymentProviderName passed to usePaymentProvider");
  }

  // Spreedly
  // TODO: move here
  // Script src loader
  // env key
  // state machine to top

  const [usePayment, PaymentProvider] = createSingletonHook(useSpreedly);

  return {
    usePayment,
    PaymentProvider,
  };
};
