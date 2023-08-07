import { createContext, Dispatch } from "react";

import initialState from "./initialState";

import { State, Actions } from "../types";

export interface ContextShape {
  state: State;
  dispatch: Dispatch<Actions>;
}

const PaymentContext = createContext<ContextShape>({
  state: initialState,
  dispatch: () => undefined,
});

export default PaymentContext;
