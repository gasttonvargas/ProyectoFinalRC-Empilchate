import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaStar, FaQuestionCircle, FaUser } from 'react-icons/fa';
import logo from "../assets/img/logo.png";
import '../assets/NavbarR.css'; 

const NavbarComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="navbar-custom">
      <div className="container">
        {/* Logo */}
        <Navbar.Brand href="#">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Navbar.Brand>

        {/* Toggle Button for Mobile View */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Collapse */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Search Form */}
          <Form className="d-flex mx-auto">
            <FormControl
              type="search"
              placeholder="Buscar"
              className="search-input"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form>

          {/* Nav Links */}
          <Nav className="me-auto d-flex align-items-center">
            <Nav.Link href="#" className="nav-icon">
              <FaShoppingCart />
              <Badge bg="danger" className="ms-2">
                7
              </Badge>
            </Nav.Link>
            <Nav.Link href="#" className="nav-icon">
              <FaStar />
              <Badge bg="danger" className="ms-2">
                4
              </Badge>
            </Nav.Link>
            <Nav.Link href="#" className="nav-link">Home</Nav.Link>
            <Nav.Link href="#" className="nav-link">Destacado</Nav.Link>
            <Nav.Link href="#" className="nav-link">Contacto</Nav.Link>
          </Nav>

          {/* Help Icon and User Icon */}
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link href="#" className="nav-icon">
              <FaQuestionCircle />
            </Nav.Link>
            <Nav.Link href="#" className="nav-icon">
              <FaUser />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;