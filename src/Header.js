import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import SignedOut from "./components/SignedOut";
import "animate.css";
import logo from "./logo.svg";

export default class Header extends Component {
  static propTypes = {
    store: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleCollapse(ev) {
    ev.preventDefault();
    this.setState({ collapsed: !this.state.collapsed });
  }

  collapse = ev => {
    ev.preventDefault();
    this.setState({ collapsed: true });
  };

  render() {
    var currentUser = this.props.store.currentUser;
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" className="logo" />
            MBC-L Directory
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={
              "collapse navbar-collapse " + (this.state.collapsed ? "" : "show")
            }
            id="navbarSupportedContent"
          >
            <div className="navbar-nav mr-auto" onClick={this.collapse}>
              {currentUser && (
                <NavLink className="nav-item nav-link" to="/directory">
                  Families
                </NavLink>
              )}
              {currentUser && (
                <NavLink exact className="nav-item nav-link" to="/search">
                  Search
                </NavLink>
              )}
              {currentUser && (
                <NavLink exact className="nav-item nav-link" to="/orphans">
                  Unattached Pictures
                </NavLink>
              )}
              {!currentUser && <SignedOut />}
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
