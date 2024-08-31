import { db, auth } from '../firebaseConfig';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Obtener todos los usuarios
export const getUsers = async () => {
  const usersCol = collection(db, 'users');
  const userSnapshot = await getDocs(usersCol);
  return userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Añadir un nuevo usuario
export const addUser = async (userData) => {
  try {
    // Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    const user = userCredential.user;

    // Guardar información adicional en Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: userData.email,
      role: userData.role
    });

    return user.uid;
  } catch (error) {
    console.error("Error adding user: ", error);
    throw error;
  }
};

// Actualizar un usuario existente
export const updateUser = async (userId, userData) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, userData);
};

// Eliminar un usuario
export const deleteUser = async (userId) => {
  await deleteDoc(doc(db, 'users', userId));
};

// Obtener el conteo de usuarios en línea
export const getOnlineUsersCount = async () => {
  const usersCol = collection(db, 'users');
  const q = query(usersCol, where("status", "==", "online"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size;
};