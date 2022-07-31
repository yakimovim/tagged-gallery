import React from "react";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import {
  findFirstPageWithUntaggedImage,
  getRandomThumbnails
} from "../actions.js";

const Header = () => {

  const navigate = useNavigate();

  const onFindFirstPageWithUntaggedImage = () => {
    findFirstPageWithUntaggedImage(navigate);
  }

  const onFindRandomImages = () => {
    getRandomThumbnails(navigate);
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