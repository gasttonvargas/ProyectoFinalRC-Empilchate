import React from 'react';
import ProductsCarousel from './ProductsCarousel';
import CategoriesCarousel from './CategoriesCarousel'; 
import '../assets/HomePage.css'

const HomePage = () => {
  return (
    <div>
      <ProductsCarousel title="Lo más vendido de la semana" count={5} orderField="price" />
      
      <CategoriesCarousel /> 
    </div>
  );
};

export default HomePage;
