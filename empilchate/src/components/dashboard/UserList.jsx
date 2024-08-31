import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <Button variant="info" size="sm" onClick={() => onEdit(user)}>
                <FaEdit /> Editar
              </Button>{' '}
              <Button variant="danger" size="sm" onClick={() => onDelete(user.id)}>
                <FaTrash /> Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserList;