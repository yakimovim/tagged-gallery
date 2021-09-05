import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Header from './header.jsx'
import LoadingIndicator from './loading-indicator.jsx'
import {
    showSlide
  } from "../actions.js";

export const SlideShow = ({slideImage, getSlide}) => {

    useEffect(() => {
        if(!slideImage)
        {
            getSlide();
        }
        else
        {
            setTimeout(() => {
                getSlide();
            }, 10000);
        }
    });

    return (<div className="container">
        <Header />
        {
            !slideImage
                ? <LoadingIndicator loading={true} />
                : <img className="full-image" src={slideImage} />
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