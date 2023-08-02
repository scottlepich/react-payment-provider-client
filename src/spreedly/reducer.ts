import { Reducer } from "react";

import { State, Actions, ActionTypes } from "~types/spreedly";

import initialState from "./initialState";

const reducer: Reducer<State, Actions> = (state: State, action: Actions) => {
  switch (action.type) {
    case ActionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
