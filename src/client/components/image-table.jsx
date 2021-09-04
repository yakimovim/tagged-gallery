import React from 'react'
import Paginator from './paginator.jsx'
import ThumbnailsView from './thumbnails-view.jsx'
import Instruments from './instruments.jsx'

const ImageTable = () => {
    return (<div className="flex-column">
        <Instruments />
        <Paginator />
        <ThumbnailsView />
        <Paginator />
    </div>);
}

export default ImageTable;