import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Modal } from 'react-bootstrap'
import Thumbnail from './thumbnail.jsx'

export class ThumbnailsView extends React.Component {
    render() {
        return <Row className="modal-container">
            <Modal
                bsSize="small"
                show={this.props.loading}
                container={this}
            >
                <Modal.Body>
                    <div id="loadingImg" />
                </Modal.Body>
            </Modal>
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
        thumbnails: state.thumbnails,
        loading: state.loading
    }
}

export default connect(mapStateToProps)(ThumbnailsView);