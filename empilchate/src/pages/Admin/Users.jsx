import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DashboardNavbar from '../../components/NavbarAdmin';
import UserList from '../../components/dashboard/UserList';
import UserForm from '../../components/dashboard/UserForm';
import { getUsers, addUser, updateUser, deleteUser, getOnlineUsersCount } from '../../services/Users';
const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    loadUsers();
    // Aquí deberías implementar la lógica para obtener los usuarios en línea
  }, []);

  const loadUsers = async () => {
    const usersData = await getUsers();
    setUsers(usersData);
  };

  const handleAddUser = async (userData) => {
    await addUser(userData);
    loadUsers();
  };

  const handleUpdateUser = async (userData) => {
    await updateUser(userData.id, userData);
    loadUsers();
    setEditingUser(null);
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  return (
    <>
      <DashboardNavbar onlineUsers={onlineUsers} />
      <Container>
        <Row className="mt-4">
          <Col md={4}>
            <h2>{editingUser ? 'Editar' : 'Agregar'} Usuario</h2>
            <UserForm
              onSubmit={editingUser ? handleUpdateUser : handleAddUser}
              initialData={editingUser}
            />
          </Col>
          <Col md={8}>
            <h2>Lista de Usuarios</h2>
            <UserList
              users={users}
              onEdit={setEditingUser}
              onDelete={handleDeleteUser}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Users;