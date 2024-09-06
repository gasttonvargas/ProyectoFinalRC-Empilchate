import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState({ firstName: '', lastName: '', email: '', role: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const usersCollection = collection(db, 'users');
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(userList);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (selectedUser) {
      const userRef = doc(db, 'users', selectedUser.id);
      await updateDoc(userRef, editedUser);
      setShowModal(false);
      fetchUsers();
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      fetchUsers();
    }
  };

  return (
    <Container>
      <h2 className="my-4">Gestión de Usuarios</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleEdit(user)}>Editar</Button>
                <Button variant="danger" size="sm" className="ml-2" onClick={() => handleDelete(user.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                value={editedUser.firstName}
                onChange={(e) => setEditedUser({...editedUser, firstName: e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control 
                type="text" 
                value={editedUser.lastName}
                onChange={(e) => setEditedUser({...editedUser, lastName: e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                value={editedUser.email}
                onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rol</Form.Label>
              <Form.Control 
                as="select"
                value={editedUser.role}
                onChange={(e) => setEditedUser({...editedUser, role: e.target.value})}
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
          <Button variant="primary" onClick={handleSave}>Guardar Cambios</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Users;