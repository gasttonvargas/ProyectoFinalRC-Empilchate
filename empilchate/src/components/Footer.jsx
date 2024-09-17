import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/img/logo.png'; 
import qrCode from '../assets/img/qr-code.png';
import '../assets/Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-5">
      <Container>
        <Row className="justify-content-between">
          <Col xs={12} md={3} className="text-center text-md-start mb-4 mb-md-0">
            <Image src={logo} alt="Logo" fluid className="footer-logo mb-3" />
          </Col>

          <Col md={5} className="d-none d-md-block">
            <Row>
              <Col md={6}>
                <ul className="footer-links list-unstyled">
                  <li><a href="/about" className="text-light">Sobre Nosotros</a></li>
                  <li><a href="/about" className="text-light">Contacto</a></li>
                </ul>
              </Col>
              <Col md={6}>
                <ul className="footer-links list-unstyled">
                  <li><a href="/error404" className="text-light">Política de Privacidad</a></li>
                  <li><a href="/error404" className="text-light">Términos de Servicio</a></li>
                </ul>
              </Col>
            </Row>
          </Col>

          <Col xs={12} md={4} className="text-center text-md-end">
            <div className="social-icons mb-3">
              <a href="https://www.facebook.com/gastttonvargas/" className="social-icon facebook" aria-label="Facebook">
                <FaFacebook size={24} />
              </a>
              <a href="https://x.com/GasttonV" className="social-icon twitter" aria-label="Twitter">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.instagram.com/gasttonvargas/" className="social-icon instagram" aria-label="Instagram">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.linkedin.com/in/gaston-junior-eduardo-vargas-195491184/?originalSubdomain=fr" className="social-icon linkedin" aria-label="LinkedIn">
                <FaLinkedin size={24} />
              </a>
              <div className="contact-info mb-3 mt-5">
              <p className="mb-1">Contáctanos: gasttonyt1@gmail.com</p>
              <p className="mb-1">+33 7 59 89 48 82</p>
            </div>
            </div>
          </Col>
        </Row>
        <hr className="footer-divider" />
        <Row className="mt-4 d-none d-md-flex justify-content-between align-items-start">
          <Col md={4} className="text-md-start">
            {/* Columna izquierda vacía para mantener el espaciado */}
          </Col>
          <Col md={4} className="text-center">
            <p className="mb-0 copyright">&copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
          </Col>
          <Col md={4} className="text-md-end">
            <Image src={qrCode} alt="Código QR" fluid className="footer-qr-code mb-2" />
            <p className="fiscal-data">Datos Fiscales</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;