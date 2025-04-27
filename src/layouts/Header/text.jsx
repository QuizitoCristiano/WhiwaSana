import { useContext, useState } from "react";
import { Stack, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import { GlobalContext } from "../contexto_global/useContextGlobal";
import WishlistItem from "./WishlistItem";

const Favorito = () => {
  const { favoriteItem, setFavoriteItem } = useContext(GlobalContext);
  const [listaFavoritos, setListaFavoritos] = useState(false);

  const handleAdicionarFavorito = (produto) => {
    const itemExistente = favoriteItem.find(item => item.nome === produto.nome);
    if (!itemExistente) {
      setFavoriteItem(prev => [...prev, { ...produto, quantidade: 1 }]);
    }
  };

  return (
    <Box position="relative">
      <Stack
        sx={{
          position: "absolute",
          top: "-1rem",
          right: "-1rem",
          fontSize: "16px",
          color: "orange",
        }}
      >
        {favoriteItem.length}
      </Stack>

      <FavoriteIcon
        onClick={() => setListaFavoritos(!listaFavoritos)}
        sx={{
          fontSize: "1.4rem",
          color: "#33bf30",
          cursor: "pointer",
        }}
      />

      {/* Exemplo de botão para adicionar item (poderia estar em outro lugar também) */}
      <button
        onClick={() =>
          handleAdicionarFavorito({
            nome: "Tênis Branco",
            price: 149.99,
          })
        }
      >
        Adicionar aos favoritos
      </button>

      {listaFavoritos && (
        <Stack
          sx={{
            position: "fixed",
            height: "90vh",
            width: "360px",
            bgcolor: "#fff",
            zIndex: 1000,
            top: "3.8rem",
            right: 0,
            padding: "20px",
            boxShadow: "0 8px 11px rgb(14 55 54 / 55%)",
            "@media only screen and (max-width: 805px)": {
              width: "97%",
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              right: "5px",
              cursor: "pointer",
              color: "var(--light-orange-color)",
              fontSize: "30px",
            }}
          >
            <CloseIcon
              sx={{ fontSize: "20px" }}
              onClick={() => setListaFavoritos(false)}
            />
          </Box>
          <WishlistItem handleListaFavoritos={() => setListaFavoritos(false)} />
        </Stack>
      )}
    </Box>
  );
};

export default Favorito;
