import React, { useState, useContext } from "react";
import { Box, Button, Stack, Modal } from "@mui/material";
import { StyleOrderClintVendas } from "./styleOrder";
import { GlobalContext } from "../../contexto_global/useContextGlobal"; // Import GlobalContext

// Importe as imagens
import foneBranco from "../../../imagens/fonegreen13.png";
import foneBranco12 from "../../../imagens/foneBranco01.png";
import foneBrango28 from "../../../imagens/foneblue1-removebg-preview.png";
import fonered020 from "../../../imagens/fonered020.png";

// Mapeie as imagens conforme as cores
const colorImages = {
  white: foneBranco,
  black: foneBranco12,
  red: foneBrango28,
  green: fonered020,
};

export const NewOrderVendas = ({
  imagenItem,
  productName,
  price,
  icon,
  cartIcon,
}) => {
  const { carinho, setCarinho } = useContext(GlobalContext); // Use GlobalContext
  const [mapNewItem, setMapNewItem] = useState([""]);
  const [iconColor, setIconColor] = useState("black");
  const [openModal, setOpenModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("white");
  const [quantity, setQuantity] = useState(1);

  // Estado para a imagem principal do fone
  const [mainImage, setMainImage] = useState(colorImages[selectedColor]);

  // Função para trocar a imagem do fone conforme a cor selecionada
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setMainImage(colorImages[color]);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const addToCart = () => {
    const newItem = {
      nome: productName,
      price: price,
      quantidade: quantity,
      color: selectedColor,
    };

    const existingItemIndex = carinho.findIndex(
      (item) => item.nome === productName && item.color === selectedColor
    );

    if (existingItemIndex !== -1) {
      const novoCarrinho = [...carinho];
      novoCarrinho[existingItemIndex].quantidade += quantity;
      setCarinho(novoCarrinho);
    } else {
      setCarinho([...carinho, newItem]);
    }

    handleCloseModal();
  };

  return (
    <Stack>
      <Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            onClick={handleOpenModal}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            {imagenItem}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "white",
                borderRadius: "50%",
                padding: "5px",
              }}
            >
              {icon}
            </Box>
          </Box>
        </Box>

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={StyleOrderClintVendas.modal}>
            <Box sx={StyleOrderClintVendas.header}>
              <h2>Detalhes do Produto</h2>
            </Box>
            <Box sx={StyleOrderClintVendas.content}>
              <img
                src={mainImage}
                alt={productName}
                style={{ width: "100%", maxHeight: "400px" }}
              />
              <Box>
                <h3>{productName}</h3>
                <p>Preço: R$ {price}</p>
                <Box>
                  <label htmlFor="quantity">Quantidade: </label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    min="1"
                    style={{ width: "50px" }}
                  />
                </Box>
                <Box>
                  <label>Cor: </label>
                  <select
                    value={selectedColor}
                    onChange={(e) => handleColorSelect(e.target.value)}
                  >
                    <option value="white">Branco</option>
                    <option value="black">Preto</option>
                    <option value="red">Vermelho</option>
                    <option value="green">Verde</option>
                  </select>
                </Box>
              </Box>
              <Button onClick={addToCart} variant="contained">
                Adicionar ao Carrinho
              </Button>
            </Box>
          </Box>
        </Modal>
      </Stack>
    </Stack>
  );
};
