
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDpAzSmZ0CVb8GQwjZ9XC-lPYU7AScMFI8",
  authDomain: "reactnext-9071e.firebaseapp.com",
  projectId: "reactnext-9071e",
  storageBucket: "reactnext-9071e.appspot.com",
  messagingSenderId: "392424723645",
  appId: "1:392424723645:web:bb10f45f54fbf3f72ad3d4",
  measurementId: "G-QQ01XLPDFE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);
export default firebaseConfig;