import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { findFirstPageWithUntaggedImage } from '../actions.js'

export default class Header extends React.Component {
    handleFindUntagged() {
        findFirstPageWithUntaggedImage();
    }

    render() {
        return <Navbar>
            <Navbar.Header>
                <Navbar.Brand><a href="#">Tagged Gallery</a></Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem id="untaggedButton" href="#" onClick={this.handleFindUntagged.bind(this)}>Find untagged</NavItem>
            </Nav>
        </Navbar>
    }
}