import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "../firebase";
//import firebaseui from "firebaseui";
import { FirebaseAuth } from "react-firebaseui";

export default class Login extends Component {
  static propTypes = {
    prop: PropTypes
  };

  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google as auth providers.
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    // Sets the `signedIn` state property to `true` once signed in.
    callbacks: {
      signInSuccess: () => {
        return false; // Avoid redirects after sign-in.
      }
    }
  };

  render() {
    return (
      <div>
        <p>Please sign-in:</p>
        <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
}
