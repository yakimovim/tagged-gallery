import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TagsInput from "react-tagsinput";
import { saveTags } from "../data.js";
import { getFullImage } from "../actions.js";

export const Thumbnail = ({name, tags, preview, onGetFullImage, onSaveTags}) => {
  const [savedTags, setSavedTags] =  useState(tags);

  const handleImageClick = () => {
    onGetFullImage(name);
  }

  const handleTagsChange = (newTags) => {
    onSaveTags(name, newTags);
    setSavedTags(newTags);
  }

  return (
    <div className="imageDiv">
      <div className="imgWrapper">
        <img
          className="img-thumbnail"
          src={preview}
          onClick={handleImageClick}
        />
      </div>
      <TagsInput
        value={savedTags}
        onChange={handleTagsChange}
      />
    </div>
  );
}

Thumbnail.propTypes = {
  name: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onGetFullImage: PropTypes.func.isRequired,
  onSaveTags: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onGetFullImage: function(name) {
      getFullImage(name);
    },
    onSaveTags: function(name, tags) {
      saveTags(name, tags.join(","));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Thumbnail);
