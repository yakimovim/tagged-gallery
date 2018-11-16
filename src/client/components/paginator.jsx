import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getNextPage, getPrevPage } from "../actions.js";

export class Paginator extends React.Component {
  render() {
    if (this.props.randomMode) {
      return null;
    }

    return (
      <div className="container">
        <div className="row">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={this.props.onGetPrevPage.bind(this)}
              >
                &larr; Previous
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={this.props.onGetNextPage.bind(this)}
              >
                Next &rarr;
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Paginator.propTypes = {
  randomMode: PropTypes.bool.isRequired,
  onGetNextPage: PropTypes.func.isRequired,
  onGetPrevPage: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    randomMode: state.randomMode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetNextPage: function() {
      getNextPage();
    },
    onGetPrevPage: function() {
      getPrevPage();
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Paginator);
