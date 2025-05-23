import React from "react";
import Slider from "react-slick";
import { Box, Typography, Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import getPromocaoAtual from "./promoData"; // importa a função

const SlickCarousel = () => {
  const promocao = getPromocaoAtual();

  if (!promocao) return null; // segurança

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        padding: "10px 1% 20px",
        backgroundColor: "#fafafa",
      }}
    >
      <Slider {...settings}>
        {promocao.imagens.map((img, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              height: "400px",
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: 20,
                padding: 2,
                borderRadius: 1,
                background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                {promocao.mensagemTitulo}
              </Typography>
              <Typography variant="body2" mb={1}>
                {promocao.mensagemTexto}
              </Typography>
              <Button
                sx={{
                  background: "#33bf30",
                  color: "#fff",
                  padding: "1rem 3.9rem",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "0.20rem",
                  minWidth: "150px",
                  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.16)",
                  transition: "all 0.3s",
                  "&:hover": { background: "#3cb815" },
                  "&:disabled": { background: "#ccc" },
                  "@media (max-width: 900px)": {
                    minWidth: "100px",
                  },
                }}
              >
                Ver Mais
              </Button>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default SlickCarousel;
