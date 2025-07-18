import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import BluetoothAudioIcon from "@mui/icons-material/BluetoothAudio";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";

const GalleryItems = [
  {
    icons: [StarIcon, StarIcon, StarIcon, StarHalfIcon, StarOutlineIcon], // 5 estrelas cheias
    title: "Avaliação dos clientes",
    textp: `Qualidade, bom preço e atendimento que faz a diferença. Na WhiwaSana,
     o cliente vem primeiro!
      `,
  },
  {
    icons: [BatteryChargingFullIcon],
    title: "Baderia Incomparável",
    textp: `Energia duradoura para te acompanhar o dia todo. Liberdade sem se 
    preocupar com recargas!
      `,
  },
  {
    icons: [BluetoothAudioIcon],
    title: "Bluetooth",
    textp: `Tecnologia sem fio que garante conexão rápida, estável e prática com seus dispositivos.
     Liberdade para curtir sua música onde quiser.
      `,
  },
 {
  icons: [HeadsetMicIcon],
  title: "Ouça som sem parar",
  textp: `Desfrute de áudio claro e potente o dia todo.
     Conecte e curta sua playlist sem interrupções.`,
}
];

export const Testimonials = () => {
  return (
    <Stack
      sx={{
        width: "100%",

        alignItems: "center",

        // background: '#343534',
      }}
    >
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
          display: "grid",

          gridTemplateColumns: "repeat(4, 1fr)", // 3 colunas padrão
          gap: "20px",
          width: "100%",
          marginBottom: "1rem",

          maxWidth: "1500px", // Define um limite máximo
          [theme.breakpoints.down("md")]: {
            gridTemplateColumns: "repeat(3, 1fr)", // 2 colunas em telas médias
          },
          [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "repeat(2, 1fr)", // 1 coluna no mobile
          },
        })}
      >
        {GalleryItems.map((item, index) => (
          <Box
            key={index}
            sx={(theme) => ({
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              width: "100%",
              padding: "1rem",
              height: "auto",
              display: "flex",
              alignItems: "center",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.03)",
                cursor: "pointer",
              },

              [theme.breakpoints.down(700)]: {
                width: "100%",
                height: "auto",
                fontSize: "0.5rem",
                padding: "0.2rem",
              },
            })}
          >
            {/* Imagem */}

            {/* Texto */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "20px",
                flexGrow: 1,
              }}
            >
              <Box
                sx={{
                  //   backgroundColor: "rgba(231, 238, 232, 0.2)",
                  display: "flex",

                  alignItems: "center",
                  padding: "10px",
                  width: "90%",
                  height: "auto",
                }}
              >
                {item.icons.map((IconComponent, idx) => (
                  <IconComponent
                    key={idx}
                    sx={(theme) => ({
                      //   color: "#FFD700",
                      color: "#33BF30",
                      fontSize: "2rem",

                      [theme.breakpoints.down(700)]: {
                        fontSize: "1.3rem",
                      },
                    })}
                  />
                ))}
              </Box>

              <Typography
                sx={{
                  //   color: "rgb(64, 64, 64)",
                  color: "#fff",

                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  fontSize: { xs: "0.8rem", md: "1.3rem" }, // Ajuste de tamanho
                }}
              >
                {item.title}
              </Typography>
              <Typography
                sx={{
                  color: "rgb(137, 137, 137)",
                  marginBottom: "0.5rem",

                  fontSize: { xs: "0.7rem", md: "0.8rem" }, // Ajuste de tamanho
                }}
              >
                {item.textp}
              </Typography>
            </Box>
          </Box>
        ))}
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
    </Stack>
  );
};
