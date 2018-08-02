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
        </div>
      </div>
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
