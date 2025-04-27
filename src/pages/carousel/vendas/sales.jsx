import React, { useState } from 'react';
import { Stack, Box, Button } from '@mui/material';
import airpods from "../../../imagens/fonegreen2.png";
import fonegreen23 from "../../../imagens/fonegreen23.png";
import foneGreen11 from "../../../imagens/foneGreen11.png";
import foneBrango28 from "../../../imagens/foneBrango28.png";
import fonepreto112 from "../../../imagens/fonepreto112.png";
import fonegreen13 from "../../../imagens/fonegreen13.png";
import "./SalesStyle.css";

const initialSlides = [
  {
    nome: "slideshow",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.",
    image: airpods,
  },
  {
    nome: "Moçambique",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.",
    image: fonegreen23,
  },
  {
    nome: "Australia",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.",
    image: foneGreen11,
  },
  {
    nome: "Tanzania",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.",
    image: foneBrango28,
  },
  {
    nome: "Chile",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.",
    image: fonepreto112,
  },
  {
    nome: "Finland",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.",
    image: fonegreen13,
  },
];

const NewSales = () => {
  const [slides, setSlides] = useState(initialSlides);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleSlideClick = (index) => {
    const selectedSlide = slides[index];
    const updatedSlides = slides.filter((_, i) => i !== index);
    setSlides([selectedSlide, ...updatedSlides]);
    setCurrentSlideIndex(0);
  };

  const handleNext = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <Stack>
    <Stack className="container">
      <Box
        className="slide"
        sx={{
          backgroundImage: `url(${slides[currentSlideIndex].image})`,
          height: '400px', // ajuste o tamanho conforme necessário
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: '20px',
        }}
      >
        <Box className="content">
          <Box className="nome">{slides[currentSlideIndex].nome}</Box>
          <Box className="descricao">{slides[currentSlideIndex].descricao}</Box>
          <Button
            sx={{
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "uppercase",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
              bgcolor: "#fff",
              color: "#000",
            }}
          >
            Ver Mais
          </Button>
        </Box>
      </Box>

      <Box className="slide">
        {slides.map((slide, index) => (
          <Box
            key={index}
            className="item"
            sx={{
              backgroundImage: `url(${slide.image})`,
              height: '100px', // ajuste o tamanho conforme necessário
              width: '100px',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              margin: '10px',
              cursor: 'pointer',
            }}
            onClick={() => handleSlideClick(index)}
          >
            <Box className="content">
              <Box className="nome">{slide.nome}</Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Box className="controls">
        <Button className="prev" onClick={handlePrev}>
          <i className="fa-sharp fa-solid fa-arrow-left"></i>
        </Button>
        <Button className="next" onClick={handleNext}>
          <i className="fa-sharp fa-solid fa-arrow-right"></i>
        </Button>
      </Box>
    </Stack>
    </Stack>
  );
};

export default NewSales;
