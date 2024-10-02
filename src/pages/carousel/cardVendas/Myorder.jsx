import React, { useState } from "react";
import { Box, Button, Stack, Modal } from "@mui/material";
import { StyleOrderClintVendas } from "./styleOrder";
import { GlobalContext } from "../../../contexto_global/useContextGlobal";

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
  const { carinho, setCarinho } = GlobalContext;
  const [mapNewItem, setMapNewItem] = useState([""]);
  const [iconColor, setIconColor] = useState("black");
  const [openModal, setOpenModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("white");
  const [quantity, setQuantity] = useState(1);

  // Estado para a imagem principal do fone
  const [mainImage, setMainImage] = useState(colorImages[selectedColor]);

  const [isLiked, setIsLiked] = useState(false);

  // Função para trocar a imagem do fone conforme a cor selecionada
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
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          height: "100%",
          width: "100%",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            height: "100%",
            width: "100%",
            // bgcolor: 'green'
          }}
        >
          <Box>
            <h1
              style={{
                fontWeight: 800,
                fontSize: "2.2rem",
                color: "#3ca63a",
                textAlign: "center",
                margin: "20px 0",
              }}
            >
              Nossos Produtos Populares
            </h1>
            <Button
              sx={{
                backgroundColor: "#3ca63a",
                color: "#ffffff",
                border: "none",
                padding: "15px 20px",
                cursor: "pointer",
                borderRadius: "9px",
                "&:hover": {
                  backgroundColor: "#3ca63a",
                  color: "#ffffff",
                  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              O futuro é tudo bom vamos!
            </Button>
          </Box>

          <StyleOrderClintVendas.ordercontainer>
            {mapNewItem.map((index) => (
              <StyleOrderClintVendas.orderitem key={index}>
                <Box
                  onClick={() => setOpenModal(true)}
                  sx={{ cursor: "pointer" }}
                >
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
                    }}
                  >
                    {productName}
                  </h2>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "1.2rem",
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
            ))}
          </StyleOrderClintVendas.ordercontainer>
        </Stack>
      </Stack>

      {/* Modal */}
      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
           
            borderRadius: "15px",
            p: 4,
            boxShadow: "20px 20px 50px rgba(0, 0, 0, 0.9)",

            "@media (max-width: 750px)": {
              width: "97%",
            },
          }}
        >
          <h5
            style={{
              fontWeight: 800,
              fontSize: "18px",
              marginBottom: "20px",
              color: "rgb(51, 191, 48)",
            }}
          >
            Escolha a cor e quantidade do fone:
          </h5>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
              border: "2px solid #2e332e",
              boxShadow: "20px 20px 50px rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(20px)",
              borderRadius: "15px",
              width: "100%",
              backgroundColor: "#343534",
            }}
          >
            <Button
              onClick={() => handleColorSelect("green")}
              sx={{
                padding: "0",

                borderRadius: "15px",
                "&:hover": {
                  boxShadow: "1px 5px 20px #3ca63a",
                  border: "2px solid #3ca63a",
                },
              }}
            >
              <img
                src={fonered020}
                alt="Verde"
                style={{ width: "50px", height: "50px" }}
              />
            </Button>
            <Button
              onClick={() => handleColorSelect("red")}
              sx={{
                padding: "0",
                borderRadius: "15px",
                "&:hover": {
                  boxShadow: "1px 5px 20px #3ca63a",
                  border: "2px solid #3ca63a",
                },
              }}
            >
              <img
                src={foneBrango28}
                alt="Vermelho"
                style={{ width: "50px", height: "50px" }}
              />
            </Button>
            <Button
              onClick={() => handleColorSelect("black")}
              sx={{
                padding: "0",
                borderRadius: "15px",
                "&:hover": {
                  boxShadow: "1px 5px 20px #3ca63a",
                  border: "2px solid #3ca63a",
                },
              }}
            >
              <img
                src={foneBranco12}
                alt="Preto"
                style={{ width: "50px", height: "50px" }}
              />
            </Button>
            <Button
              onClick={() => handleColorSelect("white")}
              sx={{
                padding: "0",
                borderRadius: "15px",
                "&:hover": {
                  boxShadow: "1px 5px 20px #3ca63a",
                  border: "2px solid #3ca63a",
                },
              }}
            >
              <img
                src={foneBranco}
                alt="Branco"
                style={{ width: "50px", height: "50px" }}
              />
            </Button>
          </Box>
          <Box style={{ marginTop: "20px" }}>
            <Button
              sx={{
                backgroundColor: "#3ca63a",

                boxShadow: "20px 20px 50px rgba(0, 0, 0, 0.5)",
                borderRadius: "15px",
                color: "#fff",
                fontSize: "18px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#3ca63a",
                  color: "#ffffff",
                },
              }}
              onClick={() => handleQuantityChange("decrement")}
            >
              -
            </Button>
            <span style={{ margin: "0 10px" }}>{quantity}</span>
            <Button
              sx={{
                backgroundColor: "#3ca63a",

                boxShadow: "20px 20px 50px rgba(0, 0, 0, 0.5)",
                borderRadius: "15px",
                color: "#fff",
                fontSize: "18px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#3ca63a",
                  color: "#ffffff",
                },
              }}
              onClick={() => handleQuantityChange("increment")}
            >
              +
            </Button>
          </Box>
          <Button
            sx={{
              marginTop: "20px",

            
              borderRadius: "15px 0px 15px 0px",

              bgcolor: "rgb(51, 191, 48)",
              color: "#fff",
              boxShadow: "20px 20px 50px rgba(0, 0, 0, 0.4)",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#3ca63a",
                color: "#ffffff",
              },
            }}
            onClick={handleClose}
          >
            Adicionar ao Carrinho
          </Button>
        </Box>
      </Modal>
    </>
  );
};
