import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import {
  Recycling,
  Bolt,
  LocalShipping,
  ElectricBolt,
  PrecisionManufacturing,
} from "@mui/icons-material";

const data = {
  "Design e Origem": {
    icon: <PrecisionManufacturing fontSize="large" />,
    text: "Produtos desenvolvidos com responsabilidade ambiental desde a origem.",
  },
  "Produção": {
    icon: <Bolt fontSize="large" />,
    text: "Toda a eletricidade usada na produção é obtida de fontes renováveis.",
  },
  "Embalagem e Transporte": {
    icon: <LocalShipping fontSize="large" />,
    text: "Usamos embalagens recicláveis e transporte com menor impacto ambiental.",
  },
  "Uso": {
    icon: <ElectricBolt fontSize="large" />,
    text: "Produtos eficientes e duráveis, com menor consumo de energia.",
  },
  "Recuperação": {
    icon: <Recycling fontSize="large" />,
    text: "Programas de descarte consciente e reciclagem de eletrônicos.",
  },
};

const positions = [
  { top: "0%", left: "50%", transform: "translate(-50%, 0%)" }, // Design
  { top: "25%", right: "2%" },                                  // Produção
  { bottom: "12%", right: "0%" },                               // Embalagem
  { bottom: "0%", left: "50%", transform: "translate(-190%, 0%)" }, // Uso
  { top: "25%", left: "2%" },                                   // Recuperação
];

export default function CycleInfoResponsive() {
  const [selected, setSelected] = useState("Produção");
  const keys = Object.keys(data);

  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: 280, sm: 360, md: 480 },
        height: { xs: 280, sm: 360, md: 480 },
        margin: "auto",
        borderRadius: "50%",
        bgcolor: "#f9f9f9",
   
      
      }}
    >
      {/* Botões com ícones ao redor */}
      {keys.map((key, index) => (
        <Box
          key={key}
          sx={{
            position: "absolute",
            ...positions[index],
            transform: positions[index].transform || "translate(0, 0)",
            textAlign: "center",
          }}
        >
          <IconButton
            onClick={() => setSelected(key)}
            sx={{
              backgroundColor: selected === key ? "#33bf30" : "#e0e0e0",
              color: selected === key ? "#fff" : "#444",
              "&:hover": {
                backgroundColor: "#33bf30",
                color: "#fff",
              },
              width: { xs: 48, sm: 56 },
              height: { xs: 48, sm: 56 },
            }}
          >
            {data[key].icon}
          </IconButton>
          <Typography
            variant="caption"
            sx={{
              mt: 1,
              display: "block",
              fontSize: { xs: "0.65rem", sm: "0.75rem" },
              color: '#33bf30'
            }}
          >
            {key}
          </Typography>
        </Box>
      ))}

      {/* Texto central */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "75%",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
            color: "#333",
          }}
        >
          {data[selected].text}
        </Typography>
      </Box>
    </Box>
  );
}
