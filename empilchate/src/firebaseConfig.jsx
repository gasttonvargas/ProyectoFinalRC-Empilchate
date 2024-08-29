import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBXlBzzSTq9HlFsBCCj0jEIl61qOawJwd4",
  authDomain: "empilchate-ecommerce.firebaseapp.com",
  projectId: "empilchate-ecommerce",
  storageBucket: "empilchate-ecommerce.appspot.com",
  messagingSenderId: "512495634141",
  appId: "1:512495634141:web:0061147177201fb9087d34",
  measurementId: "G-90BL5ZVFBV"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene las instancias de Auth y Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

export { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';

export {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';