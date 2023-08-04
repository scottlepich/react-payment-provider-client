import { State } from "../types";

const initialState: State = {
  loading: true,
  error: undefined,
  card: {
    token: undefined,
    data: undefined,
  },
  inputs: [],
  threeDsEvents: [],
  scriptIsLoaded: false,
};

export default initialState;
