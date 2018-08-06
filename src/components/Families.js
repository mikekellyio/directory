import "../css/Families.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FamilyCard from "./FamilyCard";
import sortBy from "sort-by";

export default class Families extends Component {
  static propTypes = {
    families: PropTypes.array,
    emit: PropTypes.func.isRequired
  };

  state = {
    showActive: true
  };

  toggleActive = ev => {
    ev.preventDefault();
    this.setState({ showActive: !this.state.showActive });
  };

  render() {
    var sortedFamilies = this.props.families
      .filter(
        f => this.state.showActive === (f.active === undefined || f.active)
      )
      .sort(sortBy("lastName", "firstName"));
    var families = sortedFamilies.map(family => (
      <FamilyCard family={family} key={family.id} />
    ));
    return (
      <div className="families--component">
        <div className="row justify-content-between">
          <span className="col-sm-8">
            <Link className="btn btn-link" to="/family/new">
              Create New Family
            </Link>
          </span>
          <span className="col-lg-2 col-sm-3">
            <button
              className="btn btn-link "
              type="button"
              onClick={this.toggleActive}
            >
              View {this.state.showActive ? "Inactive" : "Active"}
            </button>
          </span>
        </div>
        {families.length > 0 ? (
          <div className="card-deck mb-3">{families}</div>
        ) : (
          <p>No families found</p>
        )}
      </div>
    );
  }
}
