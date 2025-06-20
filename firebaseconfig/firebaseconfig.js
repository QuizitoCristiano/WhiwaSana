// firebaseconfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";




const firebaseConfig = {
  apiKey: "AIzaSyAz3WhuZB22TPRjP5hUp2YonLPpS4oipzU",
  authDomain: "pizzaria-7b611.firebaseapp.com",
  databaseURL: "https://pizzaria-7b611-default-rtdb.firebaseio.com",
  projectId: "pizzaria-7b611",
  storageBucket: "pizzaria-7b611.appspot.com",
  messagingSenderId: "691116080485",
  appId: "1:691116080485:web:04986bfa28fde3cae7758c",
  measurementId: "G-1GNS4QK9Y5"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
