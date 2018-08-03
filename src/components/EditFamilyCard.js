import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import FamilyPicture from "./FamilyPicture";

export default class EditFamilyCard extends Component {
  static propTypes = {
    family: PropTypes.object,
    emit: PropTypes.func,
    history: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = this.defaultState();
  }

  updateVal = ev => {
    var state = {};
    state[ev.target.name] = ev.target.value;
    this.setState(state);
  };

  updateDefaultPhoto = photo => {
    this.setState({ defaultPhoto: photo });
  };

  update = ev => {
    ev.preventDefault();
    this.props.emit("families:edit", this.state).then(() => {
      this.props.history.goBack();
    });
  };

  defaultState = () => {
    return (
      this.props.family || {
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
      }
    );
  };

  render() {
    var family = this.props.family;
    return (
      <div className="card col-mb-4">
        <FamilyPicture
          photo={family.photo}
          defaultPhoto={family.defaultPhoto}
          onChange={this.updateDefaultPhoto}
        />
        <div className="card-body">
          {family.photo === "#N/A" && (
            <div className="form-group">
              <label htmlFor="photo">Photo filename</label>
              <input
                type="text"
                className="form-control mb-2"
                name="photo"
                placeholder={"e.g. 2018-4-1-20265.jpg"}
                onChange={this.updateVal}
              />
            </div>
          )}
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
            <label htmlFor="emailAddress">Email address</label>
            <input
              type="email"
              className="form-control mb-3 mr-sm-3"
              name="emailAddress"
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
          <div className="col-sm-1 float-right">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.update}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}
