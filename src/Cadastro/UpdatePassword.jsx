import React, { useState } from "react";
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

import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { Email, Phone } from "@mui/icons-material";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import InputMask from "react-input-mask";

import "../contact/ContactStyles.css";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../UserAuthContext/AuthContext";

import { db, auth } from "../../firebaseconfig/firebaseconfig";

const AlterarSenha = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [showAticaSenha, setShowAticaSenha] = useState(false);
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    degiteAsenhaAntica: "",
    Password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    degiteAsenhaAntica: "",
    Password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // Validações
    if (!formData.degiteAsenhaAntica.trim()) {
      errors.degiteAsenhaAntica = "Senha antiga é obrigatória";
    }

    if (!formData.Password.trim()) {
      errors.Password = "Senha é obrigatória";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
        formData.Password
      )
    ) {
      errors.Password =
        "A senha deve ter 8+ caracteres com letra maiúscula, minúscula, número e símbolo";
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Confirme sua senha";
    } else if (formData.confirmPassword !== formData.Password) {
      errors.confirmPassword = "As senhas não coincidem";
    }

    if (
      formData.degiteAsenhaAntica &&
      formData.degiteAsenhaAntica === formData.Password &&
      formData.degiteAsenhaAntica === formData.confirmPassword
    ) {
      errors.Password = "A nova senha deve ser diferente da senha antiga";
      errors.confirmPassword =
        "A nova senha deve ser diferente da senha antiga";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (!user || !user.email) {
        console.error("Usuário não encontrado ou sem email.");
        alert("Erro ao identificar usuário. Faça login novamente.");
        return;
      }

      const credential = EmailAuthProvider.credential(
        user.email,
        formData.degiteAsenhaAntica
      );

      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, formData.Password);

      await logout();
      navigate("/SignIn");
    } catch (error) {
      console.error("Erro ao alterar senha:", error.message);
      if (error.code === "auth/wrong-password") {
        setFormErrors({
          ...formErrors,
          degiteAsenhaAntica: "Senha antiga incorreta.",
        });
      } else {
        alert("Erro ao atualizar senha. Tente novamente.");
      }
    }
  };

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
                Vamos redefinir sua senha
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
              Preencha os dados abaixo para continuar.
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

            <Button
             onClick={() => navigate("/SignIn")}
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
                {showAticaSenha ? (
                  <VisibilityIcon
                    className="iconField"
                    onClick={() => setShowAticaSenha(false)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <VisibilityOffIcon
                    className="iconField"
                    onClick={() => setShowAticaSenha(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
                <input
                  type={showAticaSenha ? "text" : "password"}
                  placeholder="Digite sua antica senha "
                  name="degiteAsenhaAntica"
                  value={formData.degiteAsenhaAntica}
                  onChange={handleChange}
                  required
                />
                {formErrors.degiteAsenhaAntica && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {formErrors.degiteAsenhaAntica}
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
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  required
                />
                {formErrors.Password && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {formErrors.Password}
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
                  onChange={handleChange}
                  required
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
                  Atualizar senha
                </Button>
              </Box>
            </form>
          </div>
        </Box>
      </Stack>
    </>
  );
};

export default AlterarSenha;
