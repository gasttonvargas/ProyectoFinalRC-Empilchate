import React from 'react';
import ProductsCarousel from './ProductsCarousel';
import CategoriesCarousel from './CategoriesCarousel';
import Advertisement from '../components/Advertisement';
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/HomePage.css';
import video from '../assets/img/videoinicio.mp4'

const HomePage = () => {
  return (
    <>
      <div className="video-container">
        <video autoPlay muted loop className="w-100">
          <source src={video} type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
        <div className="video-overlay">
          <div className="overlay-text">
            <h1 className="text-white text-center">BIENVENIDO A LA PÁGINA CON MEJOR ROPA DE TODO EL MUNDO</h1>
          </div>
        </div>
      </div>

      <Container fluid className="home-page">
        <Row className="mb-5">
          <Col>
            <ProductsCarousel 
              title="Lo más vendido de la semana" 
              count={5} 
              orderField="price" 
            />
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <Advertisement />
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">Nuestras Categorías</h2>
            <CategoriesCarousel />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;