import { memo } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import styles from "./navBar.module.css";

const activeLinkClassName = ({isActive}) =>{
  const classes = [styles.navLink];
  if(isActive){
    classes.push(styles.active);
  }
 return classes.join(' ');
};

function NavBar() {
  return (
    <Navbar bg="light" expand="sm">
      <Container fluid>
        <NavLink to="/" className={activeLinkClassName}>
          Todo
        </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            <NavLink to="/about"  className={activeLinkClassName}>About</NavLink>
            <NavLink to="/Contact"  className={activeLinkClassName}>contact us</NavLink>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default memo(NavBar);