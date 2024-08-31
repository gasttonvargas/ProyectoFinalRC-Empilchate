import React, { useState } from 'react';
import { Row, Col, Card, Button, Pagination } from 'react-bootstrap';

const ProductGrid = ({ products = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(15);

  // Asegúrate de que products es un array antes de usar slice
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Array.isArray(products) 
    ? products.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Row xs={2} md={3} lg={5} className="g-4">
        {currentProducts.map((product) => (
          <Col key={product.id}>
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Button variant="primary">Agregar al carrito</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {Array.isArray(products) && products.length > productsPerPage && (
        <Pagination className="mt-4 justify-content-center">
          {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map((number) => (
            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </>
  );
};

export default ProductGrid;