import "./css/App.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import firebase from "./firebase";
import Header from "./Header";
import EditFamilyCard from "./components/EditFamilyCard";
import SearchFamilies from "./components/SearchFamilies";
import Families from "./components/Families";
import Orphans from "./components/Orphans";
import Login from "./components/Login";
import debug from "debug";

import withTracker from "./withTracker";

var log = debug("mbcl-directory:App");

class App extends Component {
  static propTypes = { store: PropTypes.object, emit: PropTypes.func };

  componentDidMount() {
    var store = this.props.store;
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        log("signIn", user.toJSON());
        store.set("currentUser", user.toJSON());
      } else {
        log("signOut", store.currentUser && store.currentUser.toJSON());
        store.set("currentUser", null);
        // No user is signed in.
      }
    });
  }

  componentWillMount() {
    this.props.emit("families:subscribe");
    this.props.emit("orphans:subscribe");
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const store = this.props.store;
    var currentUser = this.props.store.currentUser;

    var attachedFiles = Object.values(store.families).map(f => f.photo);

    return (
      <div className="container">
        <Header {...this.props} />
        <section>
          <Switch>
            {!currentUser && (
              <Route
                exact
                path="/login"
                render={props => <Login {...props} />}
              />
            )}
            {currentUser && (
              <Route
                exact
                path="/directory"
                render={props => (
                  <Families
                    {...this.props}
                    {...props}
                    families={Object.values(store.families)}
                  />
                )}
              />
            )}
            {currentUser && (
              <Route
                exact
                path="/orphans"
                render={props => (
                  <Orphans
                    {...this.props}
                    {...props}
                    orphans={Object.values(store.orphans).filter(
                      orphan => !attachedFiles.includes(orphan.file)
                    )}
                  />
                )}
              />
            )}
            {currentUser && (
              <Route
                exact
                path="/family/:id"
                render={props => (
                  <div className="card-deck mb-3">
                    <EditFamilyCard
                      {...this.props}
                      {...props}
                      family={store.families[props.match.params.id]}
                    />
                  </div>
                )}
              />
            )}
            {currentUser && (
              <Route
                exact
                path="/search"
                render={props => (
                  <SearchFamilies
                    {...this.props}
                    {...props}
                    families={Object.values(store.families)}
                    showSearch
                  />
                )}
              />
            )}
            {currentUser && <Redirect to="/directory" />}
            {!currentUser && <Redirect to="/login" />}
          </Switch>
        </section>
      </div>
    );
  }
}

export default withTracker(App);
