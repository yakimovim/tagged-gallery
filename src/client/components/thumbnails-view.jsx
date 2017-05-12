import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import Thumbnail from './thumbnail.jsx'

class ThumbnailsView extends React.Component {
    render() {
        return <Row>
            {this.props.thumbnails.map(thumbnail => {
                return (<Thumbnail 
                    key={thumbnail.name} 
                    name={thumbnail.name} 
                    preview={thumbnail.preview} 
                    tags={thumbnail.tags} />)
            })}
        </Row>
    }
}

ThumbnailsView.propTypes = {
    thumbnails: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        preview: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired).isRequired
}

const mapStateToProps = (state) => {
  return {
    thumbnails: state.thumbnails
  }
}

export default connect(mapStateToProps)(ThumbnailsView);