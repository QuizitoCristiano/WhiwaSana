import {
  Stack,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState, useContext } from "react";
import { GlobalContext } from "../contexto_global/useContextGlobal";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Gradient } from "@mui/icons-material";
const WishlistItem = () => {
  const {
    favoriteItem: wishlistItems,

    removerFavorito,
    adicionarNovoItem,
  } = useContext(GlobalContext);

  const [removedItemIndex, setRemovedItemIndex] = useState(null);

  const scheduleWishlistRemoval = (index) => {
    setRemovedItemIndex(index);
    const timeoutId = setTimeout(() => {
      removerFavorito(index); // Remover item após 2 segundos
      setRemovedItemIndex(null);
    }, 2000);

    // Storing the timeout ID to clear if necessary
    return () => clearTimeout(timeoutId);
  };

  const displayWishlistItems = () => {
    if (!Array.isArray(wishlistItems) || wishlistItems.length === 0) {
      return <Typography>Nenhum item favorito adicionado.</Typography>;
    }

    return wishlistItems.map((produto, index) => (
      <Stack
        key={produto.id ?? index}
        sx={{
          width: "100%",
          bgcolor: removedItemIndex === index ? "rgba(255, 0, 0, 0.3)" : "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: '1rem',
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
            padding: '0.20rem',
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
                padding: '0.10rem',
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
                <Typography sx={{ fontWeight: 700, fontSize: "12px", color: "#000", }}>
                  Nome: {produto.title}
                </Typography>

                <Typography
                  sx={{
                   
                    fontSize: "0.70rem",
                    marginTop: "0.1rem",
                    fontWeight: 600,
                    color: "#000",
                  }}
                >
                  Preço: R$ {produto.price}
                </Typography>
              </Box>
            </Box>

            {/* Mensagem de aviso */}
            {removedItemIndex === index && (
              <Typography
                sx={{
                  mt: 1,
                  color: "#ff6b6b",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  textAlign: "center",
                  background: "#fff3f3",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  width: "fit-content",
                }}
              >
                Este item será removido em 2 segundos...
              </Typography>
            )}
          </Box>

          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              flexDirection: "column",
              m: 1,
              gap: 1,
            }}
          >
            <DeleteIcon
              onClick={() => scheduleWishlistRemoval(index)}
              sx={{ color: "red", fontSize: "1.5rem", cursor: "pointer" }}
            />

            <ShoppingCartIcon
              onClick={() => { adicionarNovoItem(produto); // Adiciona ao carrinho
                removerFavorito(index);  // Remove dos favoritos imediatamente
              }}
              sx={{
                color: "#33bf30",
                fontSize: "1.50rem",
                textTransform: "none",
                "&:hover": {
                  color: "#3ca63a",
                },
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    ));
  };

  const totalWishlist = wishlistItems
    ?.reduce((acc, item) => {
      return acc + item.price * item.quantidade;
    }, 0)
    .toFixed(2);

  return (
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
        variant="h4"
        sx={{
          color: "rgb(64, 64, 64)",
          fontSize: "1.4rem",
          fontWeight: "700",
          lineHeight: "1.3",
          textAlign: "left",
          marginBottom: "0.2rem",
        }}
      >
        | Meus Favoritos
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
        {displayWishlistItems()}
      </Stack>
    </Stack>
  );
};

export default WishlistItem;
