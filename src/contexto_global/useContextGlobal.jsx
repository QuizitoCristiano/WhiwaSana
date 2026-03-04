import React, { createContext, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [someState, setSomeState] = useState(null);
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [promotion, setPromotion] = useState(false);

  const [carinho, setCarinho] = useState([]);

  const [favoriteItem, setFavoriteItem] = useState([]);
  // Função para limpar o carrinho
  const limparCarrinho = () => {
    setCarinho([]);
  };

  // Função para limpar os favoritos
  const limparFavorito = () => {
    setFavoriteItem([]);
  };
  // Adiciona ou incrementa item no carrinho
  const adicionarNovoItem = (produto) => {
    if (!produto) return;

    setCarinho((prevCarinho) => {
      const novoCarinho = [...prevCarinho];
      const indexExistente = novoCarinho.findIndex(
        (item) => item.nome === produto.nome && item.price === produto.price
      );

      if (indexExistente !== -1) {
        novoCarinho[indexExistente].quantidade++;
      } else {
        novoCarinho.push({ ...produto, quantidade: 1 });
      }

      return novoCarinho;
    });
  };

  // Incrementa quantidade
  const incrementarQuantidade = (index) => {
    const novoCarinho = [...carinho];
    if (novoCarinho[index]) {
      novoCarinho[index].quantidade++;
      setCarinho(novoCarinho);
    }
  };

  // Decrementa quantidade ou remove item
  const decrementarQuantidade = (index) => {
    const novoCarinho = [...carinho];
    if (!novoCarinho[index]) return;

    if (novoCarinho[index].quantidade > 1) {
      novoCarinho[index].quantidade--;
      setCarinho(novoCarinho);
    } else {
      const novoArray = novoCarinho.filter((_, i) => i !== index);
      setCarinho(novoArray);
    }
  };

  // Remove item do carrinho
  const removerItem = (index) => {
    const novoArray = carinho.filter((_, i) => i !== index);
    setCarinho(novoArray);
  };

  // Total de itens no carrinho
  const totalItensCarrinho = carinho.length;

  
  // Adiciona ou incrementa item nos favoritos
  const adicionarNovosItenfavoritos = (produto) => {
    if (!produto) return;

    setFavoriteItem((prev) => {
      const novoFavorito = [...prev];
      const indexExistente = novoFavorito.findIndex(
        (item) =>
          item.nome === produto.nome &&
          item.price === produto.price &&
          item.img === produto.img
      );

      if (indexExistente !== -1) {
        novoFavorito[indexExistente].quantidade++;
      } else {
        novoFavorito.push({ ...produto, quantidade: 1 });
      }

      return novoFavorito;
    });
  };

  // Remove item dos favoritos pelo índice
  const removerFavorito = (index) => {
    const novaLista = favoriteItem.filter((_, i) => i !== index);
    setFavoriteItem(novaLista);
  };

  // FormularioEntrega
  return (
    <GlobalContext.Provider
      value={{
        someState,
        setSomeState,
        price,
        setPrice,
        imageUrl,
        setImageUrl,
        promotion,
        setPromotion,
        carinho,
        setCarinho,
        favoriteItem,
        setFavoriteItem,
        adicionarNovoItem,
        incrementarQuantidade,
        decrementarQuantidade,
        removerItem,
        totalItensCarrinho,
        adicionarNovosItenfavoritos,
        removerFavorito,
        limparCarrinho, // ✅ Adicionado
        limparFavorito, // ✅ Adicionado
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
