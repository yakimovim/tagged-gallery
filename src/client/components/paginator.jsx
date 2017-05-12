import React from 'react'
import { getNextPage, getPrevPage } from '../actions.js'
import { Pager, Row } from 'react-bootstrap'

export default class Ppaginator extends React.Component {
    render() {
        return <Row>
            <Pager>
                <Pager.Item previous href="#" onClick={getPrevPage}>&larr; Previous</Pager.Item>
                <Pager.Item next href="#" onClick={getNextPage}>Next &rarr;</Pager.Item>
            </Pager>
        </Row>

    }
}