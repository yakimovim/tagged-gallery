import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid } from 'react-bootstrap'
import Header from './header.jsx'
import Searcher from './searcher.jsx'
import ImageTable from './image-table.jsx'
import FullImageDialog from './full-image-dialog.jsx'
import { getThumbnailsPage } from '../actions.js'

export class Application extends React.Component {
    constructor(props) {
        super(props);
        const searchText = props.match.params.searchText || "";
        const pageIndex = _.toInteger(props.match.params.pageId) || 1;
        this.props.onGetThumbnailsPage(searchText, pageIndex);
    }

    componentWillReceiveProps(nextProps) {
        const searchText = nextProps.match.params.searchText || "";
        const pageIndex = _.toInteger(nextProps.match.params.pageId) || 1;
        this.props.onGetThumbnailsPage(searchText, pageIndex);
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

Application.propTypes = {
    onGetThumbnailsPage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetThumbnailsPage: function (searchText, pageIndex) {
            getThumbnailsPage(searchText, pageIndex, 12);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application)