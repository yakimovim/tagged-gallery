import React from 'react'
import { Grid } from 'react-bootstrap'
import Header from './header.jsx'
import Searcher from './searcher.jsx'
import ImageTable from './image-table.jsx'

export default class Application extends React.Component {
    render() {
        return <Grid>
            <Header />
            <Searcher />
            <ImageTable />
        </Grid>
    }
}