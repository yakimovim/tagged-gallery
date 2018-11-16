import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeSorting } from "../actions.js";

export class Instruments extends React.Component {
  handleSortingChange(evnt) {
    this.props.onSortChanged(evnt.target.value);
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
      <div className="container">
        <div className="row">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                Sort by
              </span>
            </div>
            <select
              className="form-control"
              value={this.props.sortBy}
              onChange={this.handleSortingChange.bind(this)}
            >
              {options}
            </select>
          </div>
        </div>
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
