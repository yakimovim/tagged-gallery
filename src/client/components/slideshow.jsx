import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Header from "./header.jsx";
import Searcher from "./searcher.jsx";
import LoadingIndicator from "./loading-indicator.jsx";
import { showSlide } from "../actions.js";

export const SlideShow = ({ slideImage, getSlide }) => {
  const timerRef = useRef(null);

  const disableTimer = () => {
    if (!!timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const [slidesInterval, setSlidesInterval] = useState(10000);

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!slideImage) {
      getSlide();
    } else {
      disableTimer();

      if (isPaused) {
        return;
      }

      const timerId = setTimeout(() => {
        getSlide();
      }, slidesInterval);

      timerRef.current = timerId;
    }
  });

  const handleTimeoutChange = (event) => {
    disableTimer();

    const newTimeout = parseInt(event.target.value, 10);

    setSlidesInterval(newTimeout);
  };

  const handlePauseClick = () => {
    disableTimer();

    setIsPaused(!isPaused);
  };

  const handleNextClick = () => {
    disableTimer();

    getSlide();
  };

  const pauseButtonText = isPaused ? "Play" : "Pause";

  return (
    <div className="container">
      <Header />
      <Searcher />
      <div className="slideshow-instruments">
        <select
          className="slideshow-interval-selector"
          value={slidesInterval}
          onChange={handleTimeoutChange}
        >
          <option value="10000">10 seconds</option>
          <option value="5000">5 seconds</option>
          <option value="3000">3 seconds</option>
        </select>
        <input
          type="button"
          value={pauseButtonText}
          className="slideshow-button"
          onClick={handlePauseClick}
        />
        <input
          type="button"
          value="Next"
          className="slideshow-button"
          onClick={handleNextClick}
        />
      </div>
      {!slideImage ? (
        <LoadingIndicator loading={true} />
      ) : (
        <div className="imageDiv">
          <img className="full-image" src={slideImage} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    slideImage: state.slideImage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSlide: function () {
      showSlide();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SlideShow);
