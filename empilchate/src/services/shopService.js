import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const fetchCart = async (userId) => {
  const cartDoc = await getDoc(doc(db, 'carts', userId));
  return cartDoc.exists() ? cartDoc.data().items || [] : [];
};

export const fetchFavorites = async (userId) => {
  const favoritesDoc = await getDoc(doc(db, 'favorites', userId));
  return favoritesDoc.exists() ? favoritesDoc.data().items || [] : [];
};

export const addToCart = async (userId, product) => {
  const cartDocRef = doc(db, 'carts', userId);
  const cartDoc = await getDoc(cartDocRef);
  let updatedCart = [];
  if (cartDoc.exists()) {
    updatedCart = cartDoc.data().items || [];
    const existingItem = updatedCart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }
  } else {
    updatedCart.push({ ...product, quantity: 1 });
    await setDoc(cartDocRef, { items: updatedCart });
  }
  await updateDoc(cartDocRef, { items: updatedCart });
  return updatedCart;
};

export const removeFromCart = async (userId, productId) => {
  const cartDocRef = doc(db, 'carts', userId);
  const cartDoc = await getDoc(cartDocRef);
  if (cartDoc.exists()) {
    const updatedCart = cartDoc.data().items.filter(item => item.id !== productId);
    await updateDoc(cartDocRef, { items: updatedCart });
    return updatedCart;
  }
  return [];
};

export const toggleFavorite = async (userId, product) => {
  const favoritesDocRef = doc(db, 'favorites', userId);
  const favoritesDoc = await getDoc(favoritesDocRef);
  let updatedFavorites = [];
  if (favoritesDoc.exists()) {
    const isFavorite = favoritesDoc.data().items.some(item => item.id === product.id);
    if (isFavorite) {
      updatedFavorites = favoritesDoc.data().items.filter(item => item.id !== product.id);
      await updateDoc(favoritesDocRef, { items: updatedFavorites });
    } else {
      updatedFavorites = [...favoritesDoc.data().items, product];
      await updateDoc(favoritesDocRef, { items: arrayUnion(product) });
    }
  } else {
    updatedFavorites.push(product);
    await setDoc(favoritesDocRef, { items: updatedFavorites });
  }
  return updatedFavorites;
};