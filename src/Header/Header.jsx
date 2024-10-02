

import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";
import DehazeIcon from "@mui/icons-material/Dehaze";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { NewLogoHeader } from "./logoHeader";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { GlobalContext } from "../contexto_global/useContextGlobal"; // Import GlobalContext
import { BagMarket } from "../componet/marketBag/marketbag";
import CropEasy from "../componet/crop/CropEasy";


const myLink = [
  { label: "Home", link: "/" },
  { label: "Produtos", link: "/produdos" },
  { label: "Compras", link: "/compras" },
  { label: "Sobre Nós", link: "/sobre-nos" },
  { label: "Contato", link: "/contato" },
];

export const MyHeader = () => {
  const location = useLocation();
  const { carinho } = useContext(GlobalContext); // Access carinho from context
  const [abreMeno, setAbreMeno] = useState(false);
  const [sacola, setSacola] = useState(false);
  
  const [avatar, setAvatar] = useState(null); // Estado para armazenar o avatar
  const [openCrop, setOpenCrop] = useState('');
  const [photoURL, setPhotoURL] = useState(null); // Estado para armazenar a URL da imagem

  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) {
      setAvatar(savedAvatar); // Atualiza o estado com a imagem salva no localStorage
    }
  }, []);

  const handleChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const imgUrl = reader.result;
      setPhotoURL(imgUrl); // Atualiza o estado photoURL
      setOpenCrop(true); // Abre o CropEasy para cortar a imagem
    };
  
    if (file) {
      reader.readAsDataURL(file); // Converte a imagem para base64
    }
  };

  const abrirMenu = () => setAbreMeno(true);
  const fecharMenu = () => setAbreMeno(false);
  
  // Função para alternar a visibilidade da sacola
  const handleTroggleSacola = () => setSacola(!sacola);

  return !openCrop ? (
    <Stack
      sx={{
        fontFamily: '"Almarai","Helvetica","Arial",sans-serif',
        width: "100%",
        height: "10vh",
        position: "fixed",
        padding: "20px 50px",
        top: "0",
        left: "0",
        right: "0",
        gap: "10px",
        flexDirection: "row",
        display: "flex",
        background: "#2e332e",
        color: "#fff",
        boxShadow: "0 9px 1rem rgb(14 55 54 / 65%)",
        transition: "0.5s",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: "2000",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-start",
          height: "100%",
          width: "40%",
          gap: "5px",
        }}
      >
        <Box>
          <NewLogoHeader />
        </Box>
        <Typography>
          <Link className="logoDelicacy" to="/">
            Whiw<strong>aSana</strong>
          </Link>
        </Typography>
      </Stack>

      {/* Links e menu móvel */}
    

<Stack className="myNaveLink">
        <div className="logo-links">
          {myLink.map((item, index) => {
            const isLink = item.link === location.pathname;
            return (
              <Link
                style={{
                  color: isLink ? "#fff" : "#33bf30",
                  borderRadius: "5px",
                  padding: isLink && "4px",
                  boxShadow:
                    isLink &&
                    " rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                  transition: "all .3s",
                  background: isLink && "#3cb815",
                }}
                to={item.link}
                key={index}
              >
                <p>{item.label}</p>
              </Link>
            );
          })}
        </div>

        <div className="logo-icons">
          <span onClick={abrirMenu}>
            {abreMeno ? <CloseIcon /> : <DehazeIcon />}
          </span>
        </div>

        {abreMeno && (
          <div className="menu-celular">
            <div className="icone-fechar">
              <span onClick={fecharMenu}>
                Fechar
                <CloseIcon />
              </span>
            </div>
            <div className="itens-menu-celular">
              {myLink.map((item, index) => {
                const isLink = item.link === location.pathname;
                return (
                  <Link
                    style={{
                      color: isLink ? "#fff" : "black",
                      borderRadius: "5px",
                      padding: isLink && "4px",
                      boxShadow:
                        isLink &&
                        " rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                      transition: "all .3s",
                      background: isLink && "#3cb815",
                    }}
                    to={item.link}
                    key={index}
                  >
                    <p>{item.label}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </Stack>

      {/* Avatar e upload de imagem */}
      <Box onClick={() => document.getElementById("avatar-upload").click()}>
        <Avatar
          alt="Avatar"
          src={photoURL} // O avatar será atualizado aqui
          sx={{ width: 56, height: 56, cursor: 'pointer' }}
        />
      </Box>
      <input
        id="avatar-upload"
        type="file"
        style={{ display: "none" }}
        onChange={handleChange} // Chama a função handleChange quando o arquivo for selecionado
      />

      {/* Carrinho de compras */}
      <Box
        sx={{
          position: "relative",
          color: "var(--light-orange-color)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          height: "37px",
          width: "37px",
        }}
      >
        <Stack
          sx={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            top: "-5px",
            left: "-1px",
            cursor: "pointer",
            fontSize: "16px",
            color: "orange",
          }}
        >
          {carinho.length}
        </Stack>

        <ShoppingCartIcon
          sx={{ fontSize: "20px" }}
          onClick={handleTroggleSacola}
        />
      </Box>

      {/* Sacola - Exibir apenas quando o estado sacola for true */}
      {sacola && (
        <Stack
          sx={{
            position: "fixed",
            height: "90vh",
            width: "360px",
            bgcolor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            zIndex: "1000",
            top: "60px",
            right: "0",
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
            <CloseIcon sx={{ fontSize: "20px" }} onClick={handleTroggleSacola} />
          </Box>
          <BagMarket />
        </Stack>
      )}
    </Stack>
  ) : (
    <CropEasy {...{ photoURL, setPhotoURL, openCrop, setOpenCrop, avatar, file, setAvatar }} />
  );
};
















