import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const UserForm = ({ onSubmit, initialData }) => {
  const [user, setUser] = useState({ email: '', role: 'user' });

  useEffect(() => {
    if (initialData) {
      setUser(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
    setUser({ email: '', role: 'user' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Rol</Form.Label>
        <Form.Select
          name="role"
          value={user.role}
          onChange={handleChange}
          required
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        {initialData ? 'Actualizar' : 'Agregar'} Usuario
      </Button>
    </Form>
  );
};

export default UserForm;