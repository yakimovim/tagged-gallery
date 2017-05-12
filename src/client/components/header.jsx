import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

export default class Header extends React.Component {
    render() {
        return <Navbar>
            <Navbar.Header>
                <Navbar.Brand><a href="#">Tagged Gallery</a></Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem id="untaggedButton" href="#">Find untagged</NavItem>
            </Nav>
        </Navbar>
    }
}