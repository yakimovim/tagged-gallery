import React from 'react'
import { FormGroup, InputGroup, FormControl, Button, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { search } from '../actions.js'

class Searcher extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchText: props.searchText };
    }

    handleSearchTextChange(evnt) {
        this.setState({ searchText: evnt.target.value });
    }

    handleSeachClick() {
        search(this.state.searchText);
    }

    render() {
        return <Row>
            <FormGroup>
                <InputGroup>
                    <FormControl type="text" value={this.state.searchText} onChange={this.handleSearchTextChange.bind(this)} />
                    <InputGroup.Button>
                        <Button onClick={this.handleSeachClick.bind(this)}>Search</Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        </Row>
    }
}

const mapStateToProps = (state) => {
  return {
    searchText: state.searchText
  }
}

export default connect(mapStateToProps)(Searcher);