import React from "react";
import PropTypes from "prop-types";
import Thumbnail from "./thumbnail.jsx";

const ThumbnailsList = ({ thumbnails }) => {
  return (<div className="thumbnails-grid">
    {thumbnails.map(thumbnail => {
      return (
        <Thumbnail
          key={thumbnail.name}
          name={thumbnail.name}
          preview={thumbnail.preview}
          tags={thumbnail.tags}
        />
      );
    })}
  </div>);
}

ThumbnailsList.propTypes = {
  thumbnails: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      preview: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
  ).isRequired
};

export default ThumbnailsList;