import { useReducer, Reducer, ReactNode } from "react";

import { State, Actions } from "./types/spreedly";

import reducer from "./spreedly/reducer";
import initialState from "./spreedly/initialState";

import PaymentContext from "./PaymentContext";

const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<State, Actions>>(
    reducer,
    initialState,
  );

  // TODO: *might* need to memoize this value
  const value = { state, dispatch };

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};

export default PaymentProvider;
