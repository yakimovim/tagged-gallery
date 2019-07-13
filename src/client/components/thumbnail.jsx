import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TagsInput from "react-tagsinput";
import _ from "lodash";
import { saveTags } from "../data.js";
import { getFullImage } from "../actions.js";

export class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.tags
    };
  }

  handleShowFullImage() {
    this.props.onGetFullImage(this.props.name);
  }

  handleTagsChange(tags) {
    this.props.onSaveTags(this.props.name, tags);
    this.setState({ tags: tags });
  }

  render() {
    return (
      <div className="imageDiv">
        <div className="imgWrapper">
          <img
            className="img-thumbnail"
            src={this.props.preview}
            onClick={this.handleShowFullImage.bind(this)}
          />
        </div>
        <TagsInput
          value={this.state.tags}
          onChange={this.handleTagsChange.bind(this)}
        />
      </div>
    );
  }
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
