import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductList from '../../components/dashboard/ProductList';
import ProductForm from '../../components/dashboard/ProductForm';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../services/Products';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const productsData = await getProducts();
    setProducts(productsData);
  };

  const handleAddProduct = async (productData) => {
    await addProduct(productData);
    loadProducts();
  };

  const handleUpdateProduct = async (id, productData) => {
    await updateProduct(id, productData);
    loadProducts();
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col md={4}>
          <h2>{editingProduct ? 'Editar' : 'Agregar'} Producto</h2>
          <ProductForm 
            onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} 
            initialData={editingProduct}
          />
        </Col>
        <Col md={8}>
          <h2>Lista de Productos</h2>
          <ProductList 
            products={products} 
            onEdit={setEditingProduct} 
            onDelete={handleDeleteProduct}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Products; 