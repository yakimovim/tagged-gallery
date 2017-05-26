import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, Modal } from 'react-bootstrap'
import ActionTypes from '../actionTypes.js'

export class FullImageDialog extends React.Component {
    handleCloseDialog() {
        this.props.onCloseDialog();
    }

    render() {
        const showDialog = !!this.props.href;

        return (<Modal
            bsSize="large"
            show={showDialog}
            onHide={this.handleCloseDialog.bind(this)}
        >
            <Modal.Header closeButton />
            <Modal.Body>
                <Image className="img-center" responsive src={this.props.href} />
            </Modal.Body>
        </Modal>);
    }
}

FullImageDialog.propTypes = {
    href: PropTypes.string.isRequired,
    onCloseDialog: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        href: state.fullImage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseDialog: function () {
            dispatch({
                type: ActionTypes.REMOVE_FULL_IMAGE
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullImageDialog)