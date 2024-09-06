import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import publicidad from '../assets/img/publicidad.jpg';

const Advertisement = () => {
  return (
    <Container fluid className="my-4">
      <Row>
        <Col>
          <div className="advertisement" style={{
            width: '100%',
            height: 'auto',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <img 
              src={publicidad} 
              alt="Publicidad"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Advertisement;