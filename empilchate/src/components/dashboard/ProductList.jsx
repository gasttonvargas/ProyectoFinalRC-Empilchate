import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>${product.price}</td>
            <td>
              <Button variant="info" size="sm" onClick={() => onEdit(product)}>
                <FaEdit /> Editar
              </Button>{' '}
              <Button variant="danger" size="sm" onClick={() => onDelete(product.id)}>
                <FaTrash /> Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductList;