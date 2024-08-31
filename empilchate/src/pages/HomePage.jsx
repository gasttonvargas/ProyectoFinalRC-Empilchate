import React from 'react';
import { Container, Carousel } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaQuestionCircle, FaBars, FaFire, FaUser, FaSignInAlt, FaUserPlus, FaCog } from 'react-icons/fa';
import ProductGrid from '../components/ProductGrid';
import producto1 from '../assets/img/producto1.jpg';
import producto2 from '../assets/img/producto2.jpg';
import producto3 from '../assets/img/producto3.jpg';
import producto4 from '../assets/img/producto4.jpg';
import '../assets/HomePage.css'

const featuredProducts = [
  { id: 1, name: 'Producto Destacado 1', image: producto1 },
  { id: 2, name: 'Producto Destacado 2', image: producto2 },
  { id: 3, name: 'Producto Destacado 3', image: producto3 },
  { id: 4, name: 'Producto Destacado 4', image: producto4 },
];

const HomePage = () => {
  return (
    <Container>
      <h1 className="my-4">Lo más flama <FaFire /></h1>
      <Carousel>
        {featuredProducts.map((product) => (
          <Carousel.Item key={product.id}>
            <div className="carousel-image-container">
              <img
                className="d-block w-100 carousel-image"
                src={product.image}
                alt={product.name}
              />
            </div>
            <Carousel.Caption>
              <h3>{product.name}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      
      <h2 className="my-4">Todos los Productos</h2>
      <ProductGrid />
    </Container>
      );
};

export default HomePage;