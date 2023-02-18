import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import classes from "../Header/Header.module.scss"
import SearchBar from "../SearchBar/SearchBar";


export default function Header(){
  

  return(
    <>
    <Navbar className={classes["headerContainer"]} expand="lg">
      <Container fluid>
        <Navbar.Brand  className={classes["navLink"]} href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 "
            style={{ maxHeight: '100px' }}
            navbarScroll
            
          >
            <Nav.Link href="#action1" className={classes["navLink"]}>Home</Nav.Link>
            <Nav.Link href="#action2" className={classes["navLink"]}>Link</Nav.Link>
            {/* <NavDropdown title="Link"  id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <SearchBar/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

