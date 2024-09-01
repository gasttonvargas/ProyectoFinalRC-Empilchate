import React, { useState } from 'react';
import { Button, Collapse, Container, Row, Col } from 'react-bootstrap';

const Categories = () => {
  const [open, setOpen] = useState(false);

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="category-collapse"
            aria-expanded={open}
            className="mb-2"
          >
            Categorías
          </Button>
          <Collapse in={open}>
            <div id="category-collapse">
              <Button variant="outline-primary" className="me-2">Camisetas</Button>
              <Button variant="outline-primary" className="me-2">Pantalones</Button>
              <Button variant="outline-primary" className="me-2">Zapatillas</Button>
              <Button variant="outline-primary" className="me-2">Accesorios</Button>
            </div>
          </Collapse>
        </Col>
      </Row>
    </Container>
  );
};

export default Categories;