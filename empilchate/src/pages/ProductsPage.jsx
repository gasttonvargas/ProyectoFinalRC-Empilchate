import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import '../assets/ProductsPage.css';

const generateRandomId = () => Math.random().toString(36).substr(2, 9);
const generateRandomPrice = () => Number((Math.random() * (40000) + 10000).toFixed(2));

const categories = [
  { name: 'Buzos', image: 'https://via.placeholder.com/300x400?text=Buzo' },
  { name: 'Remerones', image: 'https://via.placeholder.com/300x400?text=Remeron' },
  { name: 'Remeras y Boxy', image: 'https://via.placeholder.com/300x400?text=Remera+Boxy' },
  { name: 'Crop', image: 'https://via.placeholder.com/300x400?text=Crop' },
  { name: 'Camisas', image: 'https://via.placeholder.com/300x400?text=Camisa' },
  { name: 'Camperas', image: 'https://via.placeholder.com/300x400?text=Campera' },
  { name: 'Pantalones', image: 'https://via.placeholder.com/300x400?text=Pantalon' },
];

const generateProducts = (category, count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: generateRandomId(),
    name: `${category.name} ${index + 1}`,
    category: category.name.toLowerCase(),
    image: category.image,
    price: generateRandomPrice(),
  }));
};

const ProductsPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [favorites, setFavorites] = useState([]);

  const allProducts = useMemo(() => {
    return categories.flatMap(category => generateProducts(category, 10));
  }, []);

  const categoryProducts = useMemo(() => {
    return categoryName
      ? allProducts.filter(product => product.category === categoryName.toLowerCase())
      : allProducts;
  }, [categoryName, allProducts]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} añadido al carrito`);
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate('/cart');
  };

  const handleUpdateQuantity = (productId, change) => {
    const product = cart.find(item => item.id === productId);
    if (product) {
      const newQuantity = product.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(productId, newQuantity);
      } else {
        removeFromCart(productId);
      }
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.includes(productId)
        ? prevFavorites.filter(id => id !== productId)
        : [...prevFavorites, productId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <Container className="products-container">
      <h1 className="my-4 text-center">{categoryName ? `${categoryName}` : 'Todos los Productos'}</h1>
      <Row>
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product) => (
            <Col key={product.id} md={3} className="mb-4">
              <Card className="product-card h-100">
                <div className="product-image-container">
                  <Card.Img variant="top" src={product.image} alt={product.name} />
                  <Button 
                    className={`favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <FaHeart />
                  </Button>
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="product-price">${Number(product.price).toFixed(2)}</Card.Text>
                  <div className="mt-auto">
                    <Button 
                      variant="outline-primary" 
                      className="w-100 mb-2" 
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaShoppingCart className="me-2" />
                      Añadir al carrito
                    </Button>
                    <Button 
                      variant="primary" 
                      className="w-100"
                      onClick={() => handleBuyNow(product)}
                    >
                      Comprar ahora
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No hay productos disponibles en esta categoría.</p>
        )}
      </Row>
    </Container>
  );
};

export default ProductsPage;