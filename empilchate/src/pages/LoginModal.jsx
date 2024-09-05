import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import '../assets/LoginModal.css'

const LoginModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleClose();
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="login-modal">
      <Modal.Header closeButton className="login-modal-header">
        <Modal.Title>Iniciar Sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body className="login-modal-body">
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
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 login-button">
            Iniciar Sesión
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer className="login-modal-footer">
        <Link to="/recuperarpassword" className="forgot-password-link">¿Olvidaste tu contraseña?</Link>
      </Modal.Footer>
    </Modal>
  );
};


export default LoginModal;