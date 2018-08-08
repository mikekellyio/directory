import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import State from "./State";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import "./reactions";

const rootEl = document.getElementById("root");

var render = () => {
  ReactDOM.render(
    <Router>
      <Route
        render={props => (
          <App store={State.get()} emit={State.emit} {...props} />
        )}
      />
    </Router>,
    rootEl
  );
};

State.on("update", () => {
  render();
});

if (module.hot && process.env.NODE_ENV === "development") {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    ReactDOM.render(
      <Router>
        <Route
          render={props => (
            <NextApp store={State.get()} emit={State.emit} {...props} />
          )}
        />
      </Router>,
      rootEl
    );
  });
}
render();
