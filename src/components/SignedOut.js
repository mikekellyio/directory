import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class SignedOut extends Component {
  render() {
    return (
      <NavLink exact className="nav-item nav-link" to="/login">
        Sign In
      </NavLink>
    );
  }
}
