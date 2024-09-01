import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-4">
      <Container className="p-4">
        <Row>
          <Col lg={4} md={12} className="mb-4">
            <h5 className="text-uppercase">Logo</h5>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <h5 className="text-uppercase">Enlaces</h5>
            <ul className="list-unstyled">
              <li><a href="#!" className="text-dark">Enlace 1</a></li>
              <li><a href="#!" className="text-dark">Enlace 2</a></li>
              <li><a href="#!" className="text-dark">Enlace 3</a></li>
              <li><a href="#!" className="text-dark">Enlace 4</a></li>
            </ul>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <h5 className="text-uppercase">Redes Sociales</h5>
            <div>
              <a href="#" className="me-2"><FaFacebook /></a>
              <a href="#" className="me-2"><FaTwitter /></a>
              <a href="#" className="me-2"><FaInstagram /></a>
            </div>
            <p>Información de contacto</p>
            <p>QR Data fiscal</p>
          </Col>
        </Row>
        <div className="text-center p-3">
          © 2024 Copyright: Tu Empresa
        </div>
      </Container>
    </footer>
  );
};

export default Footer;