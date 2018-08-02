import "./css/App.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "./firebase";
import Header from "./Header";
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

    return (
      <Router>
        <div className="container">
          <Header {...this.props} />
          <section>
            <Switch>
              <Route
                exact
                path="/login"
                render={props => <Login {...props} />}
              />
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

              <Route exact path="/" render={() => <p>Welcome!</p>} />
            </Switch>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
