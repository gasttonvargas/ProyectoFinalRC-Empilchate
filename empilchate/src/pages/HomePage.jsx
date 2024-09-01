import React from 'react';
import FeaturedProducts from '../pages/FeaturedProducts';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="text-center">Bienvenido a nuestra tienda</h1>
      {/* Aquí puedes añadir un banner o algún otro contenido de bienvenida */}
      <FeaturedProducts />
      {/* Puedes añadir más secciones a tu página de inicio aquí */}
    </div>
  );
};

export default HomePage;