import React from 'react';
import '../assets/Advertisement.css'


const Advertisement = () => {
    return (
      <div className="advertisement">
        <div className="advertisement-content">
          <h2>¡Oferta Especial!</h2>
          <p>Descubre nuestras increíbles promociones y descuentos.</p>
          <button className="advertisement-button">¡Compra Ahora!</button>
        </div>
        <img 
          src="/path/to/your/image.jpg" 
          alt="Oferta especial" 
          className="advertisement-image"
        />
      </div>
    );
  };
  
  export default Advertisement;