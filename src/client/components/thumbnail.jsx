import React from 'react'
import PropTypes from 'prop-types'
import { Image, Button } from 'react-bootstrap'
import TagsInput from 'react-tagsinput'
import _ from 'lodash'
import { saveTags } from '../data.js'
import { getFullImage } from '../actions.js'

class Thumbnail extends React.Component {

    constructor(props) {
        super(props);
        let id = 1;
        this.state = {
            tags: this.props.tags
        };
    }

    handleSave() {
        saveTags(this.props.name, this.state.tags.join(','));
    }

    handleShowFullImage() {
        getFullImage(this.props.name);
    }

    handleTagsChange(tags) {
        this.setState({ tags: tags });
    }

    render() {

        return <div className="imageDiv col-md-4 row" >
            <div className="imgWrapper col-md-10 col-md-offset-1">
                <Image className="img-center" src={this.props.preview} thumbnail onClick={this.handleShowFullImage.bind(this)} />
            </div>
            <div className="col-md-10 col-md-offset-1 input-group">
                <TagsInput value={this.state.tags} onChange={this.handleTagsChange.bind(this)} />
                <span className="input-group-btn">
                    <Button className="saveTagsBtn" default onClick={this.handleSave.bind(this)}>Edit</Button>
                </span>
            </div>
        </div>
    }
}

Thumbnail.propTypes = {
    name: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Thumbnail;