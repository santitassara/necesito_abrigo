import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import classes from "../Header/Header.module.scss"
import SearchBar from "../SearchBar/SearchBar";


export default function Header(){
  

  return(
    <>
    <Navbar sticky="top" className={classes["headerContainer"]} expand="lg">
      <Container fluid>
        <Navbar.Brand  className={classes["navLink"]} href="/"><img style={{height:"4em"}} src="./JacketIcon.png" alt='Jacket'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 "
            style={{ maxHeight: '100px' }}
            navbarScroll
            
          >
          </Nav>
          <SearchBar/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

