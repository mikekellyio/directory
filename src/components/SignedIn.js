import React, { Component } from "react";
import PropTypes from "prop-types";

export default class SignedIn extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    var user = this.props.user;
    return <div>Welcome {user.displayName}!</div>;
  }
}
