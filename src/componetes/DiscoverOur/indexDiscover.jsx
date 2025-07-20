import React from "react";
import CardItem from "./Card";
import headphonesData from "./DiscoverData";
import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const DiscoverOurHeadphones = ({ adicionarNovoItem }) => {
  return (
    <Stack
      sx={{
        width: "100%",
        textAlign: "center",
        marginTop: "5rem",
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
            <Typography sx={{ fontSize: "1rem" }}>
              Todos os Eletrônicos
            </Typography>
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
            Sinta o som em outro nível
          </Typography>
        </Stack>
{/* 
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
              boxShadow: "0 2px 15px rgba(71, 71, 71, 0.1)",
              minWidth: "unset",
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
        </Stack> */}
      </Stack>

      <Stack
        sx={(theme) => ({
          display: "grid",
          justifyContent: "center", // Centraliza os itens dentro do grid
          textAlign: "center",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "2rem",
          maxWidth: "1700px", // Define um limite para o grid
          width: "100%", // Permite que ele se ajuste conforme o conteúdo
          [theme.breakpoints.down(1500)]: {
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.7rem",
          },
          [theme.breakpoints.down(1050)]: {
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          },
          [theme.breakpoints.down(750)]: {
            gridTemplateColumns: "repeat(2, 1fr)", // Duas colunas para telas menores
            gap: "1.3rem",
          },
          [theme.breakpoints.down(550)]: {
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.2rem",
            placeItems: "center", // centraliza os itens dentro da grid
          },
          [theme.breakpoints.down(400)]: {
            gridTemplateColumns: "1fr", // apenas 1 coluna
          },
        })}
      >
        {headphonesData.map((headphone) => (
          <Box key={headphone.id} sx={{ width: "98%" }}>
            <CardItem item={headphone} />
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default DiscoverOurHeadphones;
