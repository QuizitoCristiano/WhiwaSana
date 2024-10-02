import React, { useState } from "react";

import Carousel from "react-bootstrap/Carousel";
import "./carousel.css";
import airpods from "../../imagens/fonegreen2.png";
import Quizito2 from "../../imagens/foneBranco01.png";
import Quizito3 from "../../imagens/fone1.png";
import FineRed from "../../imagens/foneRed1.png";

import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Button, Stack } from "@mui/material";
import { StyleClientNweLib } from "../../lib/newStylesLib";
import HeadphoneImageContainer from "./HeadphoneImageContainer ";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CardItem from "./cardeItem";
import { cardData } from "./cardData";
import { NewOrderVendas } from "./cardVendas/Myorder";
import { DataCardVendas } from "./cardVendas/cardeOrderVendas";
import { MyFooter } from "../../footer/footerBx";

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
              color: "#3ca63a",
              fontWeight: "800",
              fontSize: "2rem",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",

              margin: "10px",
            }}
          >
            <h3>Headphone H4000XS</h3>
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
              <strong>O Headphone H37770</strong>apresenta o sistema de driver
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
                bgcolor: "#2e332e",
                borderRadius: "9px",
                color: "#ffffff",
                border: "none",
                padding: "15px 20px",
                gap: "10px",
                cursor: "pointer",
                width: "100%",
                fontSize: "16px",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "#3ca63a",
                  boxShadow: "0 0 10px 2px #2e332e",
                  border: "2px solid #2e332e",
                  bgcolor: "#2e332e",
                },
              }}
            >
              <PlayCircleIcon /> Saiba mais
            </Button>
          </Stack>

          <Box className="socialMedia">
            <FacebookIcon className="SocialMidiaSon" />
            <WhatsAppIcon className="SocialMidiaSon" />
            <InstagramIcon className="SocialMidiaSon" />
            <LinkedInIcon className="SocialMidiaSon" />
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

      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          display: "flex",
          marginTop: "3rem",
          flexDirection: "column",
          gap: "10px",
          // bgcolor: "#849584",
          padding: "10px",
        }}
      >
        <Box>
          <h2>Faça parte do nosspo time aqui </h2>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: " space-between",
            padding: "20px",
            "@media (max-width: 750px)": {
              padding: "5px",
            },
          }}
        >
          {cardData.map((card, index) => (
            <CardItem
              key={index}
              title={card.title}
              description={card.description}
              Images={card.Images}
              textName={card.textName}
              textProfession={card.textProfession}
            />
          ))}
        </Box>

        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            height: "100%",
            width: "100%",
            marginTop: "4rem",
          }}
        >
          {DataCardVendas.map((item, index) => (
            <NewOrderVendas
              key={index}
              productName={item.productName}
              imagenItem={item.imagenItem}
              price={item.price}
              icon={item.icon}
              cartIcon={item.cartIcon}
            />
          ))}
        </Stack>
      </Stack>

     <MyFooter/>
    </StyleClientNweLib.container>
  );
};
