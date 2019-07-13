import React from "react";
import PropTypes from "prop-types";
import Thumbnail from "./thumbnail.jsx";

export default class ThumbnailsList extends React.PureComponent {
  render() {
    return (
      <div className="flex flex-wrap">
        {this.props.thumbnails.map(thumbnail => {
          return (
            <Thumbnail
              key={thumbnail.name}
              name={thumbnail.name}
              preview={thumbnail.preview}
              tags={thumbnail.tags}
            />
          );
        })}
      </div>
    );
  }
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
