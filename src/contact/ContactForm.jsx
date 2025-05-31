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

import {
  Person as PersonIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  Visibility,
  VisibilityOff,
  JavascriptSharp,
} from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { Email, Phone } from "@mui/icons-material";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import InputMask from "react-input-mask";

import "./ContactStyles.css";

import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions"; // Ícone do botão para abrir o modal
import js from "@eslint/js";

const emojiList = [
  { name: "Riso com Lágrimas", emoji: "🤣" },
  { name: "Coração com Flecha", emoji: "💞" },
  { name: "Cerveja", emoji: "🍺" },
  { name: "Macaco", emoji: "🙈" },
  { name: "Deslumbrado", emoji: "🤩" },
  { name: "Amor", emoji: "😍" },
  { name: "Carinha Apaixonada", emoji: "🥰" },
  { name: "Festa", emoji: "🥳" },
  { name: "Raio", emoji: "⚡" },
  { name: "Fogo", emoji: "🔥" },
  { name: "Ilha", emoji: "🏝" },
  { name: "Praia", emoji: "🏖" },
  { name: "Fogos de Artifício", emoji: "🎇" },
  { name: "Fogos", emoji: "🎆" },
  { name: "Chorando", emoji: "😢" },
  { name: "Anel", emoji: "💍" },
  { name: "Troféu", emoji: "🏆" },
  { name: "Medalha de Ouro", emoji: "🥇" },
  { name: "Coração Vermelho", emoji: "❤" },
  { name: "Coração Verde", emoji: "💚" },
  { name: "Coração Azul", emoji: "💙" },
  { name: "Polegar para Cima", emoji: "👍" },
  { name: "Ilha", emoji: "🏝" },
  { name: "Festa", emoji: "🥳" },
  { name: "Bolo", emoji: "🎂" },
  { name: "Flores", emoji: "💐" },
  { name: "Champanhe", emoji: "🍾" },
  { name: "Festa com Confetes", emoji: "🎉" },
  { name: "Coração com Laço", emoji: "💝" },
  { name: "Cerveja", emoji: "🍻" },
  { name: "Prato", emoji: "🍽" },
  { name: "Vinho", emoji: "🍷" },
  { name: "Coquetel", emoji: "🍹" },
  { name: "Avião", emoji: "✈" },
  { name: "Carrinho de Compras", emoji: "🛒" },
  { name: "Presente", emoji: "🎁" },
  { name: "Envelope", emoji: "📩" },
  { name: "Laço", emoji: "🎀" },
  { name: "Estetoscópio", emoji: "🩺" },
  { name: "Ímã", emoji: "🧲" },
  { name: "Cadeado", emoji: "🔐" },
  { name: "Relógio", emoji: "🕘" },
];

const ContactForm = () => {
  const [textSon, setTextSon] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const AddEmoji = (emoji) => () => {
    setFormData((prev) => ({
      ...prev,
      message: prev.message + emoji,
    }));

    handleCloseModal(); // Se quiser fechar o modal automaticamente
  };

  const filteredEmojis = emojiList.filter((emoji) =>
    emoji.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefone: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    telefone: "",
    message: "",
  });

  const [telefoneUser, setTelefoneUser] = useState(""); // <--- ADICIONE ISSO

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

    setTelefoneUser(value);

    setFormData((prevData) => ({
      ...prevData,
      telefone: value,
    }));

    // Limpa erro se estiver digitando corretamente
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      telefone: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Limpa erro se o usuário começar a digitar
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Informe o nome completo";
    }

    if (!formData.email.trim()) {
      errors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Por favor, digite um e-mail válido";
    }

    const phoneNumbers = formData.telefone.replace(/\D/g, "");
    if (!formData.telefone || phoneNumbers.length < 11) {
      errors.telefone = "Digite um telefone válido";
    }

    // ✅ Validação do campo mensagem com mínimo de 30 caracteres
    if (!formData.message.trim()) {
      errors.message = "A mensagem não pode estar vazia";
    } else if (formData.message.trim().length < 30) {
      errors.message = "A mensagem deve ter no mínimo 30 caracteres";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      console.log("Formulário enviado com sucesso!", formData);

      setFormData({
        name: "",
        email: "",
        telefone: "",
        message: "",
      });

      setFormErrors({
        name: "",
        email: "",
        telefone: "",
        message: "",
      });

      setTelefoneUser("");
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
                  fontSize: { xs: "1.5rem", md: "2.2rem" }, // Ajuste dinâmico
                  color: "#3cb815",
                }}
              >
                Contact Me
              </Typography>
            </Stack>
            <Typography
              sx={(theme) => ({
                fontWeight: "bold",
                color: "#fff",
                fontSize: "1.4rem",
                marginTop: "0.90rem",
                [theme.breakpoints.down("md")]: {
                  fontSize: "1.2rem",
                },
                [theme.breakpoints.down("sm")]: {
                  fontSize: "1rem",
                },
              })}
            >
              Entre em contato conosco para mais informações.
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
              <WhatsAppIcon
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
            </Box>

            <Button
              sx={{
                background: "#33bf30",
                border: "none !important",
                outline: "none !important",
                color: "#fff",
                padding: "1rem 2.4rem",
                borderRadius: "10px",
                fontSize: "16px",
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
              Download cv
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

            {/* Linha direita/vertical */}
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
                  name="name" // O nome do campo deve corresponder ao estado
                  value={formData.name}
                  onChange={handleChange}
                  // Remova a propriedade required se o campo de nome não for obrigatório
                />
                {formErrors.name && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {formErrors.name}
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
                    value={telefoneUser}
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
              <Box sx={{ position: "relative", width: "100%" }}>
                <TextareaAutosize
                  minRows={5}
                  maxRows={8}
                  value={formData.message}
                  name="message"
                  onChange={handleChange}
                  placeholder="Digite sua mensagem aqui…"
                  style={{
                    backgroundColor: "#262626",
                    color: "#fff",
                    fontSize: "1rem",
                    fontWeight: 500,
                    width: "100%",
                    padding: "1rem 3rem 1rem 1rem",
                    resize: "none",
                    borderRadius: "8px",
                  }}
                />

                <IconButton
                  onClick={handleOpenModal}
                  sx={{
                    position: "absolute",
                    right: 8,
                    bottom: 8,
                    color: "#fff",
                    height: "40px",
                    width: "40px",
                    background: "#33bf30",
                    borderRadius: "10px",
                    padding: 1,

                    boxShadow: "0 0 14px rgba(60, 184, 21, 0.6)",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      cursor: "pointer",
                      background: "#3cb815",
                      boxShadow: "0 0 16px rgba(255, 255, 255, 0.9)",
                    },

                    // Sombras mais espalhadas ao redor
                  }}
                >
                  <EmojiEmotionsIcon />
                </IconButton>
              </Box>
              {formErrors.message && (
                <p
                  style={{ color: "red", fontSize: "1rem", marginTop: "1rem" }}
                >
                  {formErrors.message}
                </p>
              )}{" "}
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

        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              width: {
                xs: "99%", // 100% de largura em telas pequenas
                sm: 400, // 400px em telas médias e maiores
              },
              padding: 2,
              backgroundColor: "white",
              borderRadius: 2,
              margin: "auto",

              marginTop: "27%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Selecione um Emoji
            </Typography>
            <TextField
              sx={{
                width: "100%",

                marginTop: 1,
                padding: "10px",

                backgroundColor: "#f5f5f5",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "#e6e6e6",
                },
              }}
              variant="outlined"
              placeholder="Pesquisar..."
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
            <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 1 }}>
              {filteredEmojis.map((emoji) => (
                <IconButton key={emoji.name} onClick={AddEmoji(emoji.emoji)}>
                  <span style={{ fontSize: "24px" }}>{emoji.emoji}</span>
                </IconButton>
              ))}
            </Box>
          </Box>
        </Modal>
      </Stack>
    </>
  );
};

export default ContactForm;
