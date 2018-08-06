import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import State from "./State";

import "bootstrap/dist/css/bootstrap.css";

import "./reactions/crud";
import "./reactions/families";
import "./reactions/orphans";
import "./reactions/login";

const rootEl = document.getElementById("root");

var render = () => {
  ReactDOM.render(<App store={State.get()} emit={State.emit} />, rootEl);
};

State.on("update", () => {
  render();
});

if (module.hot && process.env.NODE_ENV === "development") {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    ReactDOM.render(<NextApp store={State.get()} emit={State.emit} />, rootEl);
  });
}
render();
