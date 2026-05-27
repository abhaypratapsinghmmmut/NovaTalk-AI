import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "novatalk-ai.firebaseapp.com",
  projectId: "novatalk-ai",
  storageBucket: "novatalk-ai.firebasestorage.app",
  messagingSenderId: "938456870883",
  appId: "1:938456870883:web:f0d8689680e8bc4bb13ad6"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export {auth , provider}