import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MasonryImageList from "./meetTheTeam";
import minhaImagem from "../imagens/fpimag.png";
import CycleInfoMUIIcon from "./CycleInfoMUI";
import MissionVisionCard from "./MissionVision";
import TheEssence from "./Timeline";
import AboutDesignDeveloperSkill from "./TeamCard";
import Achievements from "./Achievements";
import ContactForm from "../contact/ContactForm";

const AlmadaWhiwaSana = () => {
  return (
    <>
      <Stack
        sx={{
          minHeight: "100vh",
          // bgcolor: "",

          width: "100%",

          gap: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "30px 2% 20px",
          transition: "3s ease-in-out",

          "@media only screen and (max-width: 800px)": {
            width: "100%",
            marginTop: "1.20rem",
            position: "relative",
          },

          // boxShadow: "1px 2px 11px 4px rgb(14 55 54 / 25%)",
          // transition: "0.5s",
          // width: "100%",
          // height: "100%",
          // maxHeight: "130vh",

          overflowY: "auto",
          overflowX: "auto",
          background:
            "linear-gradient(34deg, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 50%)",

          color: "white",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <Stack
            sx={(themeSizeForme) => ({
              flexDirection: { xs: "column", md: "row" },
              display: "flex",
              width: "100%",
              marginTop: '3rem',
              minHeight: { md: "100vh" }, // altura total só em telas md+
              alignItems: { md: "center" }, // opcional: alinha verticalmente
              justifyContent: "space-between", // ou "center", depende do layout
              padding: "2rem",
              gap: "1rem",

              [themeSizeForme.breakpoints.down(900)]: {
                padding: "0.1rem",
              },
            })}
          >
            <Stack
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                
                width: {
                  xs: "100%",
                  md: "45%",
                },
                bgcolor: "ActiveBorder",
              }}
            >
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
                <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
                  Informações da empresa
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
                  marginBottom: "1rem",
                  [theme.breakpoints.down(800)]: {
                    fontSize: "1.2rem",
                    fontWeight: "700",
                  },
                })}
              >
                Nossa missão e nossos valores
              </Typography>

              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  textAlign: "left",
                }}
              >
                Mais do que produtos, entregamos confiança. Aqui, cada
                eletrônico é escolhido para facilitar seu dia a dia e
                transformar sua rotina com qualidade, velocidade e segurança.
              </Typography>
            </Stack>

            <Box
              sx={{
                position: "relative",

                display: "flex",
                flexDirection: {
                  xs: "row", // horizontal em telas pequenas
                  md: "column", // vertical em telas maiores
                },
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",

                width: {
                  xs: "100%", // largura total em telas pequenas
                  md: "3%", // largura de 3% em telas maiores
                },
                height: {
                  xs: "20px", // altura fixa em telas pequenas
                  md: "100%", // altura total em telas maiores
                },
              }}
            >
              {/* Linha esquerda/vertical */}
              <Box
                sx={{
                  width: {
                    xs: "45%", // Largura em telas pequenas
                    md: "2px", // Largura em telas médias e maiores
                  },
                  height: {
                    xs: "2px", // Altura em telas pequenas
                    md: "250px", // Altura em telas médias e maiores
                  },
                  background: {
                    xs: "linear-gradient(to left, #33BF30, transparent)",
                    md: "linear-gradient(to top, #33BF30, transparent)",
                  },
                }}
              />

              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#33BF30",
                  fontSize: "1rem",
                }}
              >
                ou
              </Typography>

              {/* Linha direita/vertical */}
              <Box
                sx={{
                  width: {
                    xs: "45%", // Largura em telas pequenas
                    md: "2px", // Largura em telas médias e maiores
                  },
                  height: {
                    xs: "2px", // Altura em telas pequenas
                    md: "250px", // Altura em telas médias e maiores
                  },
                  background: {
                    xs: "linear-gradient(to right, #33BF30, transparent)",
                    md: "linear-gradient(to bottom, #33BF30, transparent)",
                  },
                }}
              />
            </Box>
            <Stack
              sx={{
                display: "flex",
                alignItems: "center",

                justifyContent: "center",
                width: {
                  xs: "100%",
                  md: "45%",
                },
                bgcolor: "ActiveBorder",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "auto",
                }}
              >
                <MasonryImageList />
              </Box>
            </Stack>
          </Stack>

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
              height: "240px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginBottom: "1rem",

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
                textAlign: "left",
                gap: "10px",
                flex: "1",
                [theme.breakpoints.down(800)]: {
                  width: "100%",
                  height: "auto",
                  padding: "5px",
                },
              })}
            >
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
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "1.2rem",
                    color: "#33bf30",
                  }}
                >
                  Nossa História
                </Typography>
              </Box>

              <Typography
                sx={{
                  width: "100%",
                  color: "rgb(238, 230, 230)",
                  fontSize: "16px",

                  fontWeight: "600",
                  "-webkit-font-smoothing": "antialiased",
                  margin: "10px 0",
                }}
              >
                Tudo começou com um propósito simples: tornar a tecnologia
                acessível, confiável e presente na vida das pessoas. Criamos
                nossa loja movidos pela paixão por eletrônicos e pelo
                compromisso com a qualidade e o atendimento. A cada produto
                entregue, a nossa missão se renova: conectar pessoas ao que há
                de melhor, com responsabilidade, transparência e carinho.
              </Typography>
            </Stack>
          </Stack>

          <Box
            sx={{
              width: "100%",
              height: "auto",
              marginTop: "3rem",
            }}
          >
            <CycleInfoMUIIcon />
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "auto",
              marginTop: "3rem",
            }}
          >
            <MissionVisionCard />
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "auto",
              marginTop: "3rem",
            }}
          >
            <TheEssence />
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "auto",
              marginTop: "3rem",
            }}
          >
            <AboutDesignDeveloperSkill />
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

          <Box
            sx={{
              width: "100%",
              height: "auto",
              marginTop: "3rem",
            }}
          >

          <Achievements />

          </Box>
        </Stack>



          

        <ContactForm/>
      </Stack>
    </>
  );
};

export default AlmadaWhiwaSana;
