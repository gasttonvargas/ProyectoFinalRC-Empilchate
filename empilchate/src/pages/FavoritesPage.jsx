import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import '../assets/FavoritesPage.css'

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, change) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 1) + change, 1)
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart({ ...product, quantity });
  };

  const calculateTotal = () => {
    return favorites.reduce((total, product) => {
      const price = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
      return total + (price * (quantities[product.id] || 1));
    }, 0);
  };

  const handleCheckout = () => {
    favorites.forEach(product => handleAddToCart(product));
    navigate('/cart');
  };

  const formatPrice = (price) => {
    const numPrice = typeof price === 'number' ? price : parseFloat(price) || 0;
    return numPrice.toFixed(2);
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Mis Favoritos</h1>
      {favorites.length === 0 ? (
        <p>No tienes productos favoritos.</p>
      ) : (
        <>
          {favorites.map(product => (
            <Card key={product.id} className="mb-3">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={2}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', maxWidth: '100px' }} />
                  </Col>
                  <Col md={3}>
                    <h5>{product.name}</h5>
                    <p className="text-muted">Prenda: {product.category}</p>
                  </Col>
                  <Col md={2}>
                    <p className="mb-0">Precio: ${formatPrice(product.price)}</p>
                  </Col>
                  <Col md={3}>
                    <div className="d-flex align-items-center">
                      <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(product.id, -1)}>
                        <FaMinus />
                      </Button>
                      <Form.Control
                        type="number"
                        min="1"
                        value={quantities[product.id] || 1}
                        onChange={(e) => setQuantities({ ...quantities, [product.id]: parseInt(e.target.value) || 1 })}
                        className="mx-2 text-center"
                        style={{ width: '60px' }}
                      />
                      <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(product.id, 1)}>
                        <FaPlus />
                      </Button>
                    </div>
                  </Col>
                  <Col md={2} className="text-end">
                    <p className="mb-2">Subtotal: ${formatPrice((quantities[product.id] || 1) * (parseFloat(product.price) || 0))}</p>
                    <Button variant="danger" size="sm" onClick={() => toggleFavorite(product)}>
                      <FaTrash /> Quitar
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
          <Card className="mt-4">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={8}>
                  <h4>Total: ${formatPrice(calculateTotal())}</h4>
                </Col>
                <Col md={4} className="text-end">
                  <Button variant="primary" onClick={handleCheckout}>
                    Realizar Compra
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default FavoritesPage;