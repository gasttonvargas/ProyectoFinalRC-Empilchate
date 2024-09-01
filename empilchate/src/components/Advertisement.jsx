import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Advertisement = () => {
  return (
    <Container fluid className="my-4">
      <Row>
        <Col>
          <div className="advertisement" style={{ width: '100%', height: '200px', backgroundColor: '#f8f9fa', textAlign: 'center', lineHeight: '200px' }}>
            Publicidad
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Advertisement;