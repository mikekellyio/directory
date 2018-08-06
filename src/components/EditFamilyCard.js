import React, { Component } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTrash from "@fortawesome/fontawesome-pro-solid/faTrash";

import { Link } from "react-router-dom";
import FamilyPicture from "./FamilyPicture";

export default class EditFamilyCard extends Component {
  static propTypes = {
    family: PropTypes.object,
    emit: PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = this.defaultState();
  }

  updateVal = ev => {
    var state = {};
    state[ev.target.name] =
      ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
    this.setState(state);
  };

  updateDefaultPhoto = photo => {
    this.setState({ defaultPhoto: photo });
  };

  update = ev => {
    ev.preventDefault();
    this.props
      .emit(this.state.id ? "families:edit" : "families:new", this.state)
      .then(() => {
        this.props.history.goBack();
      });
  };

  remove = ev => {
    ev.preventDefault();
    if (this.state.id)
      this.props.emit("family:remove", this.state.id).then(() => {
        this.props.history.goBack();
      });
  };

  defaultState = () => {
    var params = queryString.parse(this.props.location.search);

    var defaultVals = Object.assign(
      {
        active: true,
        firstName: "",
        lastName: "",
        children: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        email: "",
        photo: "#N/A"
      },
      params
    );
    return Object.assign(defaultVals, this.props.family);
  };

  render() {
    var family = this.state;
    return (
      <div className="card col-mb-4">
        <FamilyPicture
          photo={this.state.photo || "#N/A"}
          defaultPhoto={family.defaultPhoto}
          onChange={this.updateDefaultPhoto}
        />
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="photo">Photo filename</label>
            <input
              type="text"
              className="form-control mb-2"
              name="photo"
              defaultValue={family.photo === "#N/A" ? "" : family.photo}
              placeholder={"e.g. 2018-4-1-20265.jpg"}
              onChange={this.updateVal}
            />
          </div>
          <label>Name</label>
          <div className="form-inline">
            <label className="sr-only" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              className="form-control mb-2 mr-sm-2"
              name="firstName"
              defaultValue={family.firstName}
              placeholder={family.firstName || "e.g. John & Jane"}
              onChange={this.updateVal}
            />
            <label className="sr-only" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              className="form-control mb-2 mr-sm-2"
              name="lastName"
              defaultValue={family.lastName}
              placeholder={family.lastName || "e.g. Doe"}
              onChange={this.updateVal}
            />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                checked={this.state.active === undefined || this.state.active}
                name="active"
                onChange={this.updateVal}
              />
              <label className="form-check-label" htmlFor="active">
                Active Member
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="children">Children</label>
            <input
              type="text"
              className="form-control mb-2"
              name="children"
              defaultValue={family.children}
              placeholder={family.children || "e.g. Jack, Jen, Jon"}
              onChange={this.updateVal}
            />
          </div>
          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              className="form-control mb-2"
              name="street"
              defaultValue={family.street}
              placeholder={family.street || "e.g. 123 Main St."}
              onChange={this.updateVal}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="form-control mb-2"
              name="city"
              defaultValue={family.city}
              placeholder={family.city || "e.g. Leesburg"}
              onChange={this.updateVal}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              className="form-control mb-2"
              name="state"
              defaultValue={family.state}
              placeholder={family.state || "e.g. VA"}
              onChange={this.updateVal}
            />
          </div>
          <div className="form-group">
            <label htmlFor="zip">Zipcode</label>
            <input
              type="text"
              className="form-control mb-2"
              name="zip"
              defaultValue={family.zip}
              placeholder={family.zip || "e.g. 20147"}
              onChange={this.updateVal}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone #</label>
            <input
              type="telephone"
              className="form-control mb-2"
              name="phone"
              defaultValue={family.phone}
              placeholder={family.phone || "e.g. (703) 321-9874"}
              onChange={this.updateVal}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control mb-3 mr-sm-3"
              name="email"
              defaultValue={family.email}
              placeholder={family.email || "e.g. name@example.com"}
              onChange={this.updateVal}
            />
          </div>
        </div>
        <div className="card-footer text-muted">
          <Link className="card-link" to={`/directory}`}>
            Cancel
          </Link>

          <div className="col-sm-3 float-right">
            <button
              type="submit"
              className="btn btn-primary  float-right"
              onClick={this.update}
            >
              {this.state.id ? "Update" : "Create"}
            </button>
            {this.state.id &&
              !this.props.family.active && (
                <button
                  type="button"
                  className="btn btn-link float-right"
                  onClick={this.remove}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              )}
          </div>
        </div>
      </div>
    );
  }
}
