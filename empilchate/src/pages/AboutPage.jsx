import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../assets/AboutPage.css'; 

const AboutPage = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Acerca de Nosotros</h2>
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Misión</Card.Title>
              <Card.Text>
                Nuestra misión es ofrecer productos de moda de alta calidad a precios accesibles, 
                brindando una experiencia de compra excepcional a nuestros clientes.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Visión</Card.Title>
              <Card.Text>
                Nuestra visión es ser la tienda de moda preferida, reconocida por nuestra innovación, 
                calidad y compromiso con la satisfacción del cliente.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>¿Quiénes Somos?</Card.Title>
              <Card.Text>
                Somos un equipo apasionado por la moda y el estilo. Desde nuestra fundación, 
                hemos trabajado arduamente para ofrecer a nuestros clientes las últimas tendencias 
                y un servicio al cliente excepcional. Creemos en la importancia de la sostenibilidad 
                y trabajamos con proveedores que comparten nuestros valores.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;