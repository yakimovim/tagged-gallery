import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormGroup, InputGroup, FormControl, Row } from 'react-bootstrap'
import { changeSorting } from '../actions.js'

export class Instruments extends React.Component {
    handleSortingChange(evnt) {
        this.props.onSortChanged(evnt.target.value);
    }

    render() {
        if(this.props.randomMode) {
            return null;
        }

        const options = this.props.hasSearchText 
            ? [
                <option value="name" selected={"name" == this.props.sortBy}>Name ascending</option>,
                <option value="-name" selected={"-name" == this.props.sortBy}>Name descending</option>
            ]
            : [
                <option value="name" selected={"name" == this.props.sortBy}>Name ascending</option>,
                <option value="-name" selected={"-name" == this.props.sortBy}>Name descending</option>,
                <option value="created" selected={"created" == this.props.sortBy}>Created ascending</option>,
                <option value="-created" selected={"-created" == this.props.sortBy}>Created descending</option>
            ];

        return <Row>
            <FormGroup className="col-md-6 col-md-offset-3">
                <InputGroup>
                    <InputGroup.Addon>Sort by</InputGroup.Addon>
                    <FormControl componentClass="select" placeholder="select" onChange={this.handleSortingChange.bind(this)}>
                        {options}
                    </FormControl>
                </InputGroup>
            </FormGroup>
        </Row>
    }
}

Instruments.propTypes = {
    randomMode: PropTypes.bool.isRequired,
    hasSearchText: PropTypes.bool.isRequired,
    sortBy: PropTypes.string.isRequired,
    onSortChanged: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        randomMode: state.randomMode,
        hasSearchText: !!state.searchText,
        sortBy: state.sortBy
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSortChanged: function (sortBy) {
            changeSorting(sortBy);
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Instruments)