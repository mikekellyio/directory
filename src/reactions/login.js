import State from "../State";
import ReactGA from "react-ga";

State.on("login:success", currentUser => {
  currentUser = currentUser.toJSON();
  ReactGA.set({
    email: currentUser.email,
    displayName: currentUser.displayName
  });
  State.get().set("currentUser", currentUser);
});
