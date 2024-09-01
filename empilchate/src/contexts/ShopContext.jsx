import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebaseConfig';
import {
  fetchCart,
  fetchFavorites,
  addToCart as addToCartService,
  removeFromCart as removeFromCartService,
  toggleFavorite as toggleFavoriteService,
} from '../services/shopService';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const fetchedCart = await fetchCart(user.uid);
        setCart(fetchedCart);
        const fetchedFavorites = await fetchFavorites(user.uid);
        setFavorites(fetchedFavorites);
      } else {
        setCart([]);
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const addToCart = async (product) => {
    if (!user) return;
    const updatedCart = await addToCartService(user.uid, product);
    setCart(updatedCart);
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    const updatedCart = await removeFromCartService(user.uid, productId);
    setCart(updatedCart);
  };

  const toggleFavorite = async (product) => {
    if (!user) return;
    const updatedFavorites = await toggleFavoriteService(user.uid, product);
    setFavorites(updatedFavorites);
  };

  return (
    <ShopContext.Provider value={{
      cart,
      favorites,
      addToCart,
      removeFromCart,
      toggleFavorite,
      user
    }}>
      {children}
    </ShopContext.Provider>
  );
};