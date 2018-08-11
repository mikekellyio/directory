import React, { Component } from "react";
import PropTypes from "prop-types";
import LazyLoad from "react-lazy-load";

export default class FamilyPicture extends Component {
  static propTypes = {
    photo: PropTypes.string,
    defaultPhoto: PropTypes.string,
    onChange: PropTypes.func
  };

  extensions = ["A", "B", "C"];

  constructor(props) {
    super(props);

    this.state = { photoIndex: null };
  }

  incrementIndex = () => {
    var newIndex =
      this.state.photoIndex === null ? 0 : this.state.photoIndex + 1;
    if (this.props.onChange) this.props.onChange(this.photo(newIndex));
    this.setState({
      photoIndex: newIndex
    });
  };

  photo = index => {
    var { photo, defaultPhoto } = this.props;
    if (this.notFound()) return "not-found.jpg";
    if (this.state.photoIndex === null)
      return defaultPhoto || `${photo.split(".")[0]}A.jpg`;

    return `${photo.split(".")[0]}${
      this.extensions[(index || this.state.photoIndex) % 3]
    }.jpg`;
  };

  notFound = () => {
    return this.props.photo === "#N/A";
  };

  render() {
    var url = `https://s3.amazonaws.com/mbcl-2018-directory/web2/${this.photo()}`;

    return (
      <LazyLoad offset={100}>
        <img
          className="card-img-top"
          src={url}
          alt="family"
          onClick={this.incrementIndex}
        />
      </LazyLoad>
    );
  }
}
