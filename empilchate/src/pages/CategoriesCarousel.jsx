import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { categories } from './CategoriesPage';


const CategoriesCarousel = () => {
  const groupedCategories = [];
  for (let i = 0; i < categories.length; i += 4) {
    groupedCategories.push(categories.slice(i, i + 4));
  }

  return (
    <div className="categories-carousel">
      <h2 className="text-center mb-4">Todas las Categorías</h2>
      <Carousel 
        controls={false}
        indicators={false}
        interval={3000}
        pause={false}
        wrap={true}
      >
        {groupedCategories.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-around">
              {group.map((category) => (
                <div key={category.id} style={{ width: '23%' }}>
                  <Link to={`/category/${category.name.toLowerCase()}`}>
                    <img
                      className="d-block w-100"
                      src={category.image}
                      alt={category.name}
                      style={{ objectFit: 'cover', height: '200px' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/200x200?text=Imagen+no+disponible';
                      }}
                    />
                    <p className="text-center mt-2">{category.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CategoriesCarousel;