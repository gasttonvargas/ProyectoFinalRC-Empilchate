import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdTokenResult();
    return { user, isAdmin: token.claims.admin === true };
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    throw error;
  }
};