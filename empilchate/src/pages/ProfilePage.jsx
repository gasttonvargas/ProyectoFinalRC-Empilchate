import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { auth, db } from '../firebaseConfig';
import { updatePassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import '../assets/ProfilePage.css'; 

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUser({ id: currentUser.uid, ...userDoc.data() });
        }
      }
    };

    fetchUserData();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await updatePassword(auth.currentUser, newPassword);
      setMessage('Contraseña actualizada con éxito');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError('Error al actualizar la contraseña: ' + error.message);
    }
  };

  if (!user) {
    return <div className="loading">Cargando perfil...</div>;
  }

  return (
    <Container className="profile-container mt-5">
      <Row>
        <Col md={6} className="mx-auto">
          <Card className="profile-card">
            <Card.Body>
              <h2 className="text-center mb-4">Perfil del Usuario</h2>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" value={user.firstName + ' ' + user.lastName} readOnly />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control type="email" value={user.email} readOnly />
                </Form.Group>
              </Form>

              <h3 className="mt-4">Cambiar Contraseña</h3>
              <Form onSubmit={handlePasswordChange}>
                <Form.Group className="mb-3">
                  <Form.Label>Nueva Contraseña</Form.Label>
                  <Form.Control 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                  <Form.Control 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Cambiar Contraseña
                </Button>
              </Form>

              {message && <Alert variant="success" className="mt-3">{message}</Alert>}
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;