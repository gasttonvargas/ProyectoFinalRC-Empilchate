import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, ListGroup } from 'react-bootstrap';
import { FaMinus, FaPlus, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { createPreference } from '../services/mercadopago'; 
import '../assets/CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [address, setAddress] = useState('');

  const subtotal = cart.reduce((total, item) => total + (parseFloat(item.price) || 0) * item.quantity, 0);
  const discount = 3.99; 
  const shippingFee = 4.99;
  const total = subtotal - discount + shippingFee;

  const handleQuantityChange = (product, change) => {
    const newQuantity = product.quantity + change;
    if (newQuantity > 0) {
      updateQuantity(product.id, newQuantity);
    } else {
      removeFromCart(product.id);
    }
  };

  const handlePayment = async () => {
    try {
      const items = cart.map(item => ({
        title: item.name,
        unit_price: parseFloat(item.price),
        quantity: item.quantity,
      }));

      const preference = await createPreference(items);
      window.location.href = preference.init_point; 
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Hubo un error al procesar el pago. Por favor, intenta de nuevo.");
    }
  };

  const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    return isNaN(numPrice) ? 'Precio no disponible' : `$${numPrice.toFixed(2)}`;
  };

  return (
    <Container className="py-5">
      <h1 className="my-4">Carrito de Compras</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Tu carrito</h4>
            </Card.Header>
            <ListGroup variant="flush">
              {cart.map((product) => (
                <ListGroup.Item key={product.id} className="d-flex align-items-center">
                  <img src={product.image} alt={product.name} style={{ width: '80px', marginRight: '10px' }} />
                  <div className="flex-grow-1">
                    <h6 className="mb-0">{product.name}</h6>
                    <span className="text-muted">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(product, -1)}>
                      <FaMinus />
                    </Button>
                    <span className="mx-2">{product.quantity}</span>
                    <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(product, 1)}>
                      <FaPlus />
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>

          <Card className="mb-4">
            <Card.Header className="bg-secondary text-white">
              <h5 className="mb-0">Métodos de Pago</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Check
                  type="radio"
                  label={<><FaCreditCard /> Tarjeta de Crédito/Débito</>}
                  name="paymentMethod"
                  id="card"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label={<><FaMoneyBillWave /> Efectivo</>}
                  name="paymentMethod"
                  id="cash"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </Form>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header className="bg-info text-white">
              <h5 className="mb-0">Dirección de Envío</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu dirección"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="checkout-card">
            <Card.Header className="bg-success text-white">
              <h4 className="mb-0">Resumen de compra</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Descuento:</span>
                  <span>{formatPrice(discount)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Envío:</span>
                  <span>{formatPrice(shippingFee)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
            <Card.Footer>
              <Button 
                variant="success" 
                className="w-100" 
                onClick={handlePayment}
                disabled={!address || cart.length === 0}
              >
                Realizar Pago
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;