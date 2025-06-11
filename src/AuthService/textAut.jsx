import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebaseconfig/firebaseconfig";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const Provider = new GoogleAuthProvider();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [erros, setErros] = useState("")
  const [formData, setFormData] = useState({
    nomeDoCliente: "",
    email: "",
    telefone: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const initialErrors = {
    nomeDoCliente: "",
    email: "",
    telefone: "",
    password: "",
    confirmPassword: "",
  };

  const resetFields = () => {
    setFormData({
      nomeDoCliente: "",
      email: "",
      telefone: "",
      password: "",
      confirmPassword: "",
    });
    setFormErrors({});
    setEmailError("");
    setPasswordError("");
  };

  const loginWithEmailAndPasswordHandler = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(userCredential.user));
      localStorage.setItem("isLoggedIn", "true");
    } catch (error) {
      setEmailError("Credenciais inválidas");
      console.error("Erro no login:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedLogin = localStorage.getItem("isLoggedIn");

    if (storedUser && storedLogin === "true") {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        resetFields,
        user,
        loginWithEmailAndPasswordHandler,
        logout,
        emailError,
        setEmailError,
        passwordError,
        setPasswordError,
        formData,
        setFormData,
        handleChange,
        formErrors,
        setFormErrors,
        erros,
        setErros 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
