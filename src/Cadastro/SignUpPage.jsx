import React, { useContext, useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Button,
  Modal,
  IconButton,
  TextField,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Person as PersonIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  Visibility,
  VisibilityOff,
  JavascriptSharp,
  Password,
} from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import XIcon from "@mui/icons-material/X";
import { Link, useNavigate } from "react-router-dom";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { Email, Phone } from "@mui/icons-material";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import InputMask from "react-input-mask";
import "../contact/ContactStyles.css";
import { styled } from "@mui/system";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

// willsonvrigiliojose@gmail.com
// willson15#

// Estilização para a tela de carregamento
const ContainerCardLaoder = styled(Stack)(({ theme }) => ({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "10px",
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  height: "100vh",
  width: "100%",
  zIndex: 9000,
  top: 0,
  left: 0,
}));

const Loader = styled(Box)(({ theme }) => ({
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  display: "inline-block",
  borderTop: "4px solid #3cb815",
  borderRight: "4px solid transparent",
  boxSizing: "border-box",
  animation: "rotation 1s linear infinite",
  position: "relative",
}));

const LoaderAfter = styled(Box)(({ theme }) => ({
  content: "''",
  boxSizing: "border-box",
  position: "absolute",
  left: 0,
  top: 0,
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  borderBottom: "4px solid #f75f1d",
  borderLeft: "4px solid transparent",
}));

const globalStyles = `
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  const [myNewloading, setMyNewloading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    confirmPassword: "",
    email: "",
    telefone: "",
  });

  const [formErrors, setFormErrors] = useState({
    fullName: "",
    password: "",
    confirmPassword: "",
    email: "",
    telefone: "",
  });

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
    setFormErrors({ ...formErrors, [fieldName]: "" });
  };

  const displayError = (fieldName, message) => {
    setFormErrors({ ...formErrors, [fieldName]: message });
  };

  const clearErrors = () => {
    setFormErrors({
      fullName: "",
      password: "",
      confirmPassword: "",
      email: "",
      telefone: "",
    });
  };

  // Atualize o telefone
  const handleTelefoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    setFormData({ ...formData, telefone: value });
    setFormErrors({ ...formErrors, telefone: "" });
  };
  

  const validarTelefone = (telefone) => {
  const numeros = telefone.replace(/\D/g, "");
  return numeros.length === 10 || numeros.length === 11;
};


  const validateForm = () => {
    let errors = {};

    let isValid = true;

    if (
      formData.fullName.trim() === "" ||
      formData.fullName.split(" ").length < 2
    ) {
      errors.fullName = "Por favor, digite seu nome completo.";
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Senha é obrigatória";
      isValid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
        formData.password
      )
    ) {
      errors.password =
        "A senha deve ter 8+ caracteres com letra maiúscula, minúscula, número e símbolo";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem.";
      isValid = false;
    }

    if (formData.email.trim() === "" || !isValidEmail(formData.email)) {
      errors.email = "Por favor, digite um e-mail válido.";
      isValid = false;
    }

    if (formData.telefone.trim() === "") {
      errors.telefone = "Por favor, informe o telefone.";
      isValid = false;
    } else if (!validarTelefone(formData.telefone)) {
      errors.telefone = "Por favor, informe um telefone válido.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const checkIfEmailExists = async (email) => {
    const auth = getAuth();
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      return signInMethods.length > 0; // Se houver métodos de login, o e-mail já está em uso.
    } catch (error) {
      console.error("Erro ao verificar e-mail:", error);
      return false;
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
    if (validateForm()) {
      const auth = getAuth();
      const firestore = getFirestore();
      const usersCollection = collection(firestore, "users");

      try {
        setMyNewloading(true);

        // Verificar se o email já está em uso
        const emailExists = await checkIfEmailExists(formData.email);
        if (emailExists) {
          alert("Este e-mail já está em uso. Por favor, use outro e-mail.");
          return;
        }

        // Criar usuário no Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const user = userCredential.user;

        // Atualizar o perfil com o nome completo
        await updateProfile(user, { displayName: formData.fullName });
        try {
          if (!user || !user.uid) {
            throw new Error("Usuário não autenticado.");
          }

          const userDocRef = doc(usersCollection, user.uid);
          await setDoc(userDocRef, {
            id: user.uid,
            email: formData.email,
            fullName: formData.fullName,
            telefone: formData.telefone,
          });

          console.log("Usuário salvo no Firestore com sucesso!");
        } catch (error) {
          console.error("Erro ao salvar usuário no Firestore:", error);
        }

        // Salvar dados no LocalStorage
        localStorage.setItem("userData", JSON.stringify(formData));

        alert("Usuário cadastrado com sucesso!");
        setFormData({
          fullName: "",
          password: "",
          confirmPassword: "",
          email: "",
          telefone: "",
        });

        navigate("/");
      } catch (error) {
        alert("Erro ao criar usuário: " + error.message);
      } finally {
        setMyNewloading(false);
      }
    } else {
      console.log("Formulário inválido, corrigir erros.");
    }
  };

  return (
    <>
      {myNewloading && (
        <ContainerCardLaoder>
          <Loader sx={{ animation: "rotation 1s linear infinite" }}>
            <LoaderAfter />
          </Loader>
          <div>Logando...</div>
        </ContainerCardLaoder>
      )}
      <Stack
        sx={{
          width: "100%",
          minHeight: "100vh", // Permite crescer

    

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          padding: "10px",
          background:
            "linear-gradient(34deg, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 50%)",
          color: "white",
        }}
      >
        <Box
          sx={(themeSizeForme) => ({
            flexDirection: { xs: "column", md: "row" },
            display: "flex",
            width: "100%",

            minHeight: { md: "100vh" },
            alignItems: { md: "center" },
            justifyContent: "space-between",
            padding: "2rem",
            gap: "1rem",

            [themeSizeForme.breakpoints.down(900)]: {
              padding: "0.1rem",
            },
          })}
        >
          <div className="contact-left">
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "0.1rem",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  height: "4rem",
                  width: "1.5rem",
                  marginRight: "1.5rem",
                  backgroundColor: "#33bf30",
                  borderRadius: "20px",
                }}
              />
              <Typography
                sx={{
                  fontWeight: "800",
                  fontSize: {
                    xs: "1.2rem", // até 600px
                    sm: "1.7rem", // de 600px até 900px
                    md: "1.5rem", // acima de 900px
                  },

                  color: "#3cb815",
                }}
              >
                Bem-vindo! Vamos começar?
              </Typography>
            </Stack>
            <Typography
              sx={(theme) => ({
                fontWeight: "bold",
                color: "#fff",
                fontSize: "1.3rem",
                marginTop: "0.90rem",
                [theme.breakpoints.down("md")]: {
                  fontSize: "1.2rem",
                },
                [theme.breakpoints.down("sm")]: {
                  fontSize: "1rem",
                },
              })}
            >
              Entre em contato e descubra como podemos ajudar você!
            </Typography>

            <ul
              style={{
                marginTop: "2rem",
                gap: "2.5rem",
                listStyleType: "none",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <li>
                <Email
                  sx={{
                    color: "#3cb815",

                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.20)",
                      cursor: "pointer",
                      color: "#33BF30",
                    },
                  }}
                />
                <span
                  style={{
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    color: "#fff",
                    marginLeft: "1rem",
                  }}
                >
                  info@quizitoto.com
                </span>
              </li>
              <li>
                <Phone
                  sx={{
                    color: "#3cb815",

                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.20)",
                      cursor: "pointer",
                      color: "#33BF30",
                    },
                  }}
                />
                <span
                  style={{
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    color: "#fff",
                    marginLeft: "1rem",
                  }}
                >
                  +55 11 9999-9999
                </span>
              </li>
            </ul>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start", // agora vai alinhar à esquerda
                alignItems: "center", // ou "flex-end", dependendo da altura que você quer
                width: "100%",
                gap: "1.3rem",

                padding: "10px",

                // Também pode fazer hover específico em cada ícone (se quiser)
              }}
            >
              <XIcon
                sx={{
                  height: "40px",
                  width: "40px",
                  boxShadow: "0 2px 15px rgba(71, 71, 71, 0.1)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.20)",
                    cursor: "pointer",
                    color: "#33BF30",
                  },
                }}
              />
              <GoogleIcon
                sx={{
                  height: "40px",
                  width: "40px",
                  boxShadow: "0 2px 15px rgba(71, 71, 71, 0.1)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.20)",
                    cursor: "pointer",
                    color: "#33BF30",
                  },
                }}
              />
              <FacebookIcon
                sx={{
                  height: "40px",
                  width: "40px",
                  boxShadow: "0 2px 15px rgba(71, 71, 71, 0.1)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.20)",
                    cursor: "pointer",
                    color: "#33BF30",
                  },
                }}
              />
            </Box>

            <Button
              onClick={() => navigate("/Login")}
              sx={{
                background: "#33bf30",
                border: "none !important",
                outline: "none !important",
                color: "#fff",
                padding: "1rem 1.4rem",
                borderRadius: "10px",
                fontSize: "12px",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "2rem",
                minWidth: "150px",
                boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.16)",
                transition: "all 0.3s",
                "&:hover": { background: "#3cb815" },
                "&:disabled": { background: "#ccc" },
                "@media (max-width: 900px)": {
                  minWidth: "100px",
                },
              }}
            >
              Já tem uma conta? Faça login
            </Button>
          </div>

          <Box
            sx={{
              position: "relative",

              display: "flex",
              flexDirection: {
                xs: "row", // horizontal em telas pequenas
                md: "column", // vertical em telas maiores
              },
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",

              width: {
                xs: "100%", // largura total em telas pequenas
                md: "3%", // largura de 3% em telas maiores
              },
              height: {
                xs: "20px", // altura fixa em telas pequenas
                md: "100%", // altura total em telas maiores
              },
            }}
          >
            {/* Linha esquerda/vertical */}
            <Box
              sx={{
                width: {
                  xs: "45%", // Largura em telas pequenas
                  md: "2px", // Largura em telas médias e maiores
                },
                height: {
                  xs: "2px", // Altura em telas pequenas
                  md: "250px", // Altura em telas médias e maiores
                },
                background: {
                  xs: "linear-gradient(to left, #33BF30, transparent)",
                  md: "linear-gradient(to top, #33BF30, transparent)",
                },
              }}
            />

            <Typography
              sx={{
                fontWeight: "bold",
                color: "#33BF30",
                fontSize: "1rem",
              }}
            >
              ou
            </Typography>

            <Box
              sx={{
                width: {
                  xs: "45%",
                  md: "2px",
                },
                height: {
                  xs: "2px",
                  md: "250px",
                },
                background: {
                  xs: "linear-gradient(to right, #33BF30, transparent)",
                  md: "linear-gradient(to bottom, #33BF30, transparent)",
                },
              }}
            />
          </Box>

          <div className="contact-right">
            <form onSubmit={handleSubmit}>
              <div className="input_container">
                <PersonIcon className="iconField" />
                <input
                  type="text"
                  placeholder="Digite o seu nome..."
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                {formErrors.fullName && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {formErrors.fullName}
                  </p>
                )}{" "}
                {/* Exibir erro apenas se houver */}
              </div>
              <Box className="input_container">
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.20rem",
                    bgcolor: "#262626",
                    borderRadius: "5px",
                    padding: "0.20rem 0.20rem",
                    marginBottom: formErrors.telefone ? "1rem" : "2rem",
                  }}
                >
                  <TextField
                    label="Telefone"
                    variant="outlined"
                    size="small"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleTelefoneChange}
                    fullWidth
                    FormHelperTextProps={{
                      sx: {
                        fontSize: "1rem",
                        color: "red",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: 0,
                        backgroundColor: "#262626",
                        borderRadius: "5px",
                        color: "#fff",
                        fontSize: "13px",
                        "& fieldset": {
                          border: "none",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#aaa",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#00bcd4",
                      },
                      "& input": {
                        padding: "15px",
                      },
                    }}
                  />

                  <PhoneIphoneIcon sx={{ color: "#00a650" }} />
                </Box>

                {formErrors.telefone && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "0.90rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {formErrors.telefone}
                  </p>
                )}
              </Box>

              <div className="input_container">
                <ReplyAllIcon className="iconField" />
                <input
                  type="email"
                  placeholder="Digite o seu E-mail"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />

                {formErrors.email && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div className="input_container">
                {showSenha ? (
                  <VisibilityIcon
                    className="iconField"
                    onClick={() => setShowSenha(false)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <VisibilityOffIcon
                    className="iconField"
                    onClick={() => setShowSenha(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}

                <input
                  type={showSenha ? "text" : "password"}
                  placeholder="Digite sua senha"
                  name="password"
                  value={formData.password}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                {formErrors.password && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {formErrors.password}
                  </p>
                )}
              </div>

              <div className="input_container">
                {showConfirm ? (
                  <VisibilityIcon
                    className="iconField"
                    onClick={() => setShowConfirm(false)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <VisibilityOffIcon
                    className="iconField"
                    onClick={() => setShowConfirm(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}

                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Digite sua senha"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />

                {formErrors.confirmPassword && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Exibir erro apenas se houver */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  type="submit"
                  sx={{
                    background: "#33bf30",
                    border: "none !important",
                    outline: "none !important",
                    color: "#fff",
                    padding: "1rem 3.9rem",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginTop: "0.20rem",
                    minWidth: "150px",
                    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.16)",
                    transition: "all 0.3s",
                    "&:hover": { background: "#3cb815 " },
                    "&:disabled": { background: "#ccc" },
                    "@media (max-width: 900px)": {
                      minWidth: "100px",
                    },
                  }}
                >
                  Enviar
                </Button>
              </Box>
            </form>
          </div>
        </Box>
      </Stack>
    </>
  );
};

export default Signup;
