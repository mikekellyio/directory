import State from "../State";
import firebase from "../firebase";
import debug from "debug";

var log = debug("mbcl-directory:reactions:families");

var db = firebase.database();

var listeners = {};
window.listeners = listeners;

State.on("families:new", family => {
  var key = db
    .ref()
    .child("/families")
    .push().key;

  return State.emit("objects:new", "/families", family, key);
})
  .on("families:edit", family => {
    return State.emit("objects:edit", "/families", family);
  })
  .on("family:update", (key, data) => {
    var family = State.get().families[key].toJS();
    return State.emit("families:edit", family);
  })
  .on("family:remove", key => {
    var familiesRef = firebase.database().ref("families/" + key);
    return familiesRef.remove();
  })
  .on("family:subscribe", key => {
    if (!listeners["/families/" + key]) {
      var familiesRef = firebase.database().ref("families/" + key);
      familiesRef.on("value", snapshot => {
        State.emit("families:changed", key, snapshot.val());
      });
      listeners["/families/" + key] = familiesRef;
    }
  })
  .on("family:unsubscribe", key => {
    if (listeners["/families/" + key]) {
      listeners["/families/" + key].off();
    }
  })
  .on("families:subscribe", () => {
    if (!listeners["/families"]) {
      log("attaching events to /families");
      var familiesRef = db.ref("/families");
      familiesRef.on("child_added", data => {
        State.emit("families:added", data.key, data.val());
      });
      familiesRef.on("child_changed", data => {
        State.emit("families:updated", data.key, data.val());
      });
      familiesRef.on("child_removed", data => {
        State.emit("families:removed", data.key);
      });

      listeners["/families"] = familiesRef;
    }
  })
  .on("families:unsubscribe", () => {
    if (listeners["/families"]) {
      listeners["/families"].off();
    }
  })
  .on("families:added", (key, val) => {
    if (val) val.id = key;
    if (val.active === undefined) val.active = true;
    State.get().families.set(key, val);
  })
  .on("families:updated", (key, val) => {
    if (val) val.id = key;
    State.get().families.set(key, val);
  })
  .on("families:changed", (key, val) => {
    if (val) val.id = key;
    State.get().families.set(key, val);
  })
  .on("families:removed", key => {
    State.get().families.remove(key);
  });
