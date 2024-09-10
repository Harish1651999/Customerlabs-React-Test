import React from "react";
import classes from "./Header.module.css";
import { Container, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="info" className="fixed-top">
      <Container fluid>
        <Navbar.Brand href="/">
          <i className="bi bi-chevron-left"></i> View Audience
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
