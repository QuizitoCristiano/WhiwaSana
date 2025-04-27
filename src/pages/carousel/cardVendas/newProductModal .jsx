import React from 'react';
import { Box, Button, Modal } from '@mui/material';


const ProductModal = ({
  openModal,
  handleClose,
  mainImage,
  selectedColor,
  handleColorSelect,
  quantity,
  handleQuantityChange,
  colorImages,
}) => (
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
        {Object.keys(colorImages).map((color) => (
          <Button
            key={color}
            onClick={() => handleColorSelect(color)}
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
              src={colorImages[color]}
              alt={color}
              style={{ width: "50px", height: "50px" }}
            />
          </Button>
        ))}
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
);

export default ProductModal;
