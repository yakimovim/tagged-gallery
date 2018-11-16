import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { search } from "../actions.js";

export class Searcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchText: props.searchText };
  }

  handleSearchTextChange(evnt) {
    this.setState({ searchText: evnt.target.value });
  }

  handleSeachClick() {
    this.props.onSearch(this.state.searchText);
  }

  handleKeyPress(evnt) {
    if (evnt.key === "Enter") {
      evnt.preventDefault();
      this.props.onSearch(this.state.searchText);
    }
  }

  render() {
    return (
      <div className="row justify-content-center my-3">
        <div className="input-group col-8">
          <input
            type="text"
            className="form-control"
            value={this.state.searchText}
            onChange={this.handleSearchTextChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-light"
              onClick={this.handleSeachClick.bind(this)}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
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
