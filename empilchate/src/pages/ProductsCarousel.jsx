import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../assets/ProductsCarousel.css';

const ProductsCarousel = ({ title = 'Productos destacados', count = 10 }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const productsRef = collection(db, 'products');
        const q = query(
          productsRef,
          where("isPublished", "==", true),
          limit(count)
        );
        const productSnapshot = await getDocs(q);
        const productList = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productList);
      } catch (err) {
        console.error("Error fetching products: ", err);
        setError(`Error al cargar los productos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [count]);

  if (loading) return <div className="loading">Cargando productos...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (products.length === 0) return <div className="no-products">No se encontraron productos.</div>;

  const repeatedProducts = [];
  while (repeatedProducts.length < 12) {
    repeatedProducts.push(...products);
  }
  repeatedProducts.length = 12;

  const groupedProducts = [];
  for (let i = 0; i < repeatedProducts.length; i += 4) {
    groupedProducts.push(repeatedProducts.slice(i, i + 4));
  }

  return (
    <div className="products-carousel">
      <h2 className="carousel-title">{title}</h2>
      <Carousel>
        {groupedProducts.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="product-group">
              {group.map((product) => (
                <div key={product.id} className="product-item">
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/250x250?text=Imagen+no+disponible';
                    }}
                  />
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductsCarousel;