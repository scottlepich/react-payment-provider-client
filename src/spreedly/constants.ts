export const SPREEDLY_SCRIPT_URL =
  "https://core.spreedly.com/iframe/iframe-v1.min.js";

export enum SpreedlyEvents {
  PAYMENT_METHOD = "paymentMethod", // Success call from Spreedly.tokenizeCreditCard.
  ERRORS = "errors",
  THREEDS_STATUS = "3ds:status",
  READY = "ready",
  INPUT = "input",
}
