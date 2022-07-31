import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNextPage, getPrevPage } from "../actions.js";


const Paginator = () => {

  const randomMode = useSelector((state) => state.randomMode);

  const navigate = useNavigate();

  if(randomMode) return null;

  const goNext = () => {
    getNextPage(navigate);
  }

  const goPrev = () => {
    getPrevPage(navigate);
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
