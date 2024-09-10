import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Image, Spinner, Toast, ToastContainer } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import '../../assets/ProductsAdmin.css'
const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ name: '', price: '', image: '', category: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        isPublished: doc.data().isPublished || false
      }));
      setProducts(productList);
      setFilteredProducts(productList);
    } catch (error) {
      showToastMessage("Error al cargar los productos");
    }
  };

  const handlePublishToggle = async (product) => {
    try {
      const productRef = doc(db, "products", product.id);
      await updateDoc(productRef, { isPublished: !product.isPublished });
      showToastMessage(`Producto ${product.isPublished ? 'despublicado' : 'publicado'} con éxito`);
      fetchProducts();
    } catch (error) {
      showToastMessage("Error al cambiar el estado de publicación del producto");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const productToSave = { ...currentProduct, isPublished: false };
      if (isEditing) {
        const productRef = doc(db, "products", currentProduct.id);
        await updateDoc(productRef, productToSave);
        showToastMessage("Producto actualizado con éxito");
      } else {
        await addDoc(collection(db, "products"), productToSave);
        showToastMessage("Producto agregado con éxito");
      }
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      showToastMessage("Error al guardar el producto");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        await deleteDoc(doc(db, "products", productId));
        fetchProducts();
        showToastMessage("Producto eliminado con éxito");
      } catch (error) {
        showToastMessage("Error al eliminar el producto");
      }
    }
  };

  const handleShowModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setIsEditing(true);
    } else {
      setCurrentProduct({ name: '', price: '', image: '', category: '' });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProduct({ name: '', price: '', image: '', category: '' });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleCategoryFilterChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);
    if (selected === 'Todas') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selected));
    }
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  return (
    <div className="products-management">
      <h1>Gestión de Productos</h1>
      <div className="mb-3">
        <Button variant="primary" onClick={() => handleShowModal()}>
          <FaPlus /> Agregar Producto
        </Button>
        <Form.Select className="mt-3" value={selectedCategory} onChange={handleCategoryFilterChange}>
          <option value="Todas">Todas las Categorías</option>
          <option value="Buzos">Buzos</option>
          <option value="Remerones">Remerones</option>
          <option value="Remeras y Boxy">Remeras y Boxy</option>
          <option value="Crop">Crop</option>
          <option value="Camisas">Camisas</option>
          <option value="Camperas">Camperas</option>
          <option value="Pantalones">Pantalones</option>
        </Form.Select>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover className="products-table">
          <thead>
            <tr>
              <th className="d-none d-md-table-cell">ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th className="d-none d-md-table-cell">Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="d-none d-md-table-cell">{product.id}</td>
                <td>
                  <Image src={product.image} alt={product.name} thumbnail style={{ maxWidth: '100px' }} />
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td className="d-none d-md-table-cell">{product.isPublished ? 'Publicado' : 'No publicado'}</td>
                <td>
                  <Button variant="info" size="sm" onClick={() => handleShowModal(product)}>
                    <FaEdit /> Editar
                  </Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                    <FaTrash /> Eliminar
                  </Button>{' '}
                  <Button
                    variant={product.isPublished ? "warning" : "success"}
                    size="sm"
                    onClick={() => handlePublishToggle(product)}
                  >
                    {product.isPublished ? <><FaEyeSlash /> Despublicar</> : <><FaEye /> Publicar</>}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Producto' : 'Agregar Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={currentProduct.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={currentProduct.image}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={currentProduct.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar Categoría</option>
                <option value="Buzos">Buzos</option>
                <option value="Remerones">Remerones</option>
                <option value="Remeras y Boxy">Remeras y Boxy</option>
                <option value="Crop">Crop</option>
                <option value="Camisas">Camisas</option>
                <option value="Camperas">Camperas</option>
                <option value="Pantalones">Pantalones</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  <span className="visually-hidden">Cargando...</span>
                </>
              ) : isEditing ? 'Actualizar' : 'Agregar'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Products;
