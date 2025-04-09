
// Imports para o firebase.
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// SDKs do firebase.
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const app = initializeApp(firebaseConfig);

// Inicializando firestore.
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth};