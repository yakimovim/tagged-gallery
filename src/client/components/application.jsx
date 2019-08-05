import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'preact-redux'
import Header from './header.jsx'
import Searcher from './searcher.jsx'
import ImageTable from './image-table.jsx'
import FullImageDialog from './full-image-dialog.jsx'
import { getThumbnailsPage } from '../actions.js'
import toInteger from '../utils.js'

export class Application extends React.Component {
    constructor(props) {
        super(props);
        const searchText = props.match.params.searchText || "";
        const pageIndex = toInteger(props.match.params.pageId) || 1;
        const randomMode = props.match.params.pageId === "random";
        this.props.onGetThumbnailsPage(searchText, pageIndex, randomMode);
    }

    componentWillReceiveProps(nextProps) {
        const searchText = nextProps.match.params.searchText || "";
        const pageIndex = toInteger(nextProps.match.params.pageId) || 1;
        const randomMode = nextProps.match.params.pageId === "random";
        this.props.onGetThumbnailsPage(searchText, pageIndex, randomMode);
    }

    render() {
        return <div className="container">
            <FullImageDialog />
            <Header />
            <Searcher />
            <ImageTable />
        </div>
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
        onGetThumbnailsPage: function (searchText, pageIndex, randomMode) {
            getThumbnailsPage(searchText, pageIndex, 12, randomMode);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application)