import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Button, Stack, Typography } from "@mui/material";

import iphone15ProMax from "../../imagens/tablet14.png";
import iphone16ProMax from "../../imagens/tablet11.png";
import ipadPro11 from "../../imagens/tablet15.png";
import ipadPro12 from "../../imagens/tablet10.png";

import ipadAir from "../../imagens/tablet7.png";
import ipadMini from "../../imagens/tablet2.png";
import ipad10 from "../../imagens/tablet9.png";
import macbookProM3 from "../../imagens/tablet1.png";

const limitedEditions = [
  {
    id: "1",
    imageOne: iphone15ProMax,
    title: "iPhone 15 Pro Max",
    textp: "Conforto + Qualidade",
  },
  {
    id: "2",
    imageOne: iphone16ProMax,
    title: "iPhone 16 Pro Max",
    textp: "Desconto imperdível",
  },
  {
    id: "3",
    imageOne: ipadPro11,
    title: 'iPad Pro 11" (M2)',
    textp: "Som potente 🔥",
  },
  {
    id: "4",
    imageOne: ipadPro12,
    title: 'iPad Pro 12.9" (M2)',
    textp: "Novo design + 5G",
  },
  {
    id: "5",
    imageOne: ipadAir,
    title: "iPad Air 5 (M1)",
    textp: "Aproveite por R$ 250!",
  },
  {
    id: "6",
    imageOne: ipadMini,
    title: "iPad Mini 6",
    textp: "Edição limitada!",
  },
  {
    id: "7",
    imageOne: ipad10,
    title: "iPad 10ª Geração",
    textp: "Conforto + Qualidade",
  },
  {
    id: "8",
    imageOne: macbookProM3,
    title: 'MacBook Pro 14" (M3)',
    textp: "Frete grátis!",
  },
  {
    id: "8",
    imageOne: macbookProM3,
    title: 'MacBook Pro 14" (M3)',
    textp: "Frete grátis!",
  },
];

const PremiumiPhones = () => {
  return (
    <>
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
              // color: "rgb(64, 64, 64)",
              color: '#fff'
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
              gap: "10px",
            },
            [theme.breakpoints.down("sm")]: {
              gridTemplateColumns: "repeat(2, 1fr)", // 1 coluna no mobile
              gap: "10px",
            },
          })}
        >
          {limitedEditions.map((item, index) => (
            <Box
              key={index}
              sx={(theme) => ({
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                width: "100%",
                height: "90px",
                display: "flex",
                alignItems: "center",
                borderRadius: "10px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                [theme.breakpoints.down(800)]: {
                  width: "100%",
                  height: "75px",
                  fontSize: "5px",
                },
              })}
            >
              {/* Imagem */}
              <Box
                sx={(theme) => ({
                  // backgroundColor: "rgba(231, 238, 232)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                  width: "70px",
                  height: "70px",

                  [theme.breakpoints.down(900)]: {
                    width: "50px",
                    height: "60px",
                   
                    
                  },
                })}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src={item.imageOne}
                  alt=""
                />
              </Box>

              {/* Texto */}
              <Box
                sx={(tehme) => ({
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "20px",
                  flexGrow: 1,
                 

                  [tehme.breakpoints.down(900)]: {
                    paddingLeft: '4px'
                  }

                })}
              >
                <Typography
                  sx={(theme) => ({
                    // color: "rgb(64, 64, 64)",
                     color: '#33bf30',
                    fontWeight: "600",
                    fontSize: { xs: "0.70rem", md: "0.90rem" }, // Ajuste de tamanho
                    [theme.breakpoints.down(800)]: { fontSize: "11px" }, // Ajuste de tamanho
                  })}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={(theme) => ({
                    color: "rgb(250, 246, 246)",
                    fontSize: { xs: "0.9rem", md: "1rem" }, // Ajuste de tamanho
                    [theme.breakpoints.down(800)]: { fontSize: "11px" }, // Ajuste de tamanho
                  })}
                >
                  {item.textp}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default PremiumiPhones;
