import React, { useEffect } from 'react'
import Header from './header.jsx'
import Searcher from './searcher.jsx'
import ImageTable from './image-table.jsx'
import FullImageDialog from './full-image-dialog.jsx'
import { getThumbnailsPage } from '../actions.js'
import toInteger from '../utils.js'
import { useParams } from 'react-router-dom'

const Application = () => {

    const onGetThumbnailsPage = (searchText, pageIndex, randomMode) => {
        getThumbnailsPage(searchText, pageIndex, 12, randomMode);
    };

    const params = useParams();

    const searchText = params.searchText || "";
    const pageIndex = toInteger(params.pageId) || 1;
    const randomMode = params.pageId === "random";

    useEffect(() => {
        onGetThumbnailsPage(searchText, pageIndex, randomMode);
    }, [searchText, pageIndex, randomMode]
    );

    return (<div className="container">
        <FullImageDialog />
        <Header />
        <Searcher />
        <ImageTable />
    </div>);

}

export default Application;