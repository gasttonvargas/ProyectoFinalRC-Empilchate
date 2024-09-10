import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const searchProducts = async (searchTerm) => {
  const productsRef = collection(db, 'products');
  const results = [];

  // Convertir el término de búsqueda a minúsculas para una comparación insensible a mayúsculas/minúsculas
  const lowercaseSearchTerm = searchTerm.toLowerCase();

  // Realizar una única consulta para obtener todos los productos
  const snapshot = await getDocs(productsRef);

  snapshot.forEach(doc => {
    const product = { id: doc.id, ...doc.data() };
    
    // Comprobar si el término de búsqueda está en el nombre, categoría o descripción
    if ((product.name?.toLowerCase()?.includes(lowercaseSearchTerm)) ||
        (product.category?.toLowerCase()?.includes(lowercaseSearchTerm)) ||
        (product.description?.toLowerCase()?.includes(lowercaseSearchTerm))) {
      results.push(product);
    }
  });

  return results;
};