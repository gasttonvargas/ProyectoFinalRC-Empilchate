import { db } from '../firebase'; // Asegúrate de que esta ruta sea correcta
import { collection, query, where, getDocs } from 'firebase/firestore';

export const getCartItemCount = async (userId) => {
  try {
    const cartRef = collection(db, 'carts');
    const q = query(cartRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    let count = 0;
    querySnapshot.forEach((doc) => {
      count += doc.data().quantity || 0;
    });
    return count;
  } catch (error) {
    console.error("Error al obtener el conteo del carrito:", error);
    return 0;
  }
};

export const getFavoritesCount = async (userId) => {
  try {
    const favoritesRef = collection(db, 'favorites');
    const q = query(favoritesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error("Error al obtener el conteo de favoritos:", error);
    return 0;
  }
};