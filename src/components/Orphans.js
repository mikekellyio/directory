import React, { Component } from "react";
import PropTypes from "prop-types";
import sortBy from "sort-by";
import queryString from "query-string";
import FamilyPicture from "./FamilyPicture";
import { Link } from "react-router-dom";

export default class Orphans extends Component {
  static propTypes = {
    orphans: PropTypes.array
  };

  render() {
    var sortedOrphans = this.props.orphans.sort(sortBy("email"));
    var orphans = sortedOrphans.map(orphan => (
      <OrphanCard orphan={orphan} key={orphan.id} />
    ));
    return (
      <div className="orphans--component">
        {orphans.length > 0 ? (
          <div className="card-deck mb-3">{orphans}</div>
        ) : (
          <p>No orphans found</p>
        )}
      </div>
    );
  }
}

class OrphanCard extends Component {
  render() {
    var orphan = this.props.orphan;
    var familyParams = queryString.stringify({
      email: orphan.email,
      photo: orphan.file
    });
    return (
      <div className="card col-mb-4">
        <FamilyPicture photo={orphan.file} />
        <div className="card-body">
          <h5 className="card-title">
            {orphan.email || "No email found"} <br />
            <small>{orphan.file}</small>
          </h5>
        </div>

        <div className="card-footer text-muted">
          {orphan.attachedByEmail === "TRUE" ? (
            <Link className="card-link" to={`/family/${orphan.famIdByEmail}`}>
              View Family
            </Link>
          ) : (
            <Link className="card-link" to={`/family/new?${familyParams}`}>
              Add as New Family
            </Link>
          )}
        </div>
      </div>
    );
  }
}
