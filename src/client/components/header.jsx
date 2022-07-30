import React from "react";
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";
import {
  findFirstPageWithUntaggedImage,
  getRandomThumbnails
} from "../actions.js";

const Header = () => {

  const history = useHistory();

  const onFindFirstPageWithUntaggedImage = () => {
    findFirstPageWithUntaggedImage(history);
  }

  const onFindRandomImages = () => {
    getRandomThumbnails(history);
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
        onClick={onFindRandomImages}
      >
        Random images
      </a>
      <Link className="header-link" to="/slideshow">Show slides</Link>
    </header>
  );
}

export default Header;