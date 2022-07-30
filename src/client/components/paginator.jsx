import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNextPage, getPrevPage } from "../actions.js";


const Paginator = () => {

  const randomMode = useSelector((state) => state.randomMode);

  if(randomMode) return null;

  const history = useHistory();

  const goNext = () => {
    getNextPage(history);
  }

  const goPrev = () => {
    getPrevPage(history);
  }

  return (
    <div className="flex">
      <a
        className="page-link prev-page"
        href="#"
        onClick={goPrev}
      >
        &larr; Previous
      </a>
      <a
        className="page-link next-page"
        href="#"
        onClick={goNext}
      >
        Next &rarr;
      </a>
    </div>
  );
}

export default Paginator;
