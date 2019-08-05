import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'preact-redux'
import LoadingIndicator from './loading-indicator.jsx'
import ThumbnailsList from './thumbnails-list.jsx'

export class ThumbnailsView extends React.Component {
    render() {
        return <div>
            <LoadingIndicator loading={this.props.loading} />
            <ThumbnailsList thumbnails={this.props.thumbnails} />
        </div>
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