import reducer from "./reducer";
import initialState from "./initialState";

import {
  Actions,
  ActionTypes,
  CreditCard,
  CreditCardData,
  InputField,
  ThreeDSEvent,
} from "../types/index.d";

const {
  SET_3DS_EVENTS,
  SET_CREDIT_CARD,
  SET_ERRORS,
  SET_INPUTS,
  SET_READY,
  SET_SRC_LOADED,
  CLEAR,
} = ActionTypes;

describe("context reducer", () => {
  it(`should set hasLoadedScript: true when ActionType is "${SET_SRC_LOADED}"`, () => {
    const action: Actions = { type: SET_SRC_LOADED };
    expect(reducer(initialState, action).hasLoadedScript).toEqual(true);
  });

  it(`should set loading: false when ActionType is "${SET_READY}"`, () => {
    const action: Actions = { type: SET_READY };
    expect(reducer(initialState, action).loading).toEqual(false);
  });

  it(`should set credit card values when ActionType is "${SET_CREDIT_CARD}"`, () => {
    const card: CreditCard = {
      data: {} as CreditCardData,
      token: "-1",
    };
    const action: Actions = { type: SET_CREDIT_CARD, card };
    expect(reducer(initialState, action).card).toEqual(card);
  });

  it(`should set inputs when ActionType is "${SET_INPUTS}"`, () => {
    const inputs: InputField[] = [];
    const action: Actions = { type: SET_INPUTS, inputs };
    expect(reducer(initialState, action).inputs).toEqual(inputs);
  });

  it(`should set errors when ActionType is "${SET_ERRORS}"`, () => {
    const error: Error = new Error("test");
    const action: Actions = { type: SET_ERRORS, error };
    expect(reducer(initialState, action).error).toEqual(error);
  });

  it(`should set 3DS events when ActionType is "${SET_3DS_EVENTS}"`, () => {
    const threeDsEvents: ThreeDSEvent[] = [];
    const action: Actions = { type: SET_3DS_EVENTS, threeDsEvents };
    expect(reducer(initialState, action).threeDsEvents).toEqual(threeDsEvents);
  });

  it(`should reset to initialState when ActionType is "${CLEAR}"`, () => {
    const action: Actions = { type: CLEAR };
    expect(reducer(initialState, action)).toEqual(initialState);
  });

  it("should throw error when ActionType is invalid", () => {
    const action: Actions = { type: "INVALID" } as any;
    expect(() => reducer(initialState, action)).toThrowError();
  });
});
