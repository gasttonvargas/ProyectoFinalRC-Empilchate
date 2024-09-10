import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';
import '../assets/Error404.css'; 

const Error404 = () => {
  return (
    <Container className="py-5 text-center">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="error-container">
            <FaExclamationTriangle className="error-icon" />
            <h1 className="display-1">404</h1>
            <h2 className="mb-4">Página No Encontrada</h2>
            <p className="mb-4">
              Lo sentimos, la página que buscas no existe. Puede que haya sido movida o eliminada.
            </p>
            <Button variant="primary" href="/" className="mt-3">Regresar al Inicio</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Error404;
