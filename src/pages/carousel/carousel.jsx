import React, { useState } from "react";

import "./carousel.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Button, Stack, Typography} from "@mui/material";
import HeadphoneImageContainer from "./HeadphoneImageContainer";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import TwitterIcon from "@mui/icons-material/Twitter";
import CardItem from "./cardeItem";
import { cardData } from "./cardData";
import { NewOrderVendas } from "./cardVendas/Myorder";
import { DataCardVendas } from "./cardVendas/cardeOrderVendas";
import { StyleClientNweLib } from "../../lib/newStylesLib";

export const Cardemep = ({ title, text, Strong }) => {
  return (
    <Stack>
      <h2>{title}</h2>
      <h3>{textTitle}</h3>
      <p>{text}</p>
      <p>{Strong}</p>
    </Stack>
  );
};

const myArrayCard = [
  {
    titleText: "Headphone H4000XS",
    description: `
    O Headphone H37770apresenta o sistema de 
    driver de câmara dupla que reduz a distorção
     e oferece som mais claro bem como o conforto
    `,
  },

  {
    titleText: "Headphone Quizito 2",
    description: `
    O Headphone H37770apresenta o sistema de 
    driver de câmara dupla que reduz a distorção
     e oferece som mais claro bem como o conforto
    `,
  },
  {
    titleText: "Headphone H4000XS",
    description: `
    O Headphone H37770apresenta o sistema de 
    driver de câmara dupla que reduz a distorção
     e oferece som mais claro bem como o conforto
    `,
  },

  {
    titleText: "Headphone Quizito 2",
    description: `
    O Headphone H37770apresenta o sistema de 
    driver de câmara dupla que reduz a distorção
     e oferece som mais claro bem como o conforto
    `,
  },
  {
    titleText: "Headphone H4000XS",
    description: `
    O Headphone H37770apresenta o sistema de 
    driver de câmara dupla que reduz a distorção
     e oferece som mais claro bem como o conforto
    `,
  },

  {
    titleText: "Headphone Quizito 2",
    description: `
    O Headphone H37770apresenta o sistema de 
    driver de câmara dupla que reduz a distorção
     e oferece som mais claro bem como o conforto
    `,
  },
];

export const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const [headphoneColor, setHeadphoneColor] = useState("white");

  return (
    <StyleClientNweLib.container>
      <StyleClientNweLib.containerChild>
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "cenyter",
            // backgroundColor: "rgba(255,255,255,0.8)",

            padding: "10px",
            height: "100%",
            width: "100%",
            textAlign: "center",

            "@media (min-width: 800px)": {
              width: "100%",
            },
          }}
        >
          <Box
            sx={{
              color: "#33BF30",
              fontWeight: "800",
              fontSize: "1.30rem",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <h4>Headphone H4000XS</h4>
          </Box>

          <Box className="sinta">
            <h3>
              Sinta o universo, <strong>ouça o </strong>
            </h3>
            <h3>
              <strong>universo</strong> sem sair de <strong>casa</strong>
            </h3>
          </Box>

        
          <Stack className="textfinal">
            <p>
              O <strong> Headphone H37770</strong> apresenta o sistema de driver
              de câmara dupla que reduz a distorção e oferece som mais claro bem
              como o conforto exclusivo da
              <strong> Listen Universe</strong>, proporcionado pelos fones de
              ouvido acolchoados que foram aprimorados com couro sintético extra
              ventilado.
            </p>
          </Stack>
          <Stack
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
              flexDirection: "row",
              gap: "50px",
              padding: "10px",
              height: "100%",
              width: "100%",
              "@media (max-width: 920px)": {
                flexDirection: "column",
                gap: "20px",
                width: "100%",
                height: "100%",
              },
            }}
          >
            <Button
              sx={{
                backgroundColor: "#3ca63a",
                color: "#ffffff",
                border: "none",
                padding: "15px 20px",
                cursor: "pointer",
                borderRadius: "9px",
                fontSize: "16px",
                width: "100%",
                gap: "10px",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "#3ca63a",
                  boxShadow: "0 0 10px 2px #33bf30",
                  border: "2px solid #33bf30",
                },
              }}
            >
              <ShoppingBagIcon />
              Compre já
            </Button>
            <Button
              sx={{
                background: "transparent", // Fundo transparente
                border: "1px solid rgba(255, 255, 255, 0.2)", // Borda sutil
                display: "flex",
                borderRadius: "9px",
                justifyContent: "center",
                alignItems: "center",

                width: "100%",
                padding: "15px 20px",
                fontSize: "16px",
                gap: "10px",
                cursor: "pointer",
                color: "#ffffff",
                backdropFilter: "blur(5px)", // Efeito vidro fosco (opcional)
                transition: "all 0.3s ease-in-out", // Transição suave ao passar o mouse
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.4)", // Leve destaque ao passar o mouse
                },

                // bgcolor: "#2e332e",
                //
                //
                // border: "none",
                //
                //
                // cursor: "pointer",

                // fontSize: "16px",
                // transition: "background-color 0.3s ease",
                // "&:hover": {
                //   backgroundColor: "#3ca63a",
                //   boxShadow: "0 0 10px 2px #2e332e",
                //   border: "2px solid #2e332e",
                //   bgcolor: "#2e332e",
                // },
              }}
            >
              <PlayCircleIcon /> Saiba mais
            </Button>
          </Stack>

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
            <InstagramIcon
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
            <YouTubeIcon
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
        </Stack>

        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: "10px",
            height: "100%",
            width: "100%",
          }}
        >
          <HeadphoneImageContainer color={headphoneColor} />
        </Stack>
      </StyleClientNweLib.containerChild>

     
    </StyleClientNweLib.container>
  );
};
