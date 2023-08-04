import { PaymentType } from "./constants";

import { SPREEDLY_SCRIPT_URL } from "./spreedly/constants";
// TODO: import { STRIPE_SCRIPT_URL } from "./stripe/constants";

const useProvider = (paymentType: PaymentType) => {
  switch (paymentType) {
    case PaymentType.Spreedly:
      // TODO: moar params
      return {
        src: SPREEDLY_SCRIPT_URL,
        hasWindowModule: typeof window?.Spreedly !== "undefined",
      };
    // TODO: case PaymentType.Stripe:
    default:
      throw new Error("Unknown PaymentType passed to usePayment.");
  }
};

export default useProvider;
