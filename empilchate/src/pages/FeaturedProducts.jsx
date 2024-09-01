import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/FeaturedProducts.css'; 

const FeaturedProducts = () => {
  const featuredProducts = [
    { id: 1, name: 'Buzo Over H Black', image: 'https://acdn.mitiendanube.com/stores/219/431/products/e0f56058-7924-406e-a163-0771035c4aeb-dfa2d2a591fd90f70017245121649408-640-0.webp' },
    { id: 2, name: 'Jog-Over Premium Suede', image: 'https://acdn.mitiendanube.com/stores/219/431/products/0e6b0788-a53e-4989-a2e4-079306afa5a0-1cd2ebe8504e06c0ba17245127814994-640-0.webp' },
    { id: 3, name: 'Top Paris', image: 'https://acdn.mitiendanube.com/stores/219/431/products/115a2b5a-62ea-445b-980d-9b0e50ffc0ec-9d2d68f63fc0af0a4817245116357771-640-0.webp' },
    { id: 4, name: 'Combo Anteojos + Cubana', image: 'https://mapsound.ar/wp-content/uploads/2023/11/unnamed-5-1.jpg' },
    { id: 5, name: 'Chaleco Puffer', image: 'https://scontent-fra3-1.xx.fbcdn.net/v/t39.30808-6/444946811_18436632598020175_8094829846714750992_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=tH2VGHAnB-kQ7kNvgEe02Ed&_nc_ht=scontent-fra3-1.xx&oh=00_AYD9WYxRbO0L0lsjT6CP3fUE4xinF3vOPJdBMYbKr8kiCw&oe=66DAC9CC' },
    { id: 6, name: 'Conjunto Trap', image: 'https://media.gq.com.mx/photos/609afb292aefa5316639cd93/master/w_1600,c_limit/khea%203.jpg' },
  ];

  const chunkedProducts = [];
  for (let i = 0; i < featuredProducts.length; i += 3) {
    chunkedProducts.push(featuredProducts.slice(i, i + 3));
  }

  return (
    <Container fluid className="featured-products-container p-0">
      <h2 className="text-center mb-4 featured-title">Productos Destacados de la Semana</h2>
      <Carousel interval={5000} className="featured-carousel" controls={true} indicators={true}>
        {chunkedProducts.map((group, index) => (
          <Carousel.Item key={index}>
            <Row className="justify-content-center">
              {group.map((product) => (
                <Col key={product.id} xs={12} sm={6} md={4} className="text-center mb-4">
                  <div className="product-card">
                    <div className="image-container">
                      <img
                        className="vertical-image"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <h5>{product.name}</h5>
                  </div>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="text-center mt-4">
        <Link to="/categories" className="all-categories-link">
          Todas las categorías
        </Link>
      </div>
    </Container>
  );
};

export default FeaturedProducts;