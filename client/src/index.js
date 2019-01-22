import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
// for requests that take some amount of time. Redux by itself expects every
// request to be instant so redux-thunk is needed
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

// first argument: reducers
// second argument: initial state - most relevant for server side rendering which is not needed here
// third argument: applyMiddleware()
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
