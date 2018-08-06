import State from "../State";

State.on("login:success", currentUser => {
  State.get().set("currentUser", currentUser.toJSON());
});
