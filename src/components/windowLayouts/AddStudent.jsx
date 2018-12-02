import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createStudent,
  setStage,
  setDivision
} from "../../actions/studentActions";

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.i18n = props.i18n;
    this.locale = props.locale;
  }

  handleStage = e => {
    const stage = this.i18n.getToken(e.target.value, this.locale);
    this.props.setStage(stage);
    this.unCheck();
  };

  handleDivision = e => {
    const division = this.i18n.getToken(e.target.value, this.locale);
    this.props.setDivision(division);
    this.unCheck();
  };

  unCheck = () => {
    const checkBoxes = document.querySelectorAll("input[type=checkbox]");
    [].map.call(checkBoxes, el => {
      if (el.checked) el.checked = false;
    });
  };

  handleAddStudent = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const newStudent = {};
    const studyMaterials = [];
    data.forEach((value, key) => {
      if (key.includes("materials")) studyMaterials.push(value);
      else if (key === "stage")
        newStudent[key] = this.i18n.getToken(value, this.locale);
      else if (key === "division")
        newStudent[key] = this.i18n.getToken(value, this.locale);
      else newStudent[key] = value;
    });
    newStudent["materials"] = studyMaterials.join("|");
    console.log(newStudent);
    this.props.createStudent(newStudent);
  };

  render() {
    const {
      stage,
      division,
      hasDivision,
      divisions,
      stages
    } = this.props.students;
    return (
      <div className="pane">
        <div className="padded-more">
          <h3 className="text-center">
            {this.i18n.translate(
              "REGISTER_NEW_STUDENT",
              "Register new student"
            )}
          </h3>
          <form onSubmit={this.handleAddStudent}>
            <div className="form-group half">
              <label htmlFor="firstName">
                {this.i18n.translate("FIRST_NAME", "First name")}
              </label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder={this.i18n.translate("FIRST_NAME", "First name")}
              />
            </div>
            <div className="form-group half">
              <label htmlFor="lastName">
                {this.i18n.translate("LAST_NAME", "Last name")}
              </label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder={this.i18n.translate("LAST_NAME", "Last name")}
              />
            </div>
            <div className="form-group half">
              <label htmlFor="birthDate">
                {this.i18n.translate("BIRTH_DATE", "Birth date")}
              </label>
              <input type="date" className="form-control" name="birthDate" />
            </div>
            <div className="form-group half">
              <label htmlFor="birthPlace">
                {this.i18n.translate("BIRTH_PLACE", "Birth place")}
              </label>
              <input
                type="text"
                className="form-control"
                name="birthPlace"
                placeholder={this.i18n.translate("BIRTH_PLACE", "Birth place")}
              />
            </div>
            <div className="form-group half">
              <label htmlFor="inCareOf">
                {this.i18n.translate("IN_CARE_OF", "In care of")}
              </label>
              <input
                type="text"
                className="form-control"
                name="inCareOf"
                placeholder={this.i18n.translate("IN_CARE_OF", "In care of")}
              />
            </div>
            <div className="form-group half">
              <label htmlFor="identityCard">
                {this.i18n.translate(
                  "HOLDER_OF_IDENTITY_CARD_OR_DRIVING_LICENSE_NUMBER",
                  "Holder of identity card/driving license"
                )}
              </label>
              <input type="text" className="form-control" name="identityCard" />
            </div>
            <div className="form-group half">
              <label htmlFor="identityCardDelivery">
                {this.i18n.translate("DELIVERED_ON", "Delivered on")}
              </label>
              <input
                type="text"
                className="form-control"
                name="identityCardDelivery"
              />
            </div>
            <div className="form-group half">
              <label htmlFor="deliveryPlace">
                {this.i18n.translate("DELIVERED_FROM", "Delivered from")}
              </label>
              <input
                type="text"
                className="form-control"
                name="deliveryPlace"
              />
            </div>
            <div className="form-group half">
              <label htmlFor="phone1">
                {this.i18n.translate("PHONE_NUMBER_1", "Phone 1")}
              </label>
              <input type="text" className="form-control" name="phone1" />
            </div>
            <div className="form-group half">
              <label htmlFor="phone2">
                {this.i18n.translate("PHONE_NUMBER_2", "Phone 2")}
              </label>
              <input type="text" className="form-control" name="phone2" />
            </div>
            <div className="form-group">
              <label htmlFor="address">
                {this.i18n.translate("ADDRESS", "Address")}
              </label>
              <input type="text" className="form-control" name="address" />
            </div>
            <div className="form-group half">
              <label htmlFor="stage">
                {this.i18n.translate("STAGE", "Stage")}
              </label>
              <select
                className="form-control"
                name="stage"
                onChange={this.handleStage}
                value={this.i18n.translate(stage, "")}>
                {stages.map((stage, index) => (
                  <option key={index}>
                    {this.i18n.translate(stage[0], stage[1])}
                  </option>
                ))}
              </select>
            </div>
            {hasDivision[stage] && (
              <div className="form-group half">
                <label htmlFor="division">
                  {this.i18n.translate("DIVISION", "Division")}
                </label>
                <select
                  className="form-control"
                  name="division"
                  onChange={this.handleDivision}>
                  {divisions.map((division, index) => (
                    <option key={index}>
                      {this.i18n.translate(division[0], division[1])}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="form-group">
              {!hasDivision[stage]
                ? this.props.students[stage].map((material, index) => {
                    return (
                      <div className="checkbox" key={index}>
                        <label>
                          <input
                            type="checkbox"
                            name="materials[]"
                            value={material[0]}
                          />
                          {this.i18n.translate(material[0], material[1])}
                        </label>
                      </div>
                    );
                  })
                : this.props.students[stage][division].map(
                    (material, index) => {
                      return (
                        <div className="checkbox" key={index}>
                          <label>
                            <input
                              type="checkbox"
                              name="materials[]"
                              value={material[0]}
                            />
                            {this.i18n.translate(material[0], material[1])}
                          </label>
                        </div>
                      );
                    }
                  )}
            </div>
            <div className="text-center" style={{ width: "100%" }}>
              <button
                className="btn btn-large btn-primary"
                style={{ padding: "7px 40px" }}>
                {this.i18n.translate("REGISTER", "Register")}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ students }) => ({
  students: students
});

const mapActionsToProps = { createStudent, setStage, setDivision };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddStudent);
