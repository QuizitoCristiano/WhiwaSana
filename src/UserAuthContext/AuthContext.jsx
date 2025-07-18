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

  const [open, setOpen] = useState(false);


 // Estados principais
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("newUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // FALTA ISSO AQUI 👇
  const [isAdmin, setIsAdmin] = useState(() => {
    const storedUser = localStorage.getItem("newUser");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      return userData.isAdmin === true;
    }
    return false;
  });


  useEffect(() => {
    const fetchUserData = async (authUser) => {
      if (!authUser?.uid) return null;

      try {
        const userDocRef = doc(db, "users", authUser.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();

          // 👇 Verifica se é admin
          setIsAdmin(userData.isAdmin === true);

          return {
            id: userSnapshot.id,
            ...userData,
          };
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
      return null;
    };

    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userData = await fetchUserData(authUser);
        if (userData) {
          setUser(userData);
          localStorage.setItem("newUser", JSON.stringify(userData));
          localStorage.setItem("isLoggedIn", "true");
          setIsLoggedIn(true);
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
        setIsAdmin(false);
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

        setIsAdmin(userData.isAdmin === true); // 👈 Aqui também
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
    setIsAdmin(false); // 👈 zera admin no logout
    localStorage.removeItem("newUser");
    localStorage.removeItem("isLoggedIn");
  };

  // dentro do AuthContext.jsx (ou onde gerencia a auth)

  const enviarCodigoVerificacao = async (userEmail, userId) => {
    const novoCodigo = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString();

    await setDoc(doc(db, "codigoVerificacao", userId), {
      codigoVerificacao: novoCodigo,
      expiracao: new Date(Date.now() + 15 * 60 * 1000), // 15 minutos de validade
    });

    // Chama sua função que envia o email, que precisa estar implementada
    const result = await enviarCodigoVerificacaoFirebase({
      email: userEmail,
      codigo: novoCodigo,
    });

    return result;
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        await setDoc(userDocRef, {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          createdAt: new Date(),
        });
      }

      const updatedUser = (await getDoc(userDocRef)).data();
      localStorage.setItem("newUser", JSON.stringify(updatedUser));
      localStorage.setItem("isLoggedIn", "true");
      setUser(updatedUser);
      setIsLoggedIn(true);
      return { success: true };
    } catch (error) {
      console.error("Erro no login com Google:", error);
      return { success: false, error };
    }
  };

  // depois exporte junto com outras funções/contexto

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
        enviarCodigoVerificacao,
        loginWithGoogle,
        open, 
        setOpen,
        isAdmin, // 👈 adiciona aqui
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

// Licani3@

// kizitocristiano@gmail.com
// Quizit1@
// Quizit@2

// quizitocritiano@10gmail.com
