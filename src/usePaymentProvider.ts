import { createSingletonHook } from "./singletonHook";

import useSpreedly from "~spreedly/useSpreedly";

export enum PaymentProviderNames {
  Spreedly = "spreedly",
  // TODO: Stripe: "stripe";
}

interface UsePaymentProvider {
  name: PaymentProviderNames;
}

type ReturnType = {
  usePayment: any;
  PaymentProvider: any;
};

export const usePaymentProvider = ({
  name,
}: UsePaymentProvider): ReturnType => {
  if (name === PaymentProviderNames.Spreedly) {
    // TODO: move here
    // Script attach
    // env key

    const [usePayment, PaymentProvider] = createSingletonHook(useSpreedly);

    return {
      usePayment,
      PaymentProvider,
    };
    // TODO: elseif stripe
  } else {
    throw new Error("Unknown PaymentProviderName passed to usePaymentProvider");
  }
};
