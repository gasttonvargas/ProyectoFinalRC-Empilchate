import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Overlay, Tooltip } from 'react-bootstrap';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import '../assets/ProductsPage.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const [animatingProduct, setAnimatingProduct] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipTarget, setTooltipTarget] = useState(null);
  const [showFavoriteTooltip, setShowFavoriteTooltip] = useState(false);
  const [favoriteTooltipTarget, setFavoriteTooltipTarget] = useState(null);

  const handleAddToCart = (product, event) => {
    addToCart(product);
    setAnimatingProduct(product.id);
    setTooltipTarget(event.currentTarget);
    setShowTooltip(true);
    
    setTimeout(() => {
      setAnimatingProduct(null);
      setShowTooltip(false);
    }, 1500);
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate('/cart');
  };

  const handleToggleFavorite = (product, event) => {
    toggleFavorite(product);
    setFavoriteTooltipTarget(event.currentTarget);
    setShowFavoriteTooltip(true);

    setTimeout(() => {
      setShowFavoriteTooltip(false);
    }, 1500);
  };

  return (
    <Container className="products-container">
      <h1 className="my-4 text-center">Resultados de Búsqueda</h1>
      <Row>
        {results.length > 0 ? (
          results.map((product) => (
            <Col key={product.id} md={3} className="mb-4">
              <Card className="product-card h-100">
                <div className="product-image-container">
                  <Card.Img variant="top" src={product.image} alt={product.name} />
                  <Button 
                    className={`favorite-btn ${favorites.some(fav => fav.id === product.id) ? 'active' : ''}`}
                    onClick={(e) => handleToggleFavorite(product, e)}
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
                      className="w-100 mb-2 position-relative"
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      <FaShoppingCart className={`me-2 ${animatingProduct === product.id ? 'slide-right' : ''}`} />
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
          <p>No se encontraron resultados para tu búsqueda.</p>
        )}
      </Row>
      <Overlay target={tooltipTarget} show={showTooltip} placement="top">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            Producto añadido al carrito
          </Tooltip>
        )}
      </Overlay>
      <Overlay target={favoriteTooltipTarget} show={showFavoriteTooltip} placement="top">
        {(props) => (
          <Tooltip id="favorite-tooltip" {...props}>
            Añadido a favoritos
          </Tooltip>
        )}
      </Overlay>
    </Container>
  );
};

export default SearchResults;