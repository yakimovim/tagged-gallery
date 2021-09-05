import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";
import {
  findFirstPageWithUntaggedImage,
  getRandomThumbnails
} from "../actions.js";

export const Header = ({onFindFirstPageWithUntaggedImage, onFindRandomImages}) => {

  const history = useHistory();

  const findRandomImages = () => {
    history.push("/random");
    onFindRandomImages();
  }

  return (
    <header className="flex">
      <Link className="brand" to="/">
        Tagged Gallery
      </Link>
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
        onClick={findRandomImages}
      >
        Random images
      </a>
      <Link className="header-link" to="/slideshow">Show slides</Link>
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
    },
    onShowSlides: function() {
      showSlide();
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
