import React from "react";
import PropTypes from "prop-types";

const LoadingIndicator = ({ loading }) => {
  if(!loading) return null;

  return (<div class="loading-indicator">
      <div id="loadingImg" />
    </div>);
}

export default LoadingIndicator;

LoadingIndicator.propTypes = {
  loading: PropTypes.bool.isRequired
};
