import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { search } from "../actions.js";

export const Searcher = ({searchText, onSearch}) => {
  const [savedSearchText, setSavedSearchText] = useState(searchText);

  const handleSearchTextChange = (event) => {
    setSavedSearchText(event.target.value);
  }

  const handleSearchClick = () => {
    onSearch(savedSearchText);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch(savedSearchText);
    }
  }

  return (
    <div className="flex search-row">
      <div className="search-field">
        <input
          type="text"
          className="search-input"
          value={savedSearchText}
          onChange={handleSearchTextChange}
          onKeyPress={handleKeyPress}
        />
        <input
          type="button"
          value="Search"
          className="search-button"
          onClick={handleSearchClick}
        />
      </div>
    </div>
  );
}

Searcher.propTypes = {
  searchText: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    searchText: state.searchText
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearch: function(searchText) {
      search(searchText);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Searcher);
