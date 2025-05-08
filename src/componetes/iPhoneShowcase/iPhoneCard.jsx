import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import Quizito4 from "../../imagens/iPhonePro5e.png";
import iPhoneOferta4e from "../../imagens/iPhoneVerde.png";
import iPhonePreto from "../../imagens/iPhonePreto12e.png";
import Macbook1 from "../../imagens/iPhoneRed12.png";

import iPhone2 from "../../imagens/iPhone2.jpg";
import iPhoneRosa from "../../imagens/iPhoneRosapr.png";
import iPhoneAzul from "../../imagens/iPhoneAzul.png";
import iPhoneverdcralor from "../../imagens/iPhoneverdcralor.png";

import { GlobalContext } from "../../contexto_global/useContextGlobal";

const appleCollection = [
  {
    id: "1",
    imageOne: iPhonePreto,
    title: "iPhone 14 Pro Max - Preto",
    price: "7.499,10",
  },
  {
    id: "2",
    imageOne: Quizito4,
    title: "iPhone 16 Pro Max - Dourado",
    price: "7.499,90",
  },
  {
    id: "3",
    imageOne: iPhoneOferta4e,
    title: "iPhone 14 Pro Max - Verde",
    price: "7.499,50",
  },
  {
    id: "4",
    imageOne: Macbook1,
    title: "iPhone 14 Pro Max - Vermelho",
    price: "7.499,30",
  },
  {
    id: "5",
    imageOne: iPhone2,
    title: "iPhone 15 Pro Max",
    price: "8.499,20",
  },
  {
    id: "6",
    imageOne: iPhoneRosa,
    title: "iPhone 16 Pro Max - Roxo",
    price: "9.199,80",
  },
  {
    id: "7",
    imageOne: iPhoneAzul,
    title: "iPhone 16 Pro Max - Azul",
    price: "9.199,40",
  },
  {
    id: "8",
    imageOne: iPhoneverdcralor,
    title: "iPhone 16 Pro Max - Stone",
    price: "9.199,60",
  },
];

const FeaturediPhone = () => {
  const {
    adicionarNovoItem,
    favoriteItem ,
  
    adicionarNovosItenfavoritos
  } = useContext(GlobalContext);
  return (
    <>
      <Stack
        sx={{
          width: "100%",
          textAlign: "center",
          marginTop: "6rem",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            placeItems: "center",
          }}
        >
          <Stack sx={{ display: "block" }}>
            <Box sx={{ display: "flex", placeItems: "center" }}>
              <Box
                sx={{
                  height: "4rem",
                  width: "1.5rem",
                  marginRight: "1.5rem",
                 
                  backgroundColor: "#33bf30",
                  borderRadius: "20px",
                }}
              ></Box>
              <Typography sx={{ fontWeight: '600', fontSize: '1.2rem'}}>Todos os Eletrônicos</Typography>
            </Box>

            <Typography
              variant="h1"
              sx={(theme) => ({
                color: "#33bf30",
                fontSize: "2rem",
                fontWeight: "600",
                lineHeight: "1.3",
                textAlign: "left",
                marginBottom: "3rem",
                [theme.breakpoints.down(800)]: {
                fontSize: "1.2rem",
                fontWeight: "700",
              },
              })}
            >
              Explorar os mais vendidos
            </Typography>
          </Stack>

          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <Button
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgb(237, 237, 237)",
                borderRadius: "50%",
                height: "60px",
                width: "50px",
                boxShadow: "0 2px 15px rgba(15, 1, 1, 0.1)",
                minWidth: "unset", // Garante que o botão não se expanda demais
              }}
            >
              <ArrowBackIosNewIcon sx={{ color: "rgb(51, 191, 48)" }} />
            </Button>
            <Button
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgb(237, 237, 237)",
                borderRadius: "50%",
                height: "60px",
                width: "50px",
                boxShadow: "0 2px 15px rgba(71, 71, 71, 0.1)",
                minWidth: "unset",
              }}
            >
              <ArrowForwardIosIcon sx={{ color: "rgb(51, 191, 48)" }} />
            </Button>
          </Stack>
        </Stack>

        <Stack
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // background: "#8de0e7",
            padding: "20px",
            "@media screen and (max-width: 700px)": {
              padding: "1px",
              gap: "1.7rem",
            },
          }}
        >
          <Stack
            sx={(theme) => ({
              display: "grid",
              justifyContent: "center",
              textAlign: "center",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "2rem",
              maxWidth: "1700px",
              width: "100%",
              margin: "0 auto",
              padding: "0 1rem", 
          
              [theme.breakpoints.down(1500)]: {
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1.7rem",
              },
              [theme.breakpoints.down(1050)]: {
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.5rem",
              },
              [theme.breakpoints.down(750)]: {
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1.3rem",
                placeItems: "center",
              },
              [theme.breakpoints.down(550)]: {
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1.2rem",
                placeItems: "center",
              
                margin: "0 auto",
                padding: "0.10rem", 
              },
              [theme.breakpoints.down(400)]: {
                gridTemplateColumns: "1fr",
                placeItems: "center",
                gap: "1.5rem",
                margin: "0 auto",
                padding: "0.30rem", 
              },
            })}
          >

            {appleCollection.map((item, index) => (
              <Box
                key={index}
                sx={(theme) => ({
                  background:
                    "linear-gradient(135deg, rgba(138, 137, 137, 0.1), rgba(133, 128, 128, 0.43))",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  borderRadius: "10px",
                  textAlign: "center",
                  overflow: "hidden",
                  boxShadow: "0 0 30px rgba(71, 71, 71, 0.1)",
                  maxWidth: "300px",
                  width: "100%",
                  height: "auto",
                  transition: "0.8s ease-in-out",
              
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
              
                  // Breakpoints responsivos:
                  [theme.breakpoints.down(800)]: {
                    maxWidth: "98%",
                  },
                  [theme.breakpoints.down(600)]: {
                    maxWidth: "100%",
                  },
                  [theme.breakpoints.down(400)]: {
                    maxWidth: "100%",
                    width: "100%",
                  },
                })}
              >
                <Box
                  sx={(theme) => ({
                    background:
                      "linear-gradient(135deg, rgba(138, 137, 137, 0.1), rgba(133, 128, 128, 0.43))",

                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",

                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // background: "rgb(231, 238, 252)",
                    padding: "20px",
                    height: "200px", // Ajuste a altura do espaço para a imagem

                    [theme.breakpoints.down("sm")]: {
                      padding: "5px",
                      height: "150px", // ou o tamanho que você quiser no mobile
                    },

                    [theme.breakpoints.down(400)]: {
                      padding: "10px",
                      height: "280px", // ou o tamanho que você quiser no mobile
                    },
                  })}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain", // Ajusta a imagem sem distorcer
                    }}
                    src={item.imageOne}
                    alt={item.title}
                  />
                  <Button
                    onClick={() => adicionarNovosItenfavoritos(item)}
                    sx={{
                      background: "transparent", // Fundo transparente
                      border: "1px solid rgba(255, 255, 255, 0.2)", // Borda sutil
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "5px",
                      minWidth: "32px",
                      minHeight: "32px",
                      cursor: "pointer",
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      zIndex: "10",
                      backdropFilter: "blur(5px)", // Efeito vidro fosco (opcional)
                      transition: "all 0.3s ease-in-out", // Transição suave ao passar o mouse
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.1)", // Leve destaque ao passar o mouse
                      },
                    }}
                  >
                    {favoriteItem.some((fav) => fav.id === item.id) ? (
                      <FavoriteIcon
                        sx={{ fontSize: "1.2rem", color: "#33bf30" }}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        sx={{ fontSize: "1.2rem", color: "#33bf30" }}
                      />
                    )}
                  </Button>
                </Box>
                <Box
                  sx={{
                    textAlign: "left",
                    padding: "10px",
                    fontSize: "16px",
                    fontWeight: "500",
                    marginTop: "10px",
                  }}
                >
                  <h2
                    style={{
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: "1rem",
                      marginBottom: "8px",
                    }}
                  >
                    {item.title}
                  </h2>
                  <Typography
                    sx={{
                      color: "#33bf30",
                      fontSize: "18px",
                      fontWeight: "400",
                      marginBottom: "8px",
                    }}
                  >
                    R$ {item.price}
                  </Typography>
                  <Button
                    sx={{
                      color: "white",
                      height: "2.5rem",
                      width: "7rem",
                      borderRadius: "5px",
                      fontSize: "12px",
                      cursor: "pointer",
                      background: "#33bf30",
                      outline: "none",
                      border: "none",
                    }}
                    onClick={() => adicionarNovoItem(item)}
                  >
                    Comprar
                  </Button>
                </Box>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default FeaturediPhone;
