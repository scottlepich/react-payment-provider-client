import { PaymentType } from "./constants";

import { SPREEDLY_SCRIPT_URL } from "./spreedly/constants";
// TODO: import { STRIPE_SCRIPT_URL } from "./stripe/constants";

const useProvider = (paymentType: PaymentType) => {
  if (!Object.values(PaymentType).includes(paymentType)) {
    throw new Error("Unknown PaymentType passed to usePayment.");
  }

  // TODO: get constants based on provider
  // TODO: moar params

  return {
    src: SPREEDLY_SCRIPT_URL,
  };
};

export default useProvider;
