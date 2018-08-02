import State from "../State";
import firebase from "../firebase";

var db = firebase.database();

State.on("objects:new", (collection, object, key) => {
  var newObjectKey =
    key ||
    db
      .ref()
      .child(collection)
      .push().key;
  var updates = {};
  updates[collection + "/" + newObjectKey] = {
    ...object,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    updatedAt: firebase.database.ServerValue.TIMESTAMP
  };
  return db.ref().update(updates);
}).on("objects:edit", (collection, object) => {
  var id = object.id;
  delete object.id;

  var updates = {};
  updates[collection + "/" + id] = {
    ...object,
    updatedAt: firebase.database.ServerValue.TIMESTAMP
  };

  return db.ref().update(updates);
});
