import { CreditCard, InputField, ThreeDSEvent } from "./spreedly";

import { ActionTypes } from "../constants";

// State management
export type State = {
  card: CreditCard;
  error: Error | undefined;
  inputs: InputField[];
  loading: boolean;
  hasLoadedScript: boolean;
  threeDsEvents: ThreeDSEvent[];
};

export type Actions =
  | { type: ActionTypes.CLEAR }
  | { type: ActionTypes.SET_3DS_EVENTS; threeDsEvents: ThreeDSEvent[] }
  | { type: ActionTypes.SET_CREDIT_CARD; card: CreditCard }
  | { type: ActionTypes.SET_ERRORS; error: Error | undefined }
  | { type: ActionTypes.SET_INPUTS; inputs: InputField[] }
  | { type: ActionTypes.SET_READY }
  | { type: ActionTypes.SET_SRC_LOADED };
