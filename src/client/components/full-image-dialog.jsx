import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionTypes from "../actionTypes.js";

const FullImageDialog = () => {
  const href = useSelector((state) => state.fullImage);

  const dispatch = useDispatch();

  if(!href) return null;

  const onCloseDialog = () => {
    dispatch({
      type: ActionTypes.REMOVE_FULL_IMAGE
    });
  }

  return (
    <div>
      <div class="full-screen-dialog-backdrop" />
      <div class="full-screen-dialog">
        <div class="dialog-header">
          <div
            class="close-button"
            onClick={onCloseDialog}
          >
            Close
          </div>
        </div>
        <div class="dialog-body">
          <div class="full-image-container">
            <img className="full-image" src={href} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullImageDialog;
