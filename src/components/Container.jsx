import React, { Component } from "react";

import Sidebar from "./Sidebar";
import {
  AddStudent,
  Students,
  Settings,
  About,
  EditStudent
} from "./windowLayouts";

import { connect } from "react-redux";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainList: [
        { component: AddStudent },
        { component: Students },
        { component: Settings },
        { component: About }
      ],
      activeTab: 0,
      hasModal: false,
      student: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeTab !== this.props.activeTab) {
      this.setState({ activeTab: nextProps.activeTab });
    }
  }

  handleEdit = student => {
    this.setState({ hasModal: true, student });
  };

  handleCloseEditStudent = () => {
    this.setState({ hasModal: false });
  };

  render() {
    let modalStyles = { display: "none" },
      overlay = {};
    if (this.state.hasModal) {
      modalStyles = {
        display: "block",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        margin: "20px 0",
        minWidth: "760px",
        zIndex: 3,
        borderRadius: "4px",
        backgroundColor: "#fff"
      };
      overlay = {
        position: "fixed",
        backgroundColor: "rgba(0,0,0,0.5)",
        width: "100%",
        height: "100%",
        zIndex: 2
      };
    }

    const main = this.state.mainList.find(
      (item, index) => index === this.state.activeTab
    );
    return (
      <div>
        <EditStudent
          style={modalStyles}
          i18n={this.props.i18n}
          locale={this.props.locale}
          onCloseEditStudent={this.handleCloseEditStudent}
          student={this.state.student}
        />
        <div className="pane-group">
          <div style={overlay} />
          <Sidebar i18n={this.props.i18n} locale={this.props.locale} />
          {main.component === Students ? (
            <main.component
              i18n={this.props.i18n}
              locale={this.props.locale}
              onEdit={this.handleEdit}
            />
          ) : (
            <main.component i18n={this.props.i18n} locale={this.props.locale} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tab }) => ({
  activeTab: tab.activeTab
});

export default connect(mapStateToProps)(Container);
