import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Tagged Gallery
        </a>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a
              className="nav-link"
              id="untaggedButton"
              href="#"
              onClick={this.handleFindUntagged.bind(this)}
            >
              Find untagged
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="randomButton"
              href="#"
              onClick={this.handleFindRandom.bind(this)}
            >
              Random images
            </a>
          </li>
        </ul>
      </div>
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
