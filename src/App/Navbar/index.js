import React from 'react'
import {Link} from 'react-router-dom'
import "./Nav.css"
import {Nav, Navbar, NavItem} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"

function myNavbar() {

    let categories = [
        {
            name: "Animated Movies",
            id: "2"
        }, {
            name: "Biology",
            id: "8"
        }, {
            name: "Random Trivia",
            id: "24"
        }, {
            name: "TV Trivia",
            id: "25"
        }, {
            name: "Who Sings It (2000)",
            id: "35"
        }, {
            name: "Vampire",
            id: "32"
        }
    ];

    let linkStyle = {
        textDecoration: "none"
    }

    return (
        <div className="category-wrapper">
                {/* React Bootstrap Navbar */}
                {/* <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#brand">React-Bootstrap</a>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                        {categories.map((category, i) => {
                    return (
                        <NavItem eventKey={i}>
                            <Link
                                to={`/${category.id}`}
                                key={category.id}
                                className="cat-link"
                                style={linkStyle}>{category.name}</Link>
                        </NavItem>
                    )
                })}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar> */}


            <div className="nav">
                {categories.map((category, i) => {
                    return (
                            <Link
                                to={`/${category.id}`}
                                key={category.id}
                                className="cat-link"
                                style={linkStyle}>{category.name}</Link>
                    )
                })}
            </div>
        </div>
    )
}

export default myNavbar
