import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, ListGroup } from 'react-bootstrap';
import { FaMinus, FaPlus, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import '../assets/CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [address, setAddress] = useState('');

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = 3.99; // Ejemplo de descuento
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

  const handlePayment = () => {
    alert(`Pago realizado con éxito usando ${paymentMethod === 'credit' ? 'tarjeta de crédito' : 'efectivo'}`);
    clearCart();
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
                    <span className="text-muted">${product.price.toFixed(2)}</span>
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
                  label={<><FaCreditCard /> Tarjeta de Crédito</>}
                  name="paymentMethod"
                  id="credit"
                  value="credit"
                  checked={paymentMethod === 'credit'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {paymentMethod === 'credit' && (
                  <div className="mt-3">
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Número de tarjeta"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Nombre en la tarjeta"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </Form.Group>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            placeholder="MM/AA"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            placeholder="CVV"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                )}
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
                  <span>${subtotal.toFixed(2)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Descuento:</span>
                  <span>${discount.toFixed(2)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Envío:</span>
                  <span>${shippingFee.toFixed(2)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" className="w-100" onClick={handlePayment}>
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