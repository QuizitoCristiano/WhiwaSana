import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import newFoneOne from "../../imagens/relogioOferta6.png";

const ElectronicsItemOne = () => {
  return (
    <Stack
      sx={(theme) => ({
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 10px 40px rgba(176, 176, 176, 0.2)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "16px",
        padding: "2rem",
        width: "100%",
        height: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: "2rem",
        marginTop: "6rem",

        [theme.breakpoints.down(800)]: {
          flexDirection: "column",
          height: "auto",
        },

        "&:hover": {
          boxShadow: "0 10px 40px rgba(176, 176, 176, 0.3)",
          cursor: "pointer",
        },
      })}
    >
      <Box
        sx={(theme) => ({
          width: "calc(570px - 100px)",
          padding: "0 50px",
          height: "100%",
          background: "rgba(231, 238, 252)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "& img:hover": {
            cursor: "pointer",
            animation: "shake 0.8s linear infinite",
          },
          [theme.breakpoints.down(800)]: {
            width: "100%",
            height: "auto",
            padding: "5px",
            // background: "rgba(231, 238, 252)",
            borderRadius: "5px",
            // boxShadow: "0 10px 40px rgba(176, 176, 176, 0.0)",
            "& img:hover": {
              cursor: "pointer",
              animation: "shake 0.8s linear infinite",
            },
          },
        })}
      >
        <img
          src={newFoneOne}
          alt="Opa!"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <style>
        {`
    @keyframes shake {
      0% { transform: rotate(0deg); }
      25% { transform: rotate(3deg); }
      50% { transform: rotate(0deg); }
      75% { transform: rotate(-3deg); }
      100% { transform: rotate(0deg); }
    }
  `}
      </style>

      <Stack
        sx={(theme) => ({
          display: "flex",

          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
          padding: "0 80px",
          flex: "1",
          [theme.breakpoints.down(800)]: {
            width: "100%",
            height: "auto",
            padding: "5px",
          },
        })}
      >
        <Box sx={{ display: "flex", placeItems: "center", width: "100%" }}>
          <Box
            sx={{
              height: "4rem",
              width: "1.5rem",
              marginRight: "1.5rem",
              backgroundColor: "#33bf30",
              borderRadius: "20px",
            }}
          ></Box>
          <Typography
            sx={(theme) => ({
              // color: "rgb(64, 64, 64)",
              //  color:'#33bf30',
              color: "#fff",
              fontSize: "2rem",
              fontWeight: "600",
              lineHeight: "1.3",
              textAlign: "19px",

              [theme.breakpoints.down(800)]: {
                fontSize: "2rem",
                fontWeight: "600",
              },
            })}
          >
            Nova Coleção
          </Typography>
        </Box>

        <Typography
          sx={(theme) => ({
            color: "#fff",
            fontSize: "2.5rem",
            fontWeight: "600",
            lineHeight: "1.3",
            textAlign: "19px",
            marginBottom: "2rem",
            "-webkit-font-smoothing": "antialiased",
            [theme.breakpoints.down(800)]: {
              fontSize: "1.7rem",
              fontWeight: "600",
            },
          })}
        >
          Explore The World of Advanced Handwear
        </Typography>

        <Box>
          <Typography
            sx={{
              width: "100%",
              color: "rgb(110, 110, 110)",
              fontSize: "16px",

              fontWeight: "600",
              "-webkit-font-smoothing": "antialiased",
              margin: "10px 0",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            bibendum rhoncus ipsum pellentesque scelerisque. Donec eget purus
            felis. Vestibulum
          </Typography>

          <Button
            sx={{
              color: "white",
              height: "2.9rem",
              width: "8rem",
              borderRadius: "0px",
              fontSize: "12px",
              cursor: "pointer",
              background: "#33bf30",
              outline: "none",
              border: "none",
              marginBottom: "1rem",
            }}
            onClick={() => adicionarNovoItem(data)} // Função a ser definida
          >
            Compre agora
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default ElectronicsItemOne;
