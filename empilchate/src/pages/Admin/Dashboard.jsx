import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavbarAdmin from '../../components/NavbarAdmin';

const Dashboard = () => {
  return (
    <>
      <NavbarAdmin />
      <Container>
        <Row className="mt-4">
          <Col>
            <h1>Bienvenido al Panel de Administración</h1>
            <p>Aquí puedes gestionar productos y usuarios.</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;