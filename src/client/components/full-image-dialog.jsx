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
      <div className="modal d-flex" tabIndex="-1" role="dialog">
        <div className="modal-dialog full-image-modal" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.handleCloseDialog.bind(this)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="image-scroller">
                <img
                  className="mx-auto d-block img-fluid"
                  src={this.props.href}
                />
              </div>
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
