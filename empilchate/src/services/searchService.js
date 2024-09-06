import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const searchProducts = async (searchTerm) => {
  if (searchTerm.trim() === '') return [];

  try {
    const productsRef = collection(db, 'products');
    const q = query(
      productsRef,
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error en la búsqueda de productos:", error);
    return [];
  }
};