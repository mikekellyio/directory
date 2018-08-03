import "./css/App.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import firebase from "./firebase";
import Header from "./Header";
import EditFamilyCard from "./components/EditFamilyCard";
import SearchFamilies from "./components/SearchFamilies";
import Families from "./components/Families";
import Login from "./components/Login";
import debug from "debug";

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

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const store = this.props.store;
    var currentUser = this.props.store.currentUser;

    return (
      <Router>
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
                    />
                  )}
                />
              )}
              {currentUser && <Redirect to="/directory" />}
              {!currentUser && <Redirect to="/login" />}
            </Switch>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
