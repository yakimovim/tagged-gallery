import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import Thumbnail from './thumbnail.jsx'
import LoadingIndicator from './loading-indicator.jsx'
import ThumbnailsList from './thumbnails-list.jsx'

export class ThumbnailsView extends React.Component {
    render() {
        return <Row className="modal-container">
            <LoadingIndicator loading={this.props.loading} container={this} />
            <ThumbnailsList thumbnails={this.props.thumbnails} />
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
        thumbnails: state.thumbnails,
        loading: state.loading
    }
}

export default connect(mapStateToProps)(ThumbnailsView);