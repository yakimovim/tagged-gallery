import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Header from './header.jsx'
import Searcher from './searcher.jsx';
import LoadingIndicator from './loading-indicator.jsx'
import {
    showSlide
  } from "../actions.js";


export const SlideShow = ({slideImage, getSlide}) => {

    const timerRef = useRef(null);

    useEffect(() => {
        if(!slideImage)
        {
            getSlide();
        }
        else
        {
            if(!!timerRef.current) {
                clearTimeout(timerRef.current);
            }

            const timerId = setTimeout(() => {
                getSlide();
            }, 10000);

            timerRef.current = timerId;
        }
    });

    return (<div className="container slideshowContainer">
        <Header />
        <Searcher />
        {
            !slideImage
                ? <LoadingIndicator loading={true} />
                : (<div className="imageDiv">
                    <img className="full-image" src={slideImage} />
                </div>)
        }
    </div>);
}

const mapStateToProps = (state) => {
    return {
        slideImage: state.slideImage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSlide: function() {
            showSlide();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideShow)