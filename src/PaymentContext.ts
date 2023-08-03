import { createContext, Dispatch } from "react";

import { State, Actions } from "./types/spreedly";

export interface ContextShape {
  state: State;
  dispatch: Dispatch<Actions>;
}

const PaymentContext = createContext<ContextShape | undefined>(undefined);

export default PaymentContext;
