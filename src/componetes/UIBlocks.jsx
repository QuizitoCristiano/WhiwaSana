import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { GlobalContext } from "../contexto_global/useContextGlobal";

// Imagens
import iphone15ProMax from "../imagens/tablet14.png";
import iphone16ProMax from "../imagens/tablet11.png";
import ipadPro11 from "../imagens/tablet15.png";
import ipadPro12 from "../imagens/tablet10.png";
import ipadAir from "../imagens/tablet7.png";
import ipadMini from "../imagens/tablet2.png";
import ipad10 from "../imagens/tablet9.png";
import macbookProM3 from "../imagens/tablet1.png";
import { Margin } from "@mui/icons-material";
const limitedEditions = [
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    imageOne: iphone15ProMax,
    price: "10.999",
  },
  {
    id: 2,
    title: "iPhone 16 Pro Max",
    imageOne: iphone16ProMax,
    price: "11.999",
  },
  { id: 3, title: "iPad Pro 11", imageOne: ipadPro11, price: "8.299" },
  { id: 4, title: "iPad Pro 12 dfsa", imageOne: ipadPro12, price: "9.799" },
  { id: 5, title: "iPad Air", imageOne: ipadAir, price: "5.699" },
  { id: 6, title: "iPad Mini", imageOne: ipadMini, price: "4.599" },
  { id: 7, title: "iPad 10ª Geração", imageOne: ipad10, price: "4.199" },
  { id: 8, title: "Macbook Pro M3", imageOne: macbookProM3, price: "18.499" },
];
// Mock de cards

const PremiumiPhones = () => {
 const {
     adicionarNovoItem,
     favoriteItem ,
     adicionarNovosItenfavoritos
   } = useContext(GlobalContext);

  const isXLarge = useMediaQuery("(min-width:1500px)");
  const isLarge = useMediaQuery("(min-width:1200px)");
  const isMedium = useMediaQuery("(min-width:900px)");
  const isSmall = useMediaQuery("(min-width:600px)");

  let visibleCardsCount = 2; // padrão: 2 cards (para telas pequenas)

  if (isSmall) visibleCardsCount = 3;
  if (isMedium) visibleCardsCount = 4;
  if (isLarge) visibleCardsCount = 5;
  if (isXLarge) visibleCardsCount = 6;

  const [cards, setCards] = useState(limitedEditions);

  const handleNextCard = () => {
    setCards((prev) => {
      const next = [...prev.slice(1), prev[0]];
      return next;
    });
  };

  const handlePrevCard = () => {
    setCards((prev) => {
      const prevCard = prev[prev.length - 1];
      return [prevCard, ...prev.slice(0, -1)];
    });
  };

  return (
    <Stack sx={{ width: "100%", textAlign: "center", mt: "6rem" }}>
      {/* Título e botões */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack>
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                height: "4rem",
                width: "1.5rem",
                mr: "1.5rem",
                fontWeight: '800',
                backgroundColor: "#33bf30",
                borderRadius: "20px",
              }}
            />
            <Typography sx={{fontWeight: '600'}} >Todos os Eletrônicos</Typography>
          </Box>

          <Typography
            variant="h1"
            sx={(theme) => ({
              // color: "rgb(64, 64, 64)",
              color: '#33bf30',
              fontSize: "1.8rem",
              fontWeight: "600",
              lineHeight: "1.3",
              textAlign: "left",
              mb: "3rem",
              [theme.breakpoints.down(800)]: {
                fontSize: "1rem",
                fontWeight: "800",
              },
            })}
          >
           Portabilidade com potência
          </Typography>
        </Stack>

        <Stack direction="row" gap="10px">
          <Button onClick={handlePrevCard} sx={arrowBtnStyle}>
            <ArrowBackIosNewIcon sx={{ color: "rgb(51, 191, 48)" }} />
          </Button>
          <Button onClick={handleNextCard} sx={arrowBtnStyle}>
            <ArrowForwardIosIcon sx={{ color: "rgb(51, 191, 48)" }} />
          </Button>
        </Stack>
      </Stack>

      {/* Grid de Cards */}

      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          flexWrap: "nowrap", // isso mesmo!

          alignItems: "center",
          overflow: "hidden",
          // background: "plum",
          padding: "10px",
          width: "100%",
        }}
      >
        <AnimatePresence mode="popLayout">
          {cards.slice(0, visibleCardsCount).map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={cardStyle}>
                <Box
                  sx={{

                    background:
                    "linear-gradient(135deg, rgba(138, 137, 137, 0.1), rgba(133, 128, 128, 0.43))",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // background: "rgb(231, 238, 252)",
                    padding: "10px",
                    width: "100%",
                    height: "180px",
                    overflow: "hidden",

                      '@media only screen and (max-width: 760px)': {
                        width: "100%",
                        height: "160px",
                        // background: ' rgba(0, 0, 0, 0.2)',
                        objectFit: "contain",
                      }
                
                  }}
                >
                  <img
                    src={item.imageOne}
                    alt={item.title}
                    style={{
                      width: "215px",
                      height: "150px",
                      objectFit: "contain",
                      "@media (minWidth: 750px)": {
                        width: "100%",
                        height: "100%",
                        background: 'red !important',
                        objectFit: "contain",
                      },
                    }}
                  />

                  <Button
                    onClick={() => adicionarNovosItenfavoritos(item)}
                    sx={favoriteBtnStyle}
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
                    mt: "10px",
                    flexGrow: 1,
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{ fontSize: "1rem",
                      color: '#fff',
                       fontWeight: 600 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: "#33bf30", fontSize: "18px" }}>
                    R$ {item.price}
                  </Typography>
                </Box>

                <Button
                  sx={{
                    color: "white",
                    height: "2.5rem",
                    right: "-0.50rem",
                    width: "7rem",
                    borderRadius: "5px",
                    fontSize: "12px",
                    cursor: "pointer",
                    background: "#33bf30",
                    outline: "none",
                    border: "none",
                    mt: "auto", // <-- garante que fique no final
                    mb: "10px",
                  }}
                  onClick={() => adicionarNovoItem(item)}
                >
                  Comprar
                </Button>
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>
      </Stack>
    </Stack>
  );
};

// Estilos
const arrowBtnStyle = {
  background: "rgb(237, 237, 237)",
  borderRadius: "50%",
  height: "60px",
  width: "50px",
  boxShadow: "0 2px 15px rgba(71, 71, 71, 0.1)",
  minWidth: "unset",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {

  background:
  "linear-gradient(135deg, rgba(138, 137, 137, 0.1), rgba(133, 128, 128, 0.43))",
border: "1px solid rgba(255, 255, 255, 0.2)",
backdropFilter: "blur(20px)",
WebkitBackdropFilter: "blur(20px)",

// backgroundColor: "white",
  borderRadius: "10px",
  textAlign: "center",

  overflow: "hidden",
  boxShadow: "0 0 30px rgba(71, 71, 71, 0.1)",
  width: "100%",
  maxWidth: "350px",
  minHeight: "200px", // <-- ALTURA FIXA

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between", // <-- mantém tudo equilibrado
  transition: "0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },

  "@media only screen and (max-width: 890px)": {
    width: "180px",
    minHeight: "220px", // um pouquinho menor para tablet
  },
  "@media (max-width: 768px)": {
    width: "165px",
    minHeight: "260px", // um pouquinho menor para celular
  },

};

// const imageContainerStyle = {
//   position: "relative",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   background: "rgb(231, 238, 252)",
//   padding: "10px",
//   width: "100%",
//   height: "180px",
//   overflow: "hidden",

// };

const favoriteBtnStyle = {
  background: "transparent",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "50%",
  padding: "5px",
  minWidth: "32px",
  minHeight: "32px",
  cursor: "pointer",
  position: "absolute",
  top: "8px",
  right: "8px",
  backdropFilter: "blur(5px)",
};

// const imgStyle = {
//   width: "215px",
//   height: "150px",
//   objectFit: "contain",
//   "@media (max-width: 750px)": {
//     width: "100%",
//     height: "100%",
//   },
// };

export default PremiumiPhones;
