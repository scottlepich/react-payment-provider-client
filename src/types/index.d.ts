import { CreditCard, InputField, ThreeDSEvent } from "./spreedly";

export type * from "./window";

export type * from "./spreedly";

// State management
export type State = {
  card: CreditCard;
  error: Error | undefined;
  inputs: InputField[];
  loading: boolean;
  hasLoadedScript: boolean;
  threeDsEvents: ThreeDSEvent[];
};

export enum ActionTypes {
  CLEAR = "clear",
  SET_3DS_EVENTS = "set_3ds_events",
  SET_CREDIT_CARD = "set_credit_card",
  SET_ERRORS = "set_errors",
  SET_INPUTS = "set_inputs",
  SET_READY = "set_ready",
  SET_SRC_LOADED = "set_src_loaded",
}

export type Actions =
  | { type: ActionTypes.CLEAR }
  | { type: ActionTypes.SET_3DS_EVENTS; threeDsEvents: ThreeDSEvent[] }
  | { type: ActionTypes.SET_CREDIT_CARD; card: CreditCard }
  | { type: ActionTypes.SET_ERRORS; error: Error | undefined }
  | { type: ActionTypes.SET_INPUTS; inputs: InputField[] }
  | { type: ActionTypes.SET_READY }
  | { type: ActionTypes.SET_SRC_LOADED };
