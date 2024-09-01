import React, { useState } from 'react';
import { Navbar, Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaSearch } from 'react-icons/fa';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implementar lógica de búsqueda aquí
    console.log("Búsqueda realizada");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <div className="d-flex align-items-center">
          <a href="#" className="me-3"><FaFacebook /></a>
          <a href="#" className="me-3"><FaTwitter /></a>
          <a href="#" className="me-3"><FaInstagram /></a>
          {showSearch ? (
            <form onSubmit={handleSearch}>
              <InputGroup>
                <FormControl
                  placeholder="Buscar..."
                  aria-label="Búsqueda"
                />
                <Button variant="outline-secondary" type="submit">
                  <FaSearch />
                </Button>
              </InputGroup>
            </form>
          ) : (
            <Button variant="outline-secondary" onClick={toggleSearch}>
              <FaSearch />
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;