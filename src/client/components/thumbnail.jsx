import React, { useState } from "react";
import PropTypes from "prop-types";
import TagsInput from "react-tagsinput";
import { saveTags } from "../data.js";
import { getFullImage } from "../actions.js";

export const Thumbnail = ({name, tags, preview}) => {
  const [savedTags, setSavedTags] =  useState(tags);

  const handleImageClick = () => {
    getFullImage(name);
  }

  const handleTagsChange = (newTags) => {
    saveTags(name, newTags.join(","));
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
};

export default Thumbnail;
