import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Overlay, Tooltip } from 'react-bootstrap';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext'
import { useFavorites } from '../contexts/FavoritesContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../assets/ProductsPage.css';

const ProductsPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const [animatingProduct, setAnimatingProduct] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipTarget, setTooltipTarget] = useState(null);
  const [showFavoriteTooltip, setShowFavoriteTooltip] = useState(false);
  const [favoriteTooltipTarget, setFavoriteTooltipTarget] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let q;
        if (categoryName) {
          const normalizedCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();
          q = query(
            collection(db, "products"),
            where("category", "==", normalizedCategory),
            where("isPublished", "==", true)
          );
        } else {
          q = query(
            collection(db, "products"),
            where("isPublished", "==", true)
          );
        }

        const querySnapshot = await getDocs(q);
        const productList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error al cargar los productos. Por favor, intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

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
      <h1 className="my-4 text-center">{categoryName ? `${categoryName}` : 'Todos los Productos'}</h1>
      {loading && <p>Cargando productos...</p>}
      {error && <p className="text-danger">{error}</p>}
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
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
          !loading && <p>No hay productos disponibles en esta categoría.</p>
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

export default ProductsPage;