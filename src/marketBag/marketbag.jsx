import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./newStyle.css";
import { GlobalContext } from "../contexto_global/useContextGlobal";

const BagMarket = ({
 
  setSacola,
  
}) => {
  const { carinho, setCarinho } = useContext(GlobalContext);
  const [sacolaAberta, setSacolaAberta] = useState(false);
  const [removItemArray, setRemovItemArray] = useState(null);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // Novo estado para armazenar a mensagem

  const toggleWishlistModal = () => {
    setIsWishlistModalOpen((prev) => !prev);
    toggleSacola(true);
  };

  const toggleSacola = () => {
    setSacolaAberta(!sacolaAberta);
    if (setSacola) {
      setSacola(false);
    }
  };

  // Função para tratar clique do botão "Finalizar Compra"
  const handleFinalizarCompra = () => {
    if (carinho.length === 0) {
      setModalMessage("Primeiro deve Adicionar item no carrinho.");
    } else {
      setModalMessage("Compra finalizada com sucesso!");
    }
    setIsWishlistModalOpen(true);
  };

  const adicionarItem = (index) => {
    const novoItemCarinho = [...carinho];
    novoItemCarinho[index].quantidade++;
    setCarinho(novoItemCarinho);
  };

  const removerItemIcon = (index) => {
    setRemovItemArray(index);
    setTimeout(() => {
      const novoItemCarinho = carinho.filter((_, i) => i !== index); 
      setCarinho(novoItemCarinho);
      setRemovItemArray(null);
    }, 2000);
  };

  const removerItem = (index) => {
    const novoItemCarinho = [...carinho];
    if (novoItemCarinho[index].quantidade > 1) {
      novoItemCarinho[index].quantidade--;
    } else {
      if (window.confirm("Tem certeza que deseja remover este item?")) {
        novoItemCarinho.splice(index, 1);
      }
    }

    setCarinho(novoItemCarinho);
  };

  const renderizarItensCarrinho = () => {
    return carinho.map((produto, index) => (
      <>
        <Stack
          key={index}
          sx={{
            width: "100%",
            bgcolor: removItemArray === index ? "rgba(255, 0, 0, 0.3)" : "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "1rem",
            borderRadius: "10px",
            margin: "0px 5px 5px 0px",
            boxShadow: "1px 2px 11px 4px rgb(14 55 54 / 75%)",

            gap: "2rem",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              flexDirection: "row",
              width: "100%",
              // background: "#470456",
              padding: "0.20rem",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyItems: "center",
                  flexDirection: "row",
                  width: "100%",
                  margin: "5px",

                  borderRadius: "10px",
                  padding: "0.10rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2px",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    src={produto.imageOne}
                    alt=""
                  />
                </Box>

                <Box
                  sx={(theme) => ({
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "5px",
                    flexGrow: 1,

                    borderRadius: "0 10px 10px 0",
                    [theme.breakpoints.down(900)]: {
                      paddingLeft: "4px",
                    },
                  })}
                >
                  <Typography
                    sx={{ fontWeight: 700, fontSize: "12px", color: "#000" }}
                  >
                    Nome: {produto.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.70rem",
                      marginTop: "0.1rem",
                      fontWeight: 700,
                      color: "#000",
                    }}
                  >
                    Preço: R$ {produto.price}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.70rem",
                      marginTop: "0.1rem",
                      fontWeight: 700,
                      color: "#000",
                    }}
                  >
                    Quantidade: {produto.quantidade}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                flexDirection: "column",
                margin: "5px",
                gap: "3px",
              }}
            >
              <Box>
                <DeleteIcon
                  onClick={() => removerItemIcon(index)}
                  sx={{
                    color: "red",
                    fontWeight: 800,
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <button
                  className="buttonQuntidade"
                  onClick={() => adicionarItem(index)}
                >
                  +
                </button>
                <button
                  className="buttonQuntidade"
                  onClick={() => removerItem(index)}
                >
                  -
                </button>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </>
    ));
  };

  return (
    <>
      <Stack
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "rgb(64, 64, 64)",
            fontSize: "1.4rem",
            fontWeight: "700",
            lineHeight: "1.3",
            textAlign: "left",
            marginBottom: "0.2rem",
          }}
        >
          | Minha Sacola de Compras
        </Typography>

        <Stack
          sx={{
            width: "100%",
            margin: "10px",
            height: "72%",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "column",
            overflowY: "auto",
            padding: "10px",
            overflowX: "hidden",
          }}
        >
          {renderizarItensCarrinho()}
        </Stack>

        <Box
          sx={{
            width: "100%",
            margin: "10px",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",

            marginBottom: "0px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "0.90rem",
              color: "var(--light-orange-color)",
            }}
          >
            Total:{" "}
            {carinho
              .reduce((total, item) => {
                const preco = parseFloat(
                  String(item.price)
                    .replace("R$", "")
                    .replace(".", "")
                    .replace(",", ".")
                    .trim()
                );
                const quantidade = Number(item.quantidade) || 1;
                return total + (isNaN(preco) ? 0 : preco * quantidade);
              }, 0)
              .toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
          </Typography>

          <Button
            sx={{
              color: "white",
              border: "none",
              padding: "10px 15px",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "0.60rem",
              fontWeight: "600",
              bgcolor: "var(--green-color)",

              ":hover": {
                backgroundColor: "var(--orange-color)",
              },
            }}
            onClick={handleFinalizarCompra}
          >
            Finalizar Compra
          </Button>
        </Box>
      </Stack>

      {/* Modal de confirmação */}
      <Dialog open={isWishlistModalOpen} onClose={toggleWishlistModal}>
        <DialogTitle sx={{ fontWeight: 700 }}>{modalMessage}</DialogTitle>
        <DialogActions>
          <Button sx={{
            color: "white",
            border: "none",
            padding: "10px 15px",
            cursor: "pointer",
            borderRadius: "5px",
            fontSize: "0.60rem",
            fontWeight: "600",
            bgcolor: "var(--green-color)",

            ":hover": {
              backgroundColor: "var(--orange-color)",
            },
          }} onClick={toggleWishlistModal} autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BagMarket;
