import { State } from "../types/index.d";

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
