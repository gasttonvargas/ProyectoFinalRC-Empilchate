import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/CategoriesPage.css';

const categories = [
  { id: 1, name: 'buzos', image: 'https://acdn.mitiendanube.com/stores/219/431/products/64323adc-66fc-412a-917d-94fc8e6e37bb-8a9086e60d7d0800ff17245119644733-640-0.webp' },
  { id: 2, name: 'remerones', image: 'https://acdn.mitiendanube.com/stores/219/431/products/1f5be5a8-6138-4ea9-9073-e10cf2407ebd-f083b20b7cd1a8689917245109140324-640-0.webp' },
  { id: 3, name: 'remeras y boxy', image: 'https://acdn.mitiendanube.com/stores/219/431/products/79243494-f2db-45c0-b5df-fcde95abfa9d-274c0fd9e552aa26a417245112910819-640-0.webp' },
  { id: 4, name: 'crop', image: 'https://acdn.mitiendanube.com/stores/219/431/products/fb829339-665b-494d-ac98-2bc8e5d9b2ae-ec9b102a863165311317245114072677-640-0.webp' },
  { id: 5, name: 'camisas', image: 'https://acdn.mitiendanube.com/stores/219/431/products/49a93186-747d-4f5e-8f13-cb1f9c0ea2d5-469bac26b6b067f88017245096063367-640-0.webp' },
  { id: 6, name: 'camperas', image: 'https://acdn.mitiendanube.com/stores/219/431/products/b8b809c8-7df1-4f1d-985f-daa679c9916f-a650e7d2105b55f4d317248791467145-640-0.webp' },
  { id: 7, name: 'pantalones', image: 'https://acdn.mitiendanube.com/stores/219/431/products/2fac4c69-cc82-4e00-ad3c-913fec636d69-c3a903762fc7c10f1a17245126076917-640-0.webp' },
];

const CategoriesPage = () => {
  return (
    <Container>
      <h1 className="my-4 categories-title">Categorías</h1>
      <Row>
        {categories.map((category) => (
          <Col key={category.id} md={3} className="mb-4">
            <Card 
              as={Link} 
              to={`/category/${category.name.toLowerCase()}`}
              className="category-card"
            >
              <Card.Img variant="top" src={category.image} alt={category.name} />
              <Card.Body>
                <Card.Title className="category-title">{category.name.toUpperCase()}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoriesPage;