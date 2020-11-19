import React from 'react'
import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import "../style/Navbar.css";


const NavBar = ({changeCategory, search}) => {
    return (
      <Navbar bg="white" variant="light" className="nav__bokstore">
        <Container className="px-4 pt-4">
          <Navbar.Brand href="#home">
            <img
              src="https://static.thriftbooks.com/images/tblogo-green_20200225.svg"
              alt=""
            />
          </Navbar.Brand>
          <div className="ml-auto d-flex align-items-center mr-3 nav__search">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={(e) => search(e)}
            />
            <SearchIcon />
          </div>
          <Nav>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">About</Nav.Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => changeCategory("fantasy")}>
                Fantasy
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeCategory("horror")}>
                Horror
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeCategory("romance")}>
                Romance
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeCategory("scifi")}>
                Scifi
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeCategory("history")}>
                History
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Hi Rita!" id="basic-nav-dropdown">
              <NavDropdown.Item>Your Account</NavDropdown.Item>
              <NavDropdown.Item>Your Orders</NavDropdown.Item>
              <NavDropdown.Item>Your Favorites</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#features">
              <ShoppingBasketIcon />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}

export default NavBar
