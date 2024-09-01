import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Link } from 'react-router-dom';

const RecuperarPass = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Se ha enviado un correo para restablecer tu contraseña');
      setError('');
    } catch (error) {
      setError('Error al enviar el correo: ' + error.message);
      setMessage('');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Recuperar Contraseña</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Enviar correo de recuperación
        </Button>
      </Form>
      <div className="mt-3">
        <Link to="/">Volver al inicio</Link>
      </div>
    </Container>
  );
};

export default RecuperarPass;