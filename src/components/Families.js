import "../css/Families.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import FamilyCard from "./FamilyCard";
import sortBy from "sort-by";

export default class Families extends Component {
  static propTypes = {
    families: PropTypes.array,
    emit: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.emit("families:subscribe");
  }

  componentWillUnmount = () => {
    this.props.emit("families:unsubscribe");
  };

  render() {
    var sortedFamilies = this.props.families.sort(sortBy("lastName"));
    var families = sortedFamilies.map(family => (
      <FamilyCard family={family} key={family.id} />
    ));
    return (
      <div className="families--component">
        {families.length > 0 ? (
          <div className="card-deck mb-3">{families}</div>
        ) : (
          <p>No families found</p>
        )}
      </div>
    );
  }
}
