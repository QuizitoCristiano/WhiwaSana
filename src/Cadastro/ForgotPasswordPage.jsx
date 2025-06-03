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

const RecuperarSeanha = () => {

const [formData, setFormData] = useState({
  email: "",
  
});

const [formErrors, setFormErrors] = useState({
  email: "",
  
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  const errors = {};



  if (!formData.email.trim()) {
    errors.email = "E-mail é obrigatório";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Por favor, digite um e-mail válido";
  }

  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
  } else {
    console.log("Formulário enviado com sucesso!", formData);

    setFormData({
      email: "",
      
    });

    setFormErrors({
      email: "",
      
    });

   
  }
};


  return (
    <>
      <Stack
        sx={{
          width: "100%",
          minHeight: "100vh", // Permite crescer

          marginTop: "10%",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          padding: "10px",
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
          xs: "1.2rem",
          sm: "1.7rem",
          md: "1.5rem",
        },
        color: "#3cb815",
      }}
    >
      Recuperar senha 🔐
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
    Informe seu e-mail e siga as instruções para redefinir sua senha.
  </Typography>

  <ul
    style={{
      marginTop: "0.1rem",
      gap: "2.5rem",
      listStyleType: "none",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Seus campos de input virão aqui */}
  </ul>

  <Button
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
    Voltar para login
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
                    fontSize: "12px",
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
                  Recuperar senha
                </Button>
              </Box>
            </form>
          </div>
        </Box>
      </Stack>
    </>
  );
};

export default RecuperarSeanha;
