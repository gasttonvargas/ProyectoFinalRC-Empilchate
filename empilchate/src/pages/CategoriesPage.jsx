import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Camisetas', image: 'url_to_tshirt_image' },
  { id: 2, name: 'Pantalones', image: 'url_to_pants_image' },
  { id: 3, name: 'Zapatillas', image: 'url_to_shoes_image' },
  { id: 4, name: 'Accesorios', image: 'url_to_accessories_image' },
];

const CategoriesPage = () => {
  return (
    <Container>
      <h1 className="my-4">Categorías</h1>
      <Row>
        {categories.map((category) => (
          <Col key={category.id} md={3} className="mb-4">
            <Card as={Link} to={`/products?category=${category.name.toLowerCase()}`}>
              <Card.Img variant="top" src={category.image} />
              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoriesPage;