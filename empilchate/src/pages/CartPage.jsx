import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handlePurchase = () => {
    // Aquí iría la lógica para procesar el pago
    // Por ahora, solo simularemos una compra exitosa
    alert('Compra realizada con éxito');
    clearCart();
  };

  return (
    <Container>
      <h1 className="my-4">Carrito de Compras</h1>
      <Row>
        {cart.length > 0 ? (
          cart.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Cantidad: {product.quantity}</Card.Text>
                  <Card.Text>Precio: ${(product.price * product.quantity).toFixed(2)}</Card.Text>
                  <Button variant="danger" onClick={() => removeFromCart(product.id)}>
                    Eliminar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No hay productos en el carrito.</p>
        )}
      </Row>
      {cart.length > 0 && (
        <>
          <h2 className="my-4">Total: ${totalAmount}</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre en la tarjeta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre completo"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Número de tarjeta</Form.Label>
              <Form.Control
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de expiración</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/AA"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="text"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" onClick={handlePurchase}>
              Realizar Compra
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default CartPage;