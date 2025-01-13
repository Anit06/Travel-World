import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDkMr5jLkWSX4cCnHJuEv1vGfF82XAqZg4",
  authDomain: "travel-world-a6b1f.firebaseapp.com",
  projectId: "travel-world-a6b1f",
  storageBucket: "travel-world-a6b1f.appspot.com",
  messagingSenderId: "1092939632919",
  appId: "1:1092939632919:web:88a44a1029283ce952e752"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export {provider};
export const db = getFirestore(app);
export const storage = getStorage(app); // Initialize Storage properly
export default app;



