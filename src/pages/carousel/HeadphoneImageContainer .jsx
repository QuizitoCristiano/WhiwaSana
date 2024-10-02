

// export default HeadphoneImageContainer;




import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import "./carousel.css";

import foneBranco1 from "../../imagens/foneBranco01.png";
import foneBranco12 from "../../imagens/foneBrango28.png";
import foneBranco13 from "../../imagens/foneBranco13.png";
import foneBranco11 from "../../imagens/foneBranco11.png";

import Fone4 from "../../imagens/fone1.png";
import fonepreto03 from "../../imagens/fonepreto03.png";
import fonepreto21 from "../../imagens/fonepreto21.png";
import fonepreto22 from "../../imagens/fonepreto22.png";

import FineRed from "../../imagens/foneRed1.png";
import fonered020 from "../../imagens/fonered020.png";
import foneRed21 from "../../imagens/foneRed21.png";
import fonered25 from "../../imagens/fonered25.png.png";

import airpods from "../../imagens/fonegreen2.png";
import fonegreen13 from "../../imagens/fonegreen13.png";
import foneGreen11 from "../../imagens/foneGreen11.png";
import fonegreen23 from "../../imagens/fonegreen23.png";

const HeadphoneImageContainer = ({ images, setMainImage }) => {
  return (
    <Box
      sx={{
        color: 'white',
        fontSize: '1.5rem',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        height: '100%',
        width: '150px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        '& img': {
          maxWidth: '100%',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          borderRadius: '10px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0 0 10px 2px #33bf30',
            border: '2px solid #33bf30'
          }
        },
        '@media (max-width: 1000px)': {
          width: '80px',
          height: '100%',
        }
      }}
    >
      {images.map((img, index) => (
        <Box key={index} sx={{
          bgcolor: '#343534',
          padding: '5px',
          width: '80px',
          height: '80px',
          borderRadius: '15px',
        }}>
          <img src={img} alt="Headphone" onClick={() => setMainImage(img)} />
        </Box>
      ))}
    </Box>
  );
};

export const ControlledCarousel = () => {
  const [headphoneColor, setHeadphoneColor] = useState("white");
  const [mainImage, setMainImage] = useState(foneBranco1);

  const colorImages = {
    white: [foneBranco1, foneBranco12, foneBranco13, foneBranco11],
    black: [Fone4, fonepreto03, fonepreto21, fonepreto22],
    red: [FineRed, fonered020, foneRed21, fonered25],
    green: [airpods, fonegreen13, foneGreen11, fonegreen23],
  };

  const trocaCorParaBranco = () => {
    setHeadphoneColor("white");
    setMainImage(foneBranco1);
  };

  const trocaCorParaPreto = () => {
    setHeadphoneColor("black");
    setMainImage(Fone4);
  };

  const trocaCorParaRed = () => {
    setHeadphoneColor("red");
    setMainImage(FineRed);
  };

  const trocaCorParaVerde = () => {
    setHeadphoneColor("green");
    setMainImage(airpods);
  };

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        height: "100%",
        width: "100%",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          padding: "10px",
          gap: "10px",
          height: "100%",
          width: "100%",
      
        }}
      >
        <Box sx={{
           width: '350px', 
           height: '350px',
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           '@media (max-width: 1000px)': { 
             width: '250px',
             height: '250px',
           }
           
        }}>
           <img 
            src={mainImage} 
            alt="Main Headphone"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
          />
        </Box>

        <HeadphoneImageContainer images={colorImages[headphoneColor]} setMainImage={setMainImage} />
      </Stack>
      <Box className="flot"></Box>

      <div className="buttons">
        <button className="green-button" onClick={trocaCorParaVerde}></button>
        <button className="black-button" onClick={trocaCorParaPreto}></button>
        <button className="white-button" onClick={trocaCorParaBranco}></button>
        <button className="red-button" onClick={trocaCorParaRed}></button>
      </div>
    </Stack>
  );
};

export default ControlledCarousel;
