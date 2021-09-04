import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeSorting } from "../actions.js";

export class Instruments extends React.Component {
  handleSortingChange(event) {
    this.props.onSortChanged(event.target.value);
  }

  render() {
    if (this.props.randomMode) {
      return null;
    }

    const options = this.props.hasSearchText
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
          value={this.props.sortBy}
          onChange={this.handleSortingChange.bind(this)}
        >
          {options}
        </select>
      </div>
    );
  }
}

Instruments.propTypes = {
  randomMode: PropTypes.bool.isRequired,
  hasSearchText: PropTypes.bool.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChanged: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    randomMode: state.randomMode,
    hasSearchText: !!state.searchText,
    sortBy: state.sortBy
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSortChanged: function(sortBy) {
      changeSorting(sortBy);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Instruments);
