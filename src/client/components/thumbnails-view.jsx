import React from 'react'
import { useSelector } from 'react-redux'
import LoadingIndicator from './loading-indicator.jsx'
import ThumbnailsList from './thumbnails-list.jsx'

export const ThumbnailsView = () => {

    const loading = useSelector((state) => state.loading);
    const thumbnails = useSelector((state) => state.thumbnails);

    return (<div>
            <LoadingIndicator loading={loading} />
            <ThumbnailsList thumbnails={thumbnails} />
        </div>);
}

export default ThumbnailsView;