import React from 'react';
import { Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/img/logo.png'; 
import qrCode from '../assets/img/qr-code.png';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row className="d-flex justify-content-between">
          {/* Columna 1: Logo */}
          <Col md={3} className="mb-4 mb-md-0">
            <Image src={logo} alt="Logo" fluid className="mb-2" />
          </Col>

          {/* Columna 2: Links */}
          <Col md={5} className="mb-4 mb-md-0">
            <Row>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="bg-dark text-light border-0">
                    <a href="/about" className="text-light text-decoration-none">About Us</a>
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-light border-0">
                    <a href="/services" className="text-light text-decoration-none">Services</a>
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-light border-0">
                    <a href="/contact" className="text-light text-decoration-none">Contact</a>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="bg-dark text-light border-0">
                    <a href="/privacy" className="text-light text-decoration-none">Privacy Policy</a>
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-light border-0">
                    <a href="/terms" className="text-light text-decoration-none">Terms of Service</a>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Col>

          {/* Columna 3: Redes Sociales, Info Contacto y QR */}
          <Col md={4} className="mb-4 mb-md-0">
            <div className="d-flex flex-column align-items-start">
              <div className="mb-3">
                <a href="https://facebook.com" className="text-light me-3" aria-label="Facebook">
                  <FaFacebook size={24} />
                </a>
                <a href="https://twitter.com" className="text-light me-3" aria-label="Twitter">
                  <FaTwitter size={24} />
                </a>
                <a href="https://instagram.com" className="text-light me-3" aria-label="Instagram">
                  <FaInstagram size={24} />
                </a>
                <a href="https://linkedin.com" className="text-light" aria-label="LinkedIn">
                  <FaLinkedin size={24} />
                </a>
              </div>
              <div className="mb-3">
                <p className="mb-1">Contact Us: contact@yourdomain.com</p>
                <p className="mb-1">+1 234 567 890</p>
              </div>
              <div>
                <Image src={qrCode} alt="QR Code" fluid />
                <p className="mt-2">Data Fiscal</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
