import React from 'react'
import { FormGroup, InputGroup, FormControl, Button, Row } from 'react-bootstrap'

class Searcher extends React.Component {
    render() {
        return <Row>
            <FormGroup>
                <InputGroup>
                    <FormControl type="text" />
                    <InputGroup.Button>
                        <Button>Search</Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        </Row>
    }
}

export default Searcher;