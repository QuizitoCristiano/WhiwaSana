import React, { useEffect, useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";







const skills = [
    {
      category: "Logística & Garantias",
      skills: [
        { name: "Frete rápido e seguro", percentage: 100 },
        { name: "Garantia estendida", percentage: 90 },
        { name: "Envio imediato para pedidos confirmados até às 14h", percentage: 85 },
        { name: "Rastreamento em tempo real", percentage: 80 },
        { name: "Embalagem reforçada para transporte seguro", percentage: 85 },
      ],
    },
    {
      category: "Atendimento & Condições de Compra",
      skills: [
        { name: "Equipe de suporte especializada", percentage: 90 },
        { name: "Atendimento personalizado (WhatsApp, telefone)", percentage: 100 },
        { name: "Parcelamento facilitado de 1 a 12 vezes", percentage: 85 },
        { name: "Produtos de marcas renomadas e originais", percentage: 80 },
        { name: "Suporte técnico gratuito por 30 dias após a compra", percentage: 85 },
      ],
    },
  ];
  

const ProgressBar = ({ name, percentagetex = "", percentage, delay }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(percentage);
    }, delay);

    return () => clearTimeout(timeout);
  }, [percentage, delay]);

  return (
    <Box sx={{ width: "100%", my: 2 }}>
      <Typography sx={{ color: "#fff", marginBottom: "2rem" }}>
        {name}
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "10px",
          background: "#222",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${progress}%`,
            height: "100%",
            background: "#33bf30",
            borderRadius: "5px",
            transition: "width 2s ease-in-out",
          }}
        />
      </Box>
    </Box>
  );
};


const AboutDesignDeveloperSkill = () => {
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        flexDirection: "row",
        gap: "2rem",

        padding: "1rem",
        borderRadius: "10px",
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
        },
        "@media (max-width: 1001px)": {
          flexDirection: "column",
          padding: "1rem",
       
        },
        "@media (max-width: 480px)": {
          padding: "0rem",
          gap: "0.3rem",
     
        },
      }}
    >
      {skills.map((section, index) => (
        <Stack
          key={index}
          sx={{
            width: "50%",
            minWidth: "300px",
            "@media (max-width: 1291px)": {
              flexDirection: "column",
              margin: "1rem",
              padding: "1rem",
              bgcolor: "",
              width: "100%",
            },

            "@media (max-width: 820px)": {
              flexDirection: "column",
              margin: "1rem",
              padding: "1rem",
          
              width: "100%",
            },

            "@media (max-width: 480px)": {
              padding: "0rem",
              margin: "0.3rem",
              gap: "0.3rem",
              width: "100%",
            
            },
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: "1.5rem",
              fontWeight: "bold",
              mb: 2,
            }}
          >
             {section.category}
          </Typography>
          
          {section.skills.map((skill, i) => (
            <ProgressBar
              key={i}
              name={skill.name}
              percentage={skill.percentage}
              delay={i * 500}
            />
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

export default AboutDesignDeveloperSkill;
