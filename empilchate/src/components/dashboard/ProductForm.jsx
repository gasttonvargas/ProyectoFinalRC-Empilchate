import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const ProductForm = ({ onSubmit, initialData }) => {
  const [product, setProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    if (initialData) {
      setProduct(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
    setProduct({ name: '', price: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nombre del Producto</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {initialData ? 'Actualizar' : 'Agregar'} Producto
      </Button>
    </Form>
  );
};

export default ProductForm;