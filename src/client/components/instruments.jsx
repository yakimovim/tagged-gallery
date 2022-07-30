import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeSorting } from "../actions.js";

const Instruments = () => {
  const history = useHistory();
  const randomMode = useSelector((state) => state.randomMode);
  const hasSearchText = useSelector((state) => !!state.searchText);
  const sortBy = useSelector((state) => state.sortBy);

  const handleSortingChange = (event) => {
    changeSorting(event.target.value, history);
  }

  if (randomMode) {
    return null;
  }

  const options = hasSearchText
    ? [
        <option key="name" value="name">
          Name ascending
        </option>,
        <option key="-name" value="-name">
          Name descending
        </option>
      ]
    : [
        <option key="name" value="name">
          Name ascending
        </option>,
        <option key="-name" value="-name">
          Name descending
        </option>,
        <option key="created" value="created">
          Created ascending
        </option>,
        <option key="-created" value="-created">
          Created descending
        </option>
      ];

  return (
    <div className="flex">
      <div className="sort-by-text">
        Sort by
      </div>
      <select
        className="sort-by-selector"
        value={sortBy}
        onChange={handleSortingChange}
      >
        {options}
      </select>
    </div>
  );
}

export default Instruments;
