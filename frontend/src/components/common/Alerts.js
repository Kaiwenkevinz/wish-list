import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.price) alert.error(`Price: ${error.msg.price.join()}`);
      if (error.msg.wantness) alert.error(`Wantness: ${error.msg.wantness.join()}`);
      if (error.msg.result) alert.error(`Result: ${error.msg.result.join()}`);
    }

    if (message !== prevProps.message) {
      if (message.deleteItem) alert.success(message.deleteItem);
      if (message.createItem) alert.success(message.createItem);
      if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
    }
  }

  //   componentDidUpdate(prevProps) {
  //     const { error, alert, message } = this.props;
  //     if (error !== prevProps.error) {
  //       if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
  //       if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
  //       if (error.msg.message)
  //         alert.error(`Message: ${error.msg.message.join()}`);
  //       if (error.msg.non_field_errors)
  //         alert.error(error.msg.non_field_errors.join());
  //       if (error.msg.username) alert.error(error.msg.username.join());
  //     }

  //     if (message !== prevProps.message) {
  //       if (message.deleteLead) alert.success(message.deleteLead);
  //       if (message.addLead) alert.success(message.addLead);
  //       if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
  //     }
  //   }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));