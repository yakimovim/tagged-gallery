import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getNextPage, getPrevPage } from "../actions.js";

export const Paginator = ({ randomMode, onGetPrevPage, onGetNextPage }) => {
  if(randomMode) return null;

  return (
    <div className="flex">
      <a
        className="page-link prev-page"
        href="#"
        onClick={onGetPrevPage}
      >
        &larr; Previous
      </a>
      <a
        className="page-link next-page"
        href="#"
        onClick={onGetNextPage}
      >
        Next &rarr;
      </a>
    </div>
  );
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
