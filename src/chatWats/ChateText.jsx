import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebaseconfig/firebaseconfig";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefone: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // 🔧 Validação de email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 🔧 Validação de telefone
  const isValidTelefone = (telefone) => {
    const numeros = telefone.replace(/\D/g, "");
    return numeros.length === 10 || numeros.length === 11;
  };

  // ✅ Validação do formulário
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.name.trim() || formData.name.trim().split(" ").length < 2) {
      errors.name = "Digite seu nome completo.";
      isValid = false;
    }

    if (!isValidEmail(formData.email)) {
      errors.email = "Digite um e-mail válido.";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Senha é obrigatória.";
      isValid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
        formData.password
      )
    ) {
      errors.password =
        "A senha precisa ter 8+ caracteres, com letra maiúscula, minúscula, número e símbolo.";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem.";
      isValid = false;
    }

    if (!isValidTelefone(formData.telefone)) {
      errors.telefone = "Telefone inválido.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // 🔍 Verifica se o email já existe
  const checkIfEmailExists = async (email) => {
    const auth = getAuth();
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods.length > 0;
  };

  // 🚀 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    const auth = getAuth();
    const firestore = getFirestore();

    try {
      const emailExists = await checkIfEmailExists(formData.email);
      if (emailExists) {
        setFormErrors({ email: "Este e-mail já está em uso." });
        setLoading(false);
        return;
      }

      // Cria usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Atualiza perfil do Firebase Auth
      await updateProfile(user, { displayName: formData.name });

      // Salva no Firestore
      await setDoc(doc(collection(firestore, "users"), user.uid), {
        id: user.uid,
        email: formData.email,
        name: formData.name, // 🔥 Aqui padronizado como 'name'
        telefone: formData.telefone,
        createdAt: new Date(),
      });

      // ✅ Limpa formulário
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        telefone: "",
      });

      alert("Cadastro realizado com sucesso!");
      navigate("/"); // Redireciona para Home
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Atualiza campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome completo"
          value={formData.name}
          onChange={handleChange}
        />
        {formErrors.name && <p>{formErrors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
        />
        {formErrors.email && <p>{formErrors.email}</p>}

        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleChange}
        />
        {formErrors.telefone && <p>{formErrors.telefone}</p>}

        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
        />
        {formErrors.password && <p>{formErrors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar senha"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
