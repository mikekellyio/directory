import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import FamilyAddress from "./FamilyAddress";
import FamilyPicture from "./FamilyPicture";

export default class FamilyCard extends Component {
  static propTypes = {
    family: PropTypes.object
  };

  render() {
    var family = this.props.family;
    return (
      <div className="card col-mb-4">
        <FamilyPicture
          photo={family.photo}
          defaultPhoto={family.defaultPhoto}
        />
        <div className="card-body">
          <h5 className="card-title">
            {family.firstName} {family.lastName} <br />
            <small>{family.children}</small>
          </h5>
          <div className="card-text">
            <FamilyAddress family={family} />
          </div>
        </div>
        <div className="card-footer text-muted">
          <Link className="card-link" to={`/family/${family.id}`}>
            Edit
          </Link>
        </div>
      </div>
    );
  }
}
