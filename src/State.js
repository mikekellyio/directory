import Freezer from "freezer-js";
import initialState from "./initialState";
import debug from "debug";

var log = debug("mbcl-directory:state:emit");

var State = new Freezer(initialState);

State.on("beforeAll", (eventName, ...args) => {
  log(eventName, ...args);
});

window.State = State;

export default State;
