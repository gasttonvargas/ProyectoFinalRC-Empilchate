import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Guardar información adicional del usuario en Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: "user" // Por defecto, los nuevos usuarios son "user"
    });

    return user;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};

export const getUserRole = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.data()?.role || 'user';
  } catch (error) {
    console.error("Error al obtener el rol del usuario:", error);
    throw error;
  }
};