

import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { StyleOrderClintVendas } from "./styleOrder";
import { GlobalContext } from "../../../contexto_global/useContextGlobal";

import foneBranco from "../../../imagens/fonegreen13.png";
import foneBranco12 from "../../../imagens/foneBranco01.png";
import foneBrango28 from "../../../imagens/foneblue1-removebg-preview.png";
import fonered020 from "../../../imagens/fonered020.png";
import ProductModal from "./newProductModal ";

const colorImages = {
  white: foneBranco,
  black: foneBranco12,
  red: foneBrango28,
  green: fonered020,
};

export const NewOrderVendas = ({ productName, price, icon, cartIcon }) => {
  const { carinho, setCarinho } = GlobalContext;
  const [iconColor, setIconColor] = useState("black");
  const [openModal, setOpenModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("white");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(colorImages[selectedColor]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setMainImage(colorImages[color]);
  };

  const handleQuantityChange = (type) => {
    setQuantity((prevQuantity) =>
      type === "increment"
        ? prevQuantity + 1
        : prevQuantity > 1
        ? prevQuantity - 1
        : 1
    );
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
    
      <StyleOrderClintVendas.orderitem>
       
        <Box onClick={() => setOpenModal(true)} sx={{ cursor: "pointer" }}>
          {React.cloneElement(icon, { style: { color: iconColor } })}
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "280px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
            }}
            src={mainImage}
            alt={productName}
          />
        </Box>
        <Box>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "1.2rem",
              // color: "#3ca63a",
              color: 'rgb(51, 191, 48)'
            }}
          >
            {productName}
          </h2>
          <p
            style={{
              fontWeight: 600,
              fontSize: "1.2rem",
              color: 'rgb(51, 191, 48)'
            }}
          >
            {price}
          </p>
        </Box>
        <Box
          onClick={() => setOpenModal(true)}
          sx={{
            position: "absolute",
            right: "0",
            bottom: "0",
            padding: "10px",
            bgcolor: "rgb(51, 191, 48)",
            color: "#fff",
            fontSize: "20px",
            borderRadius: "0.5rem 0 0.5rem 0",
            cursor: "pointer",
          }}
        >
          {cartIcon}
        </Box>
      </StyleOrderClintVendas.orderitem>

      {/* Modal para selecionar cor e quantidade */}
      <ProductModal
        openModal={openModal}
        handleClose={handleClose}
        mainImage={mainImage}
        selectedColor={selectedColor}
        handleColorSelect={handleColorSelect}
        quantity={quantity}
        handleQuantityChange={handleQuantityChange}
        colorImages={colorImages}
      />
   </>
  );
};
