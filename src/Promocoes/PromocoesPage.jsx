import React from "react";
import { Box, Typography, Stack } from "@mui/material";

import ItemSwiperCard from "./CardPromocao";
import SlickCarousel from "./Ofertas";
import MissionVisionCard from "../companyStory/MissionVision";
import GetItemPromoCards from "./getPromoCards";
import MapHome from "./PaginaPromocoes";
import ContactForm from "../contact/ContactForm";
const PromocoesPage = () => (
  <Stack
    sx={{
      minHeight: "100vh",
      width: "100%",
      gap: "4rem",
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: "30px 2% 20px",
      transition: "3s ease-in-out",
      "@media only screen and (max-width: 800px)": {
        width: "100%",
        marginTop: "1.20rem",
        position: "relative",
      },
      overflowY: "auto",
      overflowX: "auto",
      background:
        "linear-gradient(34deg, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 50%)",
      color: "white",
    }}
  >
    <SlickCarousel />

    <Box
      sx={{
        width: "100%",
        height: "auto",
      }}
    >
      <MissionVisionCard />
    </Box>

    <Box
      sx={{
        width: "100%",
        height: "auto",
      }}
    >
      <MapHome />
    </Box>

    <Box
      sx={{
        width: "100%",
        height: "auto",
      }}
    >
      <ItemSwiperCard />
    </Box>

    <Box sx={{ width: "100%", height: "auto" }}>
      <GetItemPromoCards />
    </Box>

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
    <Box sx={{ width: "100%", height: "auto" }}>
      <ContactForm />
    </Box>
  </Stack>
);

export default PromocoesPage;
