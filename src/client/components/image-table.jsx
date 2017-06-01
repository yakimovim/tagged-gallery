import React from 'react'
import { Row } from 'react-bootstrap'
import Paginator from './paginator.jsx'
import ThumbnailsView from './thumbnails-view.jsx'
import Instruments from './instruments.jsx'

export default class ImageTable extends React.Component {
    render() {
        return <Row>
            <Instruments />
            <Paginator />
            <ThumbnailsView />
            <Paginator />
        </Row>
    }
}