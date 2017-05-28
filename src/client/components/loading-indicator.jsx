import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'

export default class LoadingIndicator extends React.Component {
    render() {
        return <Modal
            bsSize="small"
            show={this.props.loading}
            container={this.props.container}
        >
            <Modal.Body>
                <div id="loadingImg" />
            </Modal.Body>
        </Modal>
    }
}

LoadingIndicator.propTypes = {
    loading: PropTypes.bool.isRequired,
    container: PropTypes.object.isRequired
}