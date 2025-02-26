import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIb3Er5I-WRgZCaan02eW9Sb8F_13Mxsk",
  authDomain: "code-x-001.firebaseapp.com",
  projectId: "code-x-001",
  storageBucket: "code-x-001.firebasestorage.app",
  messagingSenderId: "10769110373",
  appId: "1:10769110373:web:2715fd6fbecc96d9e4fd8c",
  measurementId: "G-HD9H3E0PNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Firebase Auth Functions
export const signUp = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);
export const logIn = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
export const logOut = () => signOut(auth);
