import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FamilyCard extends Component {
  static propTypes = {
    family: PropTypes.object
  };

  render() {
    var family = this.props.family;
    return (
      <div className="card col-mb-4">
        <FamilyPicture photo={family.photo} />
        <div className="card-body">
          <h5 className="card-title">
            {family.firstName} {family.lastName} <br />
            <small>{family.children}</small>
          </h5>
          <div className="card-text">
            <FamilyAddress family={family} />
          </div>
        </div>
      </div>
    );
  }
}

class FamilyAddress extends Component {
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

class FamilyPicture extends Component {
  static propTypes = {
    photo: PropTypes.string
  };

  render() {
    var photo = this.props.photo;
    var baseFilename = photo.split(".")[0];
    if (photo.split(".")[1] === "jpg") {
      var url = `http://s3.amazonaws.com/mbcl-2018-directory/web/${baseFilename}A.jpg`;
    } else {
      url = `http://s3.amazonaws.com/mbcl-2018-directory/web/not-found.jpg`;
    }

    return <img className="card-img-top" src={url} alt="family" />;
  }
}
