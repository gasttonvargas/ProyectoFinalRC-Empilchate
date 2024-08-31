import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Obtener todos los productos
export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Añadir un nuevo producto
export const addProduct = async (productData) => {
  await addDoc(collection(db, "products"), productData);
};

// Actualizar un producto existente
export const updateProduct = async (id, productData) => {
  const productRef = doc(db, "products", id);
  await updateDoc(productRef, productData);
};

// Eliminar un producto
export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, "products", id));
};

const productService = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
};

export default productService;