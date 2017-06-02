import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { findFirstPageWithUntaggedImage, getRandomThumbnails } from '../actions.js'

export class Header extends React.Component {
    handleFindUntagged() {
        this.props.onFindFirstPageWithUntaggedImage();
    }

    handleFindRandom() {
        this.props.onFindRandomImages();
    }

    render() {
        return <Navbar>
            <Navbar.Header>
                <Navbar.Brand><a href="#">Tagged Gallery</a></Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem id="untaggedButton" href="#" onClick={this.handleFindUntagged.bind(this)}>Find untagged</NavItem>
                <NavItem id="randomButton" href="#" onClick={this.handleFindRandom.bind(this)}>Random images</NavItem>
            </Nav>
        </Navbar>
    }
}

Header.propTypes = {
    onFindFirstPageWithUntaggedImage: PropTypes.func.isRequired,
    onFindRandomImages: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFindFirstPageWithUntaggedImage: function () {
            findFirstPageWithUntaggedImage();
        },
        onFindRandomImages: function() {
            getRandomThumbnails();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)