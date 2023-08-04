import { Reducer } from "react";

import { State, Actions, ActionTypes } from "../types";

import initialState from "./initialState";

const reducer: Reducer<State, Actions> = (state: State, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SET_SRC_LOADED:
      return {
        ...state,
        hasLoadedScript: true,
      };
    case ActionTypes.SET_READY:
      return {
        ...state,
        loading: false,
      };
    case ActionTypes.SET_CREDIT_CARD:
      return {
        ...state,
        card: action.card,
      };
    case ActionTypes.SET_INPUTS:
      return {
        ...state,
        inputs: action.inputs,
      };
    case ActionTypes.SET_ERRORS:
      return {
        ...state,
        error: action.error,
      };
    case ActionTypes.SET_3DS_EVENTS:
      return {
        ...state,
        threeDsEvents: action.threeDsEvents,
      };
    case ActionTypes.CLEAR:
      return initialState;
    default:
      throw new Error("Invalid action type.");
  }
};

export default reducer;
