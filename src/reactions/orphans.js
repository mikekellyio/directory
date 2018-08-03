import State from "../State";
import firebase from "../firebase";
import debug from "debug";

var log = debug("mbcl-directory:reactions:orphans");

var db = firebase.database();

var listeners = {};

State.on("orphans:new", orphan => {
  var key = db
    .ref()
    .child("/orphans")
    .push().key;

  return State.emit("objects:new", "/orphans", orphan, key);
})
  .on("orphans:edit", orphan => {
    return State.emit("objects:edit", "/orphans", orphan);
  })
  .on("orphan:update", (key, data) => {
    var orphan = State.get().orphans[key].toJS();
    return State.emit("orphans:edit", orphan);
  })
  .on("orphan:subscribe", key => {
    if (!listeners["/orphans/" + key]) {
      var orphanRef = firebase.database().ref("orphans/" + key);
      orphanRef.on("value", snapshot => {
        State.emit("orphans:changed", key, snapshot.val());
      });
      listeners["/orphans/" + key] = orphanRef;
    }
  })
  .on("orphan:unsubscribe", key => {
    if (listeners["/orphans/" + key]) {
      listeners["/orphans/" + key].off();
    }
  })
  .on("orphans:subscribe", () => {
    if (!listeners["/orphans"]) {
      log("attaching events to /orphans");
      var orphansRef = db.ref("/orphans");
      orphansRef.on("child_added", data => {
        State.emit("orphans:added", data.key, data.val());
      });
      orphansRef.on("child_changed", data => {
        State.emit("orphans:updated", data.key, data.val());
      });
      orphansRef.on("child_removed", data => {
        State.emit("orphans:removed", data.key);
      });

      listeners["/orphans"] = orphansRef;
    }
  })
  .on("orphans:unsubscribe", () => {
    if (listeners["/orphans"]) {
      listeners["/orphans"].off();
    }
  })
  .on("orphans:added", (key, val) => {
    if (val) val.id = key;
    State.get().orphans.set(key, val);
  })
  .on("orphans:changed", (key, val) => {
    if (val) val.id = key;
    State.get().orphans.set(key, val);
  })
  .on("orphans:removed", key => {
    State.get().orphans.remove(key);
  });
