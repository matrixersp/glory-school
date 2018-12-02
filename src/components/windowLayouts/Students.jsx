import React, { Component } from "react";

import { connect } from "react-redux";
import {
  fetchStudents,
  setStage,
  findStudent,
  deleteStudent
} from "../../actions/studentActions";

class Students extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.i18n = props.i18n;
    this.locale = props.locale;
  }

  componentDidMount() {
    this.props.fetchStudents();
  }

  componentWillReceiveProps() {
    this.props.fetchStudents();
  }

  handleSearch = e => {
    this.props.findStudent(e.target.value);
  };

  handleDelete(id) {
    const del = window.confirm("Are you sure you want to delete this student?");
    if (del) {
      this.props.deleteStudent(id);
    }
  }

  handleStage = e => {
    const stage = this.i18n.getToken(e.target.value, this.locale);
    this.props.setStage(stage);
  };

  render() {
    const { items, stages, stage } = this.props.students;
    return (
      <div className="pane">
        <div className="padded-more">
          <h3 className="text-center">قائمة التلاميذ</h3>
          <div className="container">
            <div className="half">
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
            <div className="half">
              <label htmlFor="stage">
                {this.i18n.translate("SEARCH", "Search")}
              </label>
              <input
                className="form-control"
                type="text"
                onChange={this.handleSearch}
                name="search"
                placeholder="Search for someone"
              />
            </div>
          </div>
          <table className="table-striped">
            <thead>
              <tr>
                <th>{this.i18n.translate("FIRST_NAME", "First name")}</th>
                <th>{this.i18n.translate("LAST_NAME", "Last name")}</th>
                <th>{this.i18n.translate("IN_CARE_OF", "In care of")}</th>
                <th>{this.i18n.translate("DELETE", "Delete")}</th>
                <th>{this.i18n.translate("EDIT", "Edit")}</th>
              </tr>
            </thead>
            <tbody>
              {items.map(student => {
                return (
                  stage === student.stage && (
                    <tr key={student.id}>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.inCareOf}</td>
                      <td>
                        <button
                          onClick={this.handleDelete.bind(this, student.id)}
                          className="btn btn-mini btn-negative">
                          {this.i18n.translate("DELETE", "Delete")}
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={this.props.onEdit.bind(this, student)}
                          className="btn btn-mini btn-positive">
                          {this.i18n.translate("EDIT", "Edit")}
                        </button>
                      </td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ students }) => ({
  students: students
});

const mapActionsToProps = {
  fetchStudents,
  setStage,
  findStudent,
  deleteStudent
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Students);
