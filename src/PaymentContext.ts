import { createContext, Dispatch, useContext } from "react";

import { State, Actions } from "./types/index.d";

export interface ContextShape {
  state: State;
  dispatch: Dispatch<Actions>;
}

const PaymentContext = createContext<ContextShape | undefined>(undefined);

export const useState = () => useContext(PaymentContext)?.state;

export const useDispatch = () => useContext(PaymentContext)?.dispatch;

export default PaymentContext;
