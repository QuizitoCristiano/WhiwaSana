import React, { useState, useContext, useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import XIcon from "@mui/icons-material/X";

import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { Email, Phone } from "@mui/icons-material";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import InputMask from "react-input-mask";
import "../contact/ContactStyles.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../UserAuthContext/AuthContext";
import { db, auth } from "../../firebaseconfig/firebaseconfig";

const SignIn = () => {
  const navigate = useNavigate();

  const {
    isLoggedIn,
    setIsLoggedIn,
    logInWithEmailAndPassword,
    logout,
    user,
    loading,
  } = useContext(AuthContext);

  const [showSenha, setShowSenha] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    let valid = true;
    const errors = { email: "", password: "" };

    if (!formData.email) {
      errors.email = "E-mail é obrigatório.";
      valid = false;
    }
    // Adicione regex/email validation se quiser

    if (!formData.password) {
      errors.password = "Senha é obrigatória.";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const result = await logInWithEmailAndPassword(
      formData.email,
      formData.password
    );

    if (result.success) {
      navigate("/");
    } else {
      const error = result.error;
      if (error.message === "Usuário não encontrado no sistema.") {
        setFormErrors((prev) => ({ ...prev, email: error.message }));
      } else if (error.code === "auth/user-not-found") {
        setFormErrors((prev) => ({
          ...prev,
          email: "Usuário não encontrado. Verifique o e-mail digitado.",
        }));
      } else if (error.code === "auth/wrong-password") {
        setFormErrors((prev) => ({
          ...prev,
          password: "Senha incorreta. Tente novamente.",
        }));
      } else {
        setFormErrors((prev) => ({
          ...prev,
          email: "Erro ao fazer login. Por favor, tente novamente.",
        }));
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
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

            minHeight: { md: "100vh" }, // altura total só em telas md+
            alignItems: { md: "center" }, // opcional: alinha verticalmente
            justifyContent: "space-between", // ou "center", depende do layout
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
                Seja bem-vindo de volta!😊
              </Typography>
            </Stack>
            <Typography
              sx={(theme) => ({
                fontWeight: "bold",
                color: "#fff",
                fontSize: "1.2rem",
                marginTop: "0.90rem",
                [theme.breakpoints.down("md")]: {
                  fontSize: "1.1rem",
                },
                [theme.breakpoints.down("sm")]: {
                  fontSize: "1rem",
                },
              })}
            >
              Digite seus dados e clique em 'Entrar' para continuar.
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

            <Box sx={(themeBoxBd) => ({
            
              width: '100%',
              gap:'2rem',
              display: 'flex',
              alignItems:'left',
            
              flexDirection: 'row',
              [themeBoxBd.breakpoints.down(490)]:{
                flexDirection:'column',
                gap:'0.50rem',
                  justifyContent: 'center',
              }
            })}>
              <Button
                onClick={() => navigate("/Signup")}
                sx={{
                  background: "#33bf30",
                  border: "none !important",
                  outline: "none !important",
                  color: "#fff",
                  padding: "1rem 1rem",
                  borderRadius: "10px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "1rem",
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
                Não tem conta? Bora criar uma!
              </Button>

              <Button
                onClick={() => navigate("/AlterarSenha")}
                sx={{
                  background: "#33bf30",
                  border: "none !important",
                  outline: "none !important",
                  color: "#fff",
                  padding: "1rem 1rem",
                  borderRadius: "10px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "1rem",
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
                AlterarSenha
              </Button>
            </Box>
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
                <ReplyAllIcon className="iconField" />
                <input
                  type="email"
                  placeholder="Digite o seu E-mail"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
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
                  onChange={handleChange}
                  required
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

              {/* Exibir erro apenas se houver */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  // background: "pink",
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
                  Entrar
                </Button>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0.40rem",
                    padding: "0.20rem",
                    color: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <Link
                    to={"/RecuperarSeanha"}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography sx={{ color: "#fff" }}>
                      Esqueseu a senha?
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </form>
          </div>
        </Box>
      </Stack>
    </>
  );
};

export default SignIn;
