import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyAK71QzjSxOAaM6bwFakkTl_NzDwHU6-Fo",
  authDomain: "mbc-l-directory.firebaseapp.com",
  databaseURL: "https://mbc-l-directory.firebaseio.com",
  projectId: "mbc-l-directory",
  storageBucket: "mbc-l-directory.appspot.com",
  messagingSenderId: "1063247888586"
};
firebase.initializeApp(config);

window.firebase = firebase;
export default firebase;
