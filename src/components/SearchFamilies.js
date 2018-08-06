import React, { Component } from "react";
import PropTypes from "prop-types";
import Families from "./Families";
import Fuse from "fuse.js";

export default class SearchFamilies extends Component {
  static propTypes = {
    families: PropTypes.array,
    showSearch: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = { families: this.props.families, query: "" };

    var options = {
      shouldSort: true,
      tokenize: true,
      matchAllTokens: true,
      includeMatches: true,
      threshold: 0.3,
      location: 0,
      distance: 1,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: ["lastName", "firstName", "children", "email"],
      id: "id"
    };
    this.fuse = new Fuse(this.props.families, options);
  }

  search = ev => {
    if (ev.target.value) {
      var famIds = this.fuse.search(ev.target.value).map(result => result.item);
      var families = Object.values(this.props.families).filter(fam =>
        famIds.includes(fam.id)
      );
      this.setState({ families: families });
    } else {
      this.setState({ families: this.props.families });
    }
  };

  render() {
    var families = this.state.families;
    if (this.props.showSearch) {
      return (
        <div className="search-families--component" tabIndex="0">
          <div className="container fixed-top">
            <input
              className="search form-control"
              type="text"
              placeholder="Search..."
              onChange={this.search}
            />
          </div>

          <Families families={families} emit={this.props.emit} />
        </div>
      );
    } else return <Families families={families} emit={this.props.emit} />;
  }
}
