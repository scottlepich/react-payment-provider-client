export enum PaymentType {
  Spreedly = "spreedly",
  // TODO: Stripe: "stripe",
  // ...others?
}

export enum ActionTypes {
  CLEAR = "clear",
  SET_3DS_EVENTS = "set_3ds_events",
  SET_CREDIT_CARD = "set_credit_card",
  SET_ERRORS = "set_errors",
  SET_INPUTS = "set_inputs",
  SET_READY = "set_ready",
  SET_SRC_LOADED = "set_src_loaded",
}

export const HIDDEN_IFRAME_ID = "hidden-iframe";
export const CARD_NUMBER_FIELD_ID = "credit-card-number-field";
export const CVV_FIELD_ID = "cvv-field";
export const CHALLENGE_IFRAME_ID = "challenge-iframe";
export const CHALLENGE_IFRAME_CLASS = "TODO";
