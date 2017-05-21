import _ from 'lodash'
import React from 'react'
import { Grid } from 'react-bootstrap'
import Header from './header.jsx'
import Searcher from './searcher.jsx'
import ImageTable from './image-table.jsx'
import FullImageDialog from './full-image-dialog.jsx'
import { getThumbnailsPage } from '../actions.js'

export default class Application extends React.Component {
    constructor(props) {
        super(props);
        const searchText = props.match.params.searchText || "";
        const pageIndex = _.toInteger(props.match.params.pageId) || 1;
        getThumbnailsPage(searchText, pageIndex, 12);
    }

    componentWillReceiveProps(nextProps) {
        const searchText = nextProps.match.params.searchText || "";
        const pageIndex = _.toInteger(nextProps.match.params.pageId) || 1;
        getThumbnailsPage(searchText, pageIndex, 12);
    }

    render() {
        return <Grid>
            <FullImageDialog />
            <Header />
            <Searcher />
            <ImageTable />
        </Grid>
    }
}