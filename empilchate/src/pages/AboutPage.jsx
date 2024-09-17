import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import '../assets/AboutPage.css';
import logo from '../assets/img/logo.png'
import creatorPhoto from '../assets/img/creator-photo.jpg';

const AboutPage = () => {
  return (
    <Container className="about-us-container my-5">
      <Row className="justify-content-center">
        <Col lg={8} md={10}>
          <h1 className="text-center mb-5">Sobre Nosotros</h1>
          <Image 
            src={logo}  
            fluid 
            rounded 
            className="about-us-logo mb-4 d-block mx-auto"
            alt="Nuestra historia"
          />
          <p className="lead text-center mb-4">
            De Argentina a Francia: Una historia de pasión por la moda y calidad
          </p>
          <p>
            En EMPILCHATE, nuestra historia comienza en el vibrante corazón de Argentina, donde la pasión por la moda y el deseo de ofrecer ropa de calidad se unieron para dar vida a nuestra marca. Desde el principio, nuestro objetivo ha sido crear prendas que no solo sean elegantes, sino que también reflejen la autenticidad y el estilo de vida de nuestros clientes.
          </p>
          <p>
            A medida que crecimos, nos dimos cuenta de que para llevar nuestra visión al siguiente nivel, era esencial buscar nuevas oportunidades y experiencias. Fue entonces cuando tomamos la valiente decisión de mudarnos a Francia, un país conocido por su rica herencia en moda y diseño. Este cambio nos permitió sumergirnos en un entorno donde la creatividad y la calidad son primordiales.
          </p>
          <p>
            En Francia, trabajamos codo a codo con artesanos y diseñadores locales, aprendiendo sobre técnicas de confección de alta calidad y tendencias de moda que han perdurado a lo largo del tiempo. Esta experiencia no solo nos ayudó a mejorar la calidad de nuestras prendas, sino que también nos inspiró a incorporar elementos de diseño europeos en nuestras colecciones.
          </p>
          <p>
            Hoy, en EMPILCHATE, nos enorgullece ofrecer una amplia gama de ropa que combina la esencia de Argentina con la sofisticación de Francia. Cada prenda que creamos está diseñada con atención al detalle y un compromiso inquebrantable con la calidad. Creemos que la moda debe ser accesible y que cada persona merece sentirse bien con lo que lleva puesto.
          </p>
          <p className="mb-0">
            Te invitamos a explorar nuestras colecciones y descubrir cómo nuestra historia se refleja en cada prenda. Gracias por ser parte de nuestra aventura en el mundo de la moda.
          </p>
          <Row className="justify-content-center text-center">
            <Col md={6}>
              <h2 className="mb-4">Creador</h2>
              <Image 
                src={creatorPhoto} 
                fluid 
                roundedCircle 
                className="creator-photo mb-3"
                alt="Creador"
              />
              <p>Gastón Vargas</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;