import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { search } from "../actions.js";


const Searcher = () => {
  const searchText = useSelector((state) => state.searchText);
  const [savedSearchText, setSavedSearchText] = useState(searchText);
  const history = useHistory();

  const onSearch = (textToSearch) => {
    search(textToSearch, history);
  }

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

export default Searcher;
