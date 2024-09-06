import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <Container className="my-4">
      <h2 className="mb-4">Resultados de la búsqueda</h2>
      {results.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {results.map((product) => (
            <Col key={product.id}>
              <Card className="h-100">
                <Card.Img 
                  variant="top" 
                  src={product.imageUrl || 'https://via.placeholder.com/150'} 
                  alt={product.name}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text className="text-muted">${product.price}</Card.Text>
                  <div className="mt-auto">
                    <Button 
                      variant="primary" 
                      as={Link} 
                      to={`/product/${product.id}`}
                      className="w-100 mb-2"
                    >
                      Ver detalles
                    </Button>
                    <Button 
                      variant="outline-success" 
                      className="w-100"
                    >
                      <FaShoppingCart className="me-2" />
                      Añadir al carrito
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SearchResults;
