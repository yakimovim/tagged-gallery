import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Pager, Row } from 'react-bootstrap'
import { getNextPage, getPrevPage } from '../actions.js'

export class Paginator extends React.Component {
    render() {
        if(this.props.randomMode) {
            return null;
        }

        return <Row>
            <Pager>
                <Pager.Item previous href="#" onClick={this.props.onGetPrevPage.bind(this)}>&larr; Previous</Pager.Item>
                <Pager.Item next href="#" onClick={this.props.onGetNextPage.bind(this)}>Next &rarr;</Pager.Item>
            </Pager>
        </Row>
    }
}

Paginator.propTypes = {
    randomMode: PropTypes.bool.isRequired,
    onGetNextPage: PropTypes.func.isRequired,
    onGetPrevPage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        randomMode: state.randomMode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetNextPage: function () {
            getNextPage();
        },
        onGetPrevPage: function () {
            getPrevPage();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginator)