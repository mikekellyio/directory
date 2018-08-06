import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "../firebase";
import firebaseui from "firebaseui";
import { FirebaseAuth } from "react-firebaseui";

export default class Login extends Component {
  static propTypes = { emit: PropTypes.func };

  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    signInSuccessUrl: "/",
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    // Sets the `signedIn` state property to `true` once signed in.
    callbacks: {
      signInSuccessWithAuthResult: authResult => {
        this.props.emit("login:sucess", authResult.user);
        return false; // Avoid redirects after sign-in.
      }
    }
  };

  render() {
    return (
      <div>
        <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
}
