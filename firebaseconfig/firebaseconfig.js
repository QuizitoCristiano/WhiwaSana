
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDR6pvj4ubW0Z743rCizkeEUhKKHue5n7w",
  authDomain: "whiwasana.firebaseapp.com",
  databaseURL: "https://whiwasana-default-rtdb.firebaseio.com",
  projectId: "whiwasana",
  storageBucket: "whiwasana.firebasestorage.app",
  messagingSenderId: "946140755894",
  appId: "1:946140755894:web:cafe5d1ac5ecbadcbef317",
  measurementId: "G-8FN1JDJSF5"
};


// Inicializa o app
const app = initializeApp(firebaseConfig);

// Serviços do Firebase
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Exportações
export { db, auth, analytics };



