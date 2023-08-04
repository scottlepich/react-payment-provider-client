import { useReducer, Reducer, ReactNode } from "react";

import { State, Actions } from "../types";

import reducer from "../reducer";
import initialState from "../initialState";

import PaymentContext from "./PaymentContext";

type Props = {
  children: ReactNode;
};

const PaymentContextProvider = ({ children }: Props) => {
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

export default PaymentContextProvider;
