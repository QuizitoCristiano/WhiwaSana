import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebaseconfig/firebaseconfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const firestore = getFirestore();
  const provider = new GoogleAuthProvider();

  // Estados principais
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("newUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    const fetchUserData = async (authUser) => {
      if (!authUser?.uid) return null;

      try {
        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("id", "==", authUser.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          return {
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data(),
          };
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
      return null;
    };

    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        console.log("Usuário autenticado:", authUser.uid);
        const userData = await fetchUserData(authUser);
        if (userData) {
          setUser(userData);
          localStorage.setItem("newUser", JSON.stringify(userData));
          localStorage.setItem("isLoggedIn", "true");
          setIsLoggedIn(true);
        }
      } else {
        console.log("Nenhum usuário autenticado.");
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("newUser");
        localStorage.removeItem("isLoggedIn");
      }
    });

    return () => unsubscribe();
  }, []);

  const [loading, setLoading] = useState(false); // <- Adicione isso

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        localStorage.setItem("newUser", JSON.stringify(userData));
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        return { success: true };
      } else {
        return {
          success: false,
          error: { message: "Usuário não encontrado no sistema." },
        };
      }
    } catch (error) {
      console.error("Erro de login:", error.message, error.code);
      return { success: false, error };
    }
  };

  const logout = async () => {
    await auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("newUser");
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        logInWithEmailAndPassword,
        logout,
        setLoading,
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// willsonvrigiliojose@gmail.com
// Willson@21

// lizaniatharciso18@gmail.com
// liZania23#

// liZani3@
