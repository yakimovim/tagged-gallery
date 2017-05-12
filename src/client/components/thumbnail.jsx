import React from 'react'
import PropTypes from 'prop-types'
import { Image, Button } from 'react-bootstrap'
import { saveTags } from '../data.js'

class Thumbnail extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tags: props.tags.join(",") };
    }

    handleSave() {
        saveTags(this.props.name, this.state.tags);
    }

    handleTagsChange(evnt) {
        this.setState({ tags: evnt.target.value });
    }

    render() {
        return <div className="imageDiv col-md-4 row" >
            <div className="imgWrapper col-md-10 col-md-offset-1">
                <Image className="img-center" src={this.props.preview} thumbnail />
            </div>
            <div className="col-md-10 col-md-offset-1 input-group">
                <input className="tagsInput form-control" type="text" value={this.state.tags} onChange={this.handleTagsChange.bind(this)} />
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