import React from 'react';
import { Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/img/logo.png'; 
import qrCode from '../assets/img/qr-code.png';
import '../assets/Footer.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row className="d-flex justify-content-between">
          <Col md={3} className="mb-4 mb-md-0">
            <Image src={logo} alt="Logo" fluid className="mb-2 footer-logo" />
          </Col>

          <Col md={5} className="mb-4 mb-md-0">
            <Row>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="bg-dark text-light border-0">
                    <a href="/about" className="text-light text-decoration-none">Sobre Nosotros</a>
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-light border-0">
                    <a href="/about" className="text-light text-decoration-none">Contacto</a>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="bg-dark text-light border-0">
                    <a href="/error404" className="text-light text-decoration-none">Política de Privacidad</a>
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-light border-0">
                    <a href="/error404" className="text-light text-decoration-none">Términos de Servicio</a>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Col>

          <Col md={4} className="mb-4 mb-md-0">
            <div className="d-flex flex-column align-items-start">
              <div className="mb-3 social-icons">
                <a href="https://www.facebook.com/gastttonvargas/" className="text-light me-3" aria-label="Facebook">
                  <FaFacebook size={24} />
                </a>
                <a href="https://x.com/GasttonV" className="text-light me-3" aria-label="Twitter">
                  <FaTwitter size={24} />
                </a>
                <a href="https://www.instagram.com/gasttonvargas/" className="text-light me-3" aria-label="Instagram">
                  <FaInstagram size={24} />
                </a>
                <a href="https://www.linkedin.com/in/gaston-junior-eduardo-vargas-195491184/?originalSubdomain=fr" className="text-light" aria-label="LinkedIn">
                  <FaLinkedin size={24} />
                </a>
              </div>
              <div className="mb-3">
                <p className="mb-1">Contáctanos: gasttonyt1@gmail.com</p>
                <p className="mb-1">+33 7 59 89 48 82</p>
              </div>
              <div>
                <Image src={qrCode} alt="Código QR" fluid className="footer-qr-code" />
                <p className="mt-2">Datos Fiscales</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;