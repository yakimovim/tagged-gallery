import React from "react";
import PropTypes from "prop-types";
import { connect } from "preact-redux";
import {
  findFirstPageWithUntaggedImage,
  getRandomThumbnails
} from "../actions.js";

export class Header extends React.Component {
  handleFindUntagged() {
    this.props.onFindFirstPageWithUntaggedImage();
  }

  handleFindRandom() {
    this.props.onFindRandomImages();
  }

  render() {
    return (
      <header className="flex">
        <a className="brand" href="/">
          Tagged Gallery
        </a>
        <a
          className="header-link"
          id="untaggedButton"
          href="#"
          onClick={this.handleFindUntagged.bind(this)}
        >
          Find untagged
        </a>
        <a
          className="header-link"
          id="randomButton"
          href="#"
          onClick={this.handleFindRandom.bind(this)}
        >
          Random images
        </a>
      </header>
    );
  }
}

Header.propTypes = {
  onFindFirstPageWithUntaggedImage: PropTypes.func.isRequired,
  onFindRandomImages: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onFindFirstPageWithUntaggedImage: function() {
      findFirstPageWithUntaggedImage();
    },
    onFindRandomImages: function() {
      getRandomThumbnails();
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
