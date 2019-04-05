import { createStore, applyMiddleware, compose } from "redux";
import reduxPromise from "redux-promise";

import rootReducer from "./modules";
import getAllUrlParams from "../helpers/getParameters";

// create the promise  middleware
const middlewares = [reduxPromise];

// dev tools middleware
const devtool = window.__REDUX_DEVTOOLS_EXTENSION__;
const reduxDevTools = (devtool && devtool()) || compose;

const input = getAllUrlParams();

const defaultState = {
  moneyclick: { input }
};

// create a redux store with our reducer above and middleware
const store = createStore(
  rootReducer,
  defaultState,
  compose(
    applyMiddleware(...middlewares),
    reduxDevTools
  )
);

export default store;
