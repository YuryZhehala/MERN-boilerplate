/* eslint-disable no-unused-expressions */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./screens/Home/index";

import store from "./store";

const wrapper = document.getElementById("root");

wrapper
  ? ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      wrapper
    )
  : false;
