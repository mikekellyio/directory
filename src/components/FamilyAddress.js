import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FamilyAddress extends Component {
  static propTypes = {
    family: PropTypes.object
  };
  render() {
    var family = this.props.family;

    return (
      <address>
        {family.street}
        {family.street && <br />}
        {family.city && `${family.city},`} {family.state} {family.zip}
        {(family.city || family.state || family.zip) && <br />}
        {family.street &&
          family.city && (
            <a
              target="_blank"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(
                `${family.street} ${family.city} ${family.state} ${family.zip}`
              )}`}
              className="map-link"
            >
              Map
            </a>
          )}
        {family.street && family.city && <br />}
        {family.phone && (
          <span>
            <abbr title="Phone">P:</abbr>{" "}
            <a href={"tel:" + family.phone}>{family.phone}</a> <br />
          </span>
        )}
        <abbr title="Email">E:</abbr>{" "}
        <a href={"mailto:" + family.email}>{family.email}</a> <br />
      </address>
    );
  }
}
