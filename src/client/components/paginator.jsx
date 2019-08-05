import React from "react";
import PropTypes from "prop-types";
import { connect } from "preact-redux";
import { getNextPage, getPrevPage } from "../actions.js";

export class Paginator extends React.Component {
  render() {
    if (this.props.randomMode) {
      return null;
    }

    return (
      <div className="flex">
        <a
          className="page-link prev-page"
          href="#"
          onClick={this.props.onGetPrevPage.bind(this)}
        >
          &larr; Previous
        </a>
        <a
          className="page-link next-page"
          href="#"
          onClick={this.props.onGetNextPage.bind(this)}
        >
          Next &rarr;
        </a>
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
