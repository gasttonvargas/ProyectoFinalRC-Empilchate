import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';

// Función para generar un ID aleatorio
const generateRandomId = () => Math.random().toString(36).substr(2, 9);

// Función para generar un precio aleatorio entre 15 y 100
const generateRandomPrice = () => (Math.random() * (85) + 15).toFixed(2);

const categories = [
  { name: 'Buzos', image: 'https://via.placeholder.com/300x400?text=Buzo' },
  { name: 'Remerones', image: 'https://via.placeholder.com/300x400?text=Remeron' },
  { name: 'Remeras y Boxy', image: 'https://via.placeholder.com/300x400?text=Remera+Boxy' },
  { name: 'Crop', image: 'https://via.placeholder.com/300x400?text=Crop' },
  { name: 'Camisas', image: 'https://via.placeholder.com/300x400?text=Camisa' },
  { name: 'Camperas', image: 'https://via.placeholder.com/300x400?text=Campera' },
  { name: 'Pantalones', image: 'https://via.placeholder.com/300x400?text=Pantalon' },
];

// Función para generar productos aleatorios
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
  const { addToCart } = useCart();

  console.log('CategoryName:', categoryName);

  const allProducts = useMemo(() => {
    console.log('Generating all products');
    return categories.flatMap(category => generateProducts(category, 10));
  }, []);

  const categoryProducts = useMemo(() => {
    console.log('Filtering products for category:', categoryName);
    return categoryName
      ? allProducts.filter(product => product.category === categoryName.toLowerCase())
      : allProducts;
  }, [categoryName, allProducts]);

  console.log('Number of products:', categoryProducts.length);

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    addToCart(product);
    alert(`${product.name} añadido al carrito`);
  };

  const handleBuyNow = (product) => {
    console.log('Buying now:', product);
    addToCart(product);
    navigate('/cart');
  };

  return (
    <Container>
      <h1 className="my-4">Productos {categoryName ? `en ${categoryName}` : ''}</h1>
      <Row>
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product) => (
            <Col key={product.id} md={3} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                  <div className="mt-auto">
                    <Button 
                      variant="primary" 
                      className="me-2 mb-2" 
                      onClick={() => handleAddToCart(product)}
                    >
                      Añadir al carrito
                    </Button>
                    <Button 
                      variant="success" 
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