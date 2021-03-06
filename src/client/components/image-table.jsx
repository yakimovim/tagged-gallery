import React from 'react'
import Paginator from './paginator.jsx'
import ThumbnailsView from './thumbnails-view.jsx'
import Instruments from './instruments.jsx'

export default class ImageTable extends React.Component {
    render() {
        return <div className="flex-column">
            <Instruments />
            <Paginator />
            <ThumbnailsView />
            <Paginator />
        </div>
    }
}