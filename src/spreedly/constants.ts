export const HIDDEN_IFRAME = "hidden-iframe";
export const CHALLENGE_IFRAME = "challenge-iframe";
export const CHALLENGE_IFRAME_CLASSES = "challenge-iframe";
export const SPREEDLY_CVV_FIELD = "spreedly-cvv";
export const SPREEDLY_NUMBER_FIELD = "spreedly-cc-number";
export const SPREEDLY_SCRIPT_URL =
  "https://core.spreedly.com/iframe/iframe-v1.min.js";

export enum SpreedlyEvents {
  PAYMENT_METHOD = "paymentMethod", // Success call from Spreedly.tokenizeCreditCard.
  ERRORS = "errors",
  THREEDS_STATUS = "3ds:status",
  READY = "ready",
  INPUT = "input",
}
