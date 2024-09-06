import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { categories } from './CategoriesPage';
import '../assets/CategoriesCarousel.css'


const CategoriesCarousel = () => {
  const groupedCategories = [];
  for (let i = 0; i < categories.length; i += 4) {
    groupedCategories.push(categories.slice(i, i + 4));
  }

  return (
    <div className="categories-carousel">
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
                <div key={category.id} className="category-item" style={{ width: '23%' }}>
                  <Link to={`/category/${category.name.toLowerCase()}`} className="category-link">
                    <div className="image-container">
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
                      <div className="category-overlay">
                        <p className="category-name">{category.name}</p>
                      </div>
                    </div>
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