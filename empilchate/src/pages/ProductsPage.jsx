import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const products = [
  { id: 1, name: 'Camiseta Deportiva', category: 'camisetas', image: 'url_to_tshirt_image' },
  { id: 2, name: 'Pantalón de Running', category: 'pantalones', image: 'url_to_pants_image' },
  { id: 3, name: 'Zapatillas de Entrenamiento', category: 'zapatillas', image: 'url_to_shoes_image' },
  // Agrega más productos aquí
];

const ProductsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

  const filteredProducts = category
    ? products.filter(product => product.category === category)
    : products;

  return (
    <Container>
      <h1 className="my-4">Productos {category && `- ${category}`}</h1>
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductsPage;