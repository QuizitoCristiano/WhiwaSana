import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Stack, Typography, Modal, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GavelIcon from '@mui/icons-material/Gavel';
import HandshakeIcon from '@mui/icons-material/Handshake';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 400,
    padding: "1rem",
    bgcolor: "background.paper",
  
    border: "1px solid #33bf30)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };
  




  
  const MyArryGalleryItems = [
    {
      icons: [VolunteerActivismIcon ],
      title: "Nossa Missão com você.",
      preview: "Tecnologia acessível com alma e propósito.",
      textp: `Oferecer tecnologia de qualidade com preços justos,
      atendimento humanizado e 
      foco total na experiência do cliente.`,
    },
    {
      icons: [VisibilityIcon ],
      title: "A nossa Visão.",
      preview: "Ser a marca que você confia, recomenda e volta sempre.",
      textp: `Ser referência nacional em eletrônicos,
      reconhecida por confiança, inovação e acessibilidade.`,
    },
    {
      icons: [GavelIcon ],
      title: "Nossos Valores.",
      preview: "Respeito, inovação e transparência guiando cada decisão.",
      textp: `Compromisso com o cliente
      Transparência
      Qualidade em tudo
      Inovação constante
      Respeito e responsabilidade`,
    },
    {
      icons: [HandshakeIcon ],
      title: "Nosso Compromisso com Você.",
      preview: "Não vendemos apenas produtos. Entregamos confiança.",
      textp: `Cada produto enviado carrega nosso compromisso com a sua satisfação.
      Trabalhamos com responsabilidade para garantir que sua compra chegue com 
      qualidade, segurança e total suporte. Aqui, o pós-venda importa tanto quanto 
      a primeira visita ao nosso site.`,
    },
  ];
  

const MissionVisionCard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
  };
  return (
    <Stack
      sx={{
        width: "100%",

        alignItems: "center",

        // background: '#343534',
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "20px",
          gap: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          mb: 4,
        }}
      >
        {/* Da esquerda ao meio (escuro → claro) */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "50%",
            height: "2px",
            background: "linear-gradient(to left, #33BF30, transparent)", // Escuro à direita, claro à esquerda
          }}
        />

        {/* Da direita ao meio (claro → escuro) */}
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "50%",
            height: "2px",
            background: "linear-gradient(to left, transparent, #33BF30)", // Claro à esquerda, escuro à direita
          }}
        />
      </Box>

      <Stack


        sx={(theme) => ({
          display: "grid",

          gridTemplateColumns: "repeat(4, 1fr)", // 3 colunas padrão
          gap: "20px",
          width: "100%",
          marginBottom: "1rem",

          maxWidth: "1500px", // Define um limite máximo
          [theme.breakpoints.down("md")]: {
            gridTemplateColumns: "repeat(3, 1fr)", // 2 colunas em telas médias
          },
          [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "repeat(2, 1fr)", // 1 coluna no mobile
          },
        })}
      >
        {MyArryGalleryItems.map((item, index) => (
          <Box
            key={index}
            sx={(theme) => ({
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              width: "100%",
              padding: "1rem",
              height: "auto",
              display: "flex",
              alignItems: "center",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.03)",
                cursor: "pointer",
              },

              [theme.breakpoints.down(700)]: {
                width: "100%",
                height: "auto",
                fontSize: "0.5rem",
                padding: "0.2rem",
              },
            })}
          >
            {/* Imagem */}

            {/* Texto */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "20px",
                flexGrow: 1,
              }}
            >
              <Box
                sx={{
                  //   backgroundColor: "rgba(231, 238, 232, 0.2)",
                  display: "flex",

                  alignItems: "center",
                  padding: "10px",
                  width: "90%",
                  height: "auto",
                }}
              >
                {item.icons.map((IconComponent, idx) => (
                  <IconComponent
                    key={idx}
                    onClick={() => handleOpenModal(item)}
                    sx={(theme) => ({
                      //   color: "#FFD700",
                      color: "#33BF30",
                      fontSize: "2rem",

                      [theme.breakpoints.down(700)]: {
                        fontSize: "1.3rem",
                      },
                    })}
                  />
                ))}
              </Box>

              <Typography
                sx={{
                  //   color: "rgb(64, 64, 64)",
                  color: "#fff",

                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  fontSize: { xs: "0.8rem", md: "1.3rem" }, // Ajuste de tamanho
                }}
              >
                {item.title}
              </Typography>
              <Typography
                sx={{
                  color: "rgb(137, 137, 137)",
                  marginBottom: "0.5rem",
                
                  fontSize: { xs: "0.7rem", md: "0.8rem" }, // Ajuste de tamanho
                }}
              >
                {item.preview}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "20px",
          gap: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          mb: 4,
        }}
      >
        {/* Da esquerda ao meio (escuro → claro) */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "50%",
            height: "2px",
            background: "linear-gradient(to left, #33BF30, transparent)", // Escuro à direita, claro à esquerda
          }}
        />

        {/* Da direita ao meio (claro → escuro) */}
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "50%",
            height: "2px",
            background: "linear-gradient(to left, transparent, #33BF30)", // Claro à esquerda, escuro à direita
          }}
        />
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="parent-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold", mb: 2 , color: '#33bf30'}}
          >
            {selectedItem?.title}
          </Typography>
          <Typography
            id="parent-modal-description"
            sx={{
              fontSize: "1rem",
              color: "rgba(0, 0, 0, 0.7)",
            }}
          >
            {selectedItem?.textp}
          </Typography>
        </Box>
      </Modal>
    </Stack>
  );
};

export default MissionVisionCard;
