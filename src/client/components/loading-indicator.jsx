import React from "react";
import PropTypes from "prop-types";

export default class LoadingIndicator extends React.Component {
  render() {
    if (!this.props.loading) {
      return null;
    }

    return (<div class="loading-indicator">
      <div id="loadingImg" />
    </div>);
    // return (
    //   <div className="modal d-flex" tabIndex="-1" role="dialog">
    //     <div className="modal-dialog modal-sm" role="document">
    //       <div className="modal-content">
    //         <div className="modal-body">
    //           <div id="loadingImg" />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

LoadingIndicator.propTypes = {
  loading: PropTypes.bool.isRequired
};
