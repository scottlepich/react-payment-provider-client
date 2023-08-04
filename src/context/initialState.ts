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
  hasLoadedScript: false,
};

export default initialState;
