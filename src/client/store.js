import { configureStore } from "@reduxjs/toolkit";
import { initialState } from "./initial-state.js";
import reducer from "./reducers.js";

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState
});

export default store;
