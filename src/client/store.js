import { createStore } from "redux";
import reducer from "./reducers.js";

const initialState = {
  searchText: "",
  sortBy: "name",
  pageSize: 12,
  pageIndex: 0,
  total: 0,
  thumbnails: [],
  fullImage: "",
  slideImage: "",
  loading: false,
  randomMode: false
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
