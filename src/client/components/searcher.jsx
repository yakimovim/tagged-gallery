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
      <div className="flex search-row">
        <div className="search-field">
          <input
            type="text"
            className="search-input"
            value={this.state.searchText}
            onChange={this.handleSearchTextChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          <input
            type="button"
            value="Search"
            className="search-button"
            onClick={this.handleSeachClick.bind(this)}
          />
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
