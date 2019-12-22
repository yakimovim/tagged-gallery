import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ActionTypes from "../actionTypes.js";

export class FullImageDialog extends React.Component {
  handleCloseDialog() {
    this.props.onCloseDialog();
  }

  render() {
    if (!this.props.href) {
      return null;
    }

    return (
      <div>
        <div class="full-screen-dialog-backdrop" />
        <div class="full-screen-dialog">
          <div class="dialog-header">
            <div
              class="close-button"
              onClick={this.handleCloseDialog.bind(this)}
            >
              Close
            </div>
          </div>
          <div class="dialog-body">
            <div class="full-image-container">
              <img className="full-image" src={this.props.href} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FullImageDialog.propTypes = {
  href: PropTypes.string.isRequired,
  onCloseDialog: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    href: state.fullImage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCloseDialog: function() {
      dispatch({
        type: ActionTypes.REMOVE_FULL_IMAGE
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullImageDialog);
