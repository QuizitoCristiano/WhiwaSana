import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Stack, Typography } from "@mui/material";
import airpods from "../imagens/fonegreen2.png";
import foneBranco01 from "../imagens/foneBranco01.png";
import fone1 from "../imagens/fone1.png";
import FineRed from "../imagens/tablet15.png";
import Quizito4 from "../imagens/foneRed21.png";
import foneVerd from "../imagens/fonegreen13.png";

const ArrayItem = [
  { imageUrlOne: foneBranco01, title: "Ultra Laptop", textp: "Desconto imperdível" },
  { imageUrlOne: fone1, title: "SoundMax Pro", textp: "Som potente 🔥" },
  { imageUrlOne: FineRed, title: "Tablet X", textp: "Aproveite!" },
  { imageUrlOne: Quizito4, title: "AirBuds X", textp: "Frete grátis!" },
  { imageUrlOne: foneVerd, title: "Green Audio", textp: "Edição limitada!" },
  { imageUrlOne: airpods, title: "Headset Gamer", textp: "Conforto + Qualidade" },
];

export const Category = () => {
  return (
    <Stack
      sx={{
        width: "100%",
       
        alignItems: "center",
        marginTop: "4rem",
      }}
    >
      {/* Título */}
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "4rem",
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
            fontWeight: "700",
            fontSize: { xs: "1.5rem", md: "2rem" }, // Ajuste dinâmico
            color: "#fff",
          }}
        >
          Categorias
        </Typography>
      </Stack>

      {/* Cards */}
      <Stack
        sx={(theme) => ({
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // 3 colunas padrão
          gap: "20px",
          width: "100%",
         
          maxWidth: "1500px", // Define um limite máximo
          [theme.breakpoints.down("md")]: {
            gridTemplateColumns: "repeat(2, 1fr)", // 2 colunas em telas médias
          },
          [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "repeat(1, 1fr)", // 1 coluna no mobile
          },
        })}
      >
        {ArrayItem.map((item, index) => (
          <Box
            key={index}
      







            sx={(theme) => ({
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              width: "100%",
              height: "120px",
              padding: "1rem",
             
              display: "flex",
              alignItems: "center",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
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
            <Box
              sx={{
                // backgroundColor: "rgba(231, 238, 232)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
                width: "100px",
                height: "100px",
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
                src={item.imageUrlOne}
                alt=""
              />
            </Box>

            {/* Texto */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "20px",
                flexGrow: 1,
              }}
            >
              <Typography
                sx={{
                  color: "#33bf30",
                  fontWeight: "600",
                  fontSize: { xs: "1rem", md: "1.3rem" }, // Ajuste de tamanho
                }}
              >
                {item.title}
              </Typography>
              <Typography
                sx={{
                  // color: "rgb(223, 216, 216)",
                  color: '#fff',
                  fontSize: { xs: "0.9rem", md: "1rem" }, // Ajuste de tamanho
                }}
              >
                {item.textp}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};
