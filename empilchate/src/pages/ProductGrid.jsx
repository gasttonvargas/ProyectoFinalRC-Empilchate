import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaCheck } from 'react-icons/fa';
import '../assets/ProductGrid.css'; 

const ProductGrid = () => {
  const [favorites, setFavorites] = useState({});
  const [cart, setCart] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15; // 

  // Simula una lista de productos (reemplaza esto con tus datos reales)
  const products = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Producto ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 1,
    image: `https://via.placeholder.com/150?text=Producto${i + 1}`
  }));

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const toggleFavorite = (productId) => {
    setFavorites(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  const toggleCart = (productId) => {
    setCart(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  const renderProducts = () => {
    return currentProducts.map(product => (
      <Col key={product.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
        <Card className="h-100">
          <Card.Img variant="top" src={product.image} />
          <Card.Body className="d-flex flex-column">
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>${product.price}</Card.Text>
            <div className="mt-auto">
              <Button 
                variant={favorites[product.id] ? "danger" : "outline-danger"} 
                className="me-2"
                onClick={() => toggleFavorite(product.id)}
              >
                <FaHeart />
              </Button>
              <Button 
                variant={cart[product.id] ? "success" : "primary"}
                onClick={() => toggleCart(product.id)}
              >
                {cart[product.id] ? <FaCheck /> : <FaShoppingCart />}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  const pageCount = Math.ceil(products.length / productsPerPage);

  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= pageCount; number++) {
      items.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
          {number}
        </Pagination.Item>,
      );
    }
    return <Pagination>{items}</Pagination>;
  };

  return (
    <Container className="my-5">
      <Row>{renderProducts()}</Row>
      <div className="d-flex justify-content-center mt-4">
        {renderPagination()}
      </div>
    </Container>
  );
};

export default ProductGrid;