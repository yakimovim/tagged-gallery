import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  findFirstPageWithUntaggedImage,
  getRandomThumbnails
} from "../actions.js";

export const Header = ({onFindFirstPageWithUntaggedImage, onFindRandomImages}) => {
  return (
    <header className="flex">
      <a className="brand" href="/">
        Tagged Gallery
      </a>
      <a
        className="header-link"
        id="untaggedButton"
        href="#"
        onClick={onFindFirstPageWithUntaggedImage}
      >
        Find untagged
      </a>
      <a
        className="header-link"
        id="randomButton"
        href="#"
        onClick={onFindRandomImages}
      >
        Random images
      </a>
    </header>
  );
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
