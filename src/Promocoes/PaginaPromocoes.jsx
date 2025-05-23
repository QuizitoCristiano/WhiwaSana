import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import CuritibaCite from "./promoImages/boxCuritiba.png";
import ViaMonte from "./promoImages/ViaMonte.png";
import AvenidaPaulista from "./promoImages/AvenidaPaulista.png";
import newYork from "./promoImages/newYork.png";

const branches = [
  {
    city: "New York",
    address:
      "Westfield World Trade Center, 185 Greenwich St, New York, NY 10007, USA",
    mapUrl:
      "https://www.google.com/maps/place/Westfield+World+Trade+Center/@40.7126,-74.0116,17z",
    image: newYork,
  },
  {
    city: "Curitiba",
    address:
      "Shopping Pátio Batel, Av. do Batel, 1868 - Batel, Curitiba - PR, 80420-090",
    mapUrl:
      "https://www.google.com/maps/place/Shopping+Pátio+Batel/@-25.4411,-49.2911,17z",
    image: CuritibaCite,
  },
  {
    city: "São Paulo",
    address:
      "Shopping Cidade São Paulo, Av. Paulista, 1230 - Bela Vista, São Paulo - SP, 01310-100",
    mapUrl:
      "https://www.google.com/maps/place/Shopping+Cidade+São+Paulo/@-23.5649,-46.6519,17z",
    image: AvenidaPaulista,
  },
  {
    city: "Milano",
    address:
      "Galleria Vittorio Emanuele II, Piazza del Duomo, 20123 Milano MI, Itália",
    mapUrl:
      "https://www.google.com/maps/place/Galleria+Vittorio+Emanuele+II/@45.4668,9.1898,17z",
    image: ViaMonte,
  },
];

const MapHome = () => {
  return (
    <Stack
      sx={(thema) => ({
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "auto",
        padding: "1rem",
        gap: "4rem",
       
        [thema.breakpoints.down(1320)]: {
          flexDirection: "column",
        },
      })}
    >
      {/* Lateral esquerda */}
      <Box
        sx={{
          width: "10rem",
          background: "#fff",
          borderRadius: "0.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#33bf30",
            fontWeight: "bold",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          OUR BRANCHES
        </Typography>
      </Box>

      {/* Lista de filiais */}
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={4}
        justifyContent="flex-start"
        alignItems="center"
        width="100%"
      >
        {branches.map((branch, index) => (
          <Stack
            key={index}
            direction="row"
            alignItems="center"
            sx={{


               background:
                "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              // background: "#1e1e1e",
              //  background: "rgba(77, 76, 76, 0.99)",
              borderRadius: "1rem",
              padding: "1rem",
              width: "100%",
              maxWidth: "500px",
            }}
          >
            {/* Mapa clicável */}
            <a
              href={branch.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  height: "8rem",
                  width: "8rem",
                  borderRadius: "1rem",
                  backgroundImage: `url(${branch.image})`,
                  cursor: "pointer",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  marginRight: "1rem",
                }}
              />
            </a>

            {/* Informações da filial */}
            <Box
              sx={{
                background: "#33bf30",
                borderRadius: "0.5rem",
                padding: "1rem",
                color: "#fff",
                flex: 1,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {branch.city.toUpperCase()}
              </Typography>
              <Typography variant="body2">{branch.address}</Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default MapHome;
