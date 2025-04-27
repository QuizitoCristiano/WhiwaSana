import React, { useContext } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { GlobalContext } from "../../contexto_global/useContextGlobal";

const CardItem = ({ item }) => {
  const {
    adicionarNovoItem,
    favoriteItem,
    adicionarNovosItenfavoritos
  } = useContext(GlobalContext);
  
  return (
    <Stack
      sx={(temaSize) => ({
        background:
          "linear-gradient(135deg, rgba(138, 137, 137, 0.1), rgba(133, 128, 128, 0.43))",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",

        // backgroundColor: "white",
        borderRadius: "10px",
        textAlign: "center",
        overflow: "hidden",
        boxShadow: "0 0 30px rgba(71, 71, 71, 0.1)",
        maxWidth: "300px",
        width: "100%", // Ajuste o tamanho máximo do card
        height: "auto", // Permite que a altura se ajuste automaticamente
        transition: "0.8s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)", // Leve aumento ao passar o mouse
        },

        [temaSize.breakpoints.down(800)]: {
          maxWidth: "100%",
        },
      })}
    >
      <Box
        sx={(theme) => ({
          background:
            "linear-gradient(135deg, rgba(138, 137, 137, 0.1), rgba(133, 128, 128, 0.43))",

          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",

          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // background: "rgb(231, 238, 252)",

          padding: "20px",
          height: "200px",
          [theme.breakpoints.down("sm")]: {
            padding: "5px",
            height: "150px", // ou o tamanho que você quiser no mobile
          },

          [theme.breakpoints.down(400)]: {
            height: "200px", // ou o tamanho que você quiser no mobile
          },
        })}
      >
        <img
          style={{
            maxWidth: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          src={item.imageOne}
          alt={item.title}
        />
        <Button
           onClick={() => adicionarNovosItenfavoritos(item)}
          sx={{
            background: "transparent", // Fundo transparente
            border: "1px solid rgba(255, 255, 255, 0.2)", // Borda sutil
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "5px",
            minWidth: "32px",
            minHeight: "32px",
            cursor: "pointer",
            position: "absolute",
            top: "8px",
            right: "8px",
            zIndex: "10",
            backdropFilter: "blur(5px)", // Efeito vidro fosco (opcional)
            transition: "all 0.3s ease-in-out", // Transição suave ao passar o mouse
            "&:hover": {
              background: "rgba(255, 255, 255, 0.1)", // Leve destaque ao passar o mouse
            },
          }}
        >
          {favoriteItem.some((fav) => fav.id === item.id) ? (
            <FavoriteIcon sx={{ fontSize: "1.2rem", color: "#33bf30" }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: "1.2rem", color: "#33bf30" }} />
          )}
        </Button>
      </Box>
      <Box
        sx={{
          textAlign: "left",
          padding: "10px",
        }}
      >
        <Typography
          sx={(theme) => ({
            color: "#33bf30",
            fontWeight: 600,
            fontSize: "1.2rem",
            marginBottom: "8px",
            [theme.breakpoints.down("sm")]: {
              fontSize: "1rem",
            },
          })}
        >
          {item.title}
        </Typography>

        <Typography
          sx={{
            color: "rgb(247, 239, 239)",
            fontSize: "15px",
            fontWeight: "400",
            marginBottom: "8px",
          }}
        >
          {item.description}
        </Typography>
        <Typography
          sx={{
            color: "rgb(194, 183, 183)",
            fontSize: "18px",
            fontWeight: "400",
            marginBottom: "8px",
          }}
        >
          R$ {item.price}
        </Typography>
        <Button
          sx={{
            color: "white",
            height: "2.5rem",
            width: "7rem",
            borderRadius: "5px",
            fontSize: "12px",
            cursor: "pointer",
            background: "#33bf30",
            outline: "none",
            border: "none",
          }}
          onClick={() => adicionarNovoItem(item)}
        >
          Comprar
        </Button>
      </Box>
    </Stack>
  );
};

export default CardItem;
