import React, { useContext, useState, useEffect } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Box,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
} from "@mui/material";
import Modal from "@mui/material/Modal";

import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { Link, NavLink, useNavigate } from "react-router-dom"; // Importando useNavigate
import "./header.css";
import DehazeIcon from "@mui/icons-material/Dehaze";
import CloseIcon from "@mui/icons-material/Close";
import animationData from "./animatino/islikeIcon.json";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NewLogoHeader } from "./logoHeader";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import BagMarket from "../../marketBag/marketbag";
import { GlobalContext } from "../../contexto_global/useContextGlobal";
import PoupNewItem from "../../componetes/bbitem/poupItem";
import WishlistItem from "../../Wishlist/WishlistView";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AgendamentoPage from "../../pages/AgendamentoPage";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const myLink = [
  { label: "Home", link: "/" },
  { label: "Conheça_nos", link: "/AlmadaWhiwaSana" }, // agora com espaço
  { label: "Produtos", link: "/PromocoesPage" },
];

export const MyHeader = () => {
  const { favoriteItem, setFavoriteItem, carinho, setcarinho } =
    useContext(GlobalContext);
  const [listaFavoritos, setListaFavoritos] = useState(false);
  const navigate = useNavigate();
  const [abreMeno, setAbreMeno] = useState(false);
  const [scrolling, setScrolling] = useState(false); // Estado para detectar o scroll

  const [sacola, setSacola] = useState(false);

  const handleAdicionarFavorito = (produto) => {
    const itemExistente = favoriteItem.find(
      (item) => item.nome === produto.nome
    );
    if (!itemExistente) {
      setFavoriteItem((prev) => [...prev, { ...produto, quantidade: 1 }]);
    }
  };

  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [animationState, setAnimationState] = useState({
    isStopped: true,
    isPaused: false,
  });

  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleToggleSacala = () => setSacola(!sacola);

  const [openCalendar, setOpenCalendar] = useState(false);
  const handleTroggleCalendar = () => setOpenCalendar(!openCalendar);

  const handleMenuClick = (link) => {
    setAbreMeno(false); // Fecha o menu
    navigate(link); // Navega para o link
  };

  const handleScroll = () => {
    setScrolling(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseModal = () => {
    if (carinho.length === 0) {
      setOpenModal(false);
    } else {
      setSacola(false); // Fecha a sacola
      setListaFavoritos(false);
      setTimeout(() => {
        setOpenModal(true); // Abre o modal de confirmação de entrega após o atraso
      }, 500); // Ajuste o tempo de atraso conforme necessário (500ms, por exemplo)
    }
  };
  useEffect(() => {
    if (carinho.length > 0) {
      const lastItem = carinho[carinho.length - 1];
      setLastAddedItem(lastItem.nome);

      setNotifications([lastItem]); // ✅ sobrescreve

      setAnimationState({ isStopped: false, isPaused: false });

      const timer = setTimeout(() => {
        setNotifications([]); // ✅ limpa tudo
        setAnimationState({ isStopped: true, isPaused: false });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [carinho]);

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <>
      <Stack
        sx={{
          fontFamily: '"Almarai","Helvetica","Arial",sans-serif',
          width: "100%",
          height: "10vh",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          padding: "10px 30px",
          flexDirection: "row",
          display: "flex",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          transition: "0.5s",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 2000,
          "@media only screen and (max-width: 800px)": {
            padding: "20px 10px",
          },
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
            <Link className="Newlogo" to="/">
              Whiw<strong>aSana</strong>
            </Link>
          </Typography>
        </Stack>

        <Stack
          sx={(theme) => ({
            height: "100%",

            width: "40%",

            [theme.breakpoints.down(900)]: {
              height: "100%",

              width: "auto",
            },
          })}
        >
          <div className="logo-links">
            {myLink.map((item, index) => (
              <NavLink
                to={item.link}
                key={index}
                aria-label={item.label}
                style={({ isActive }) => ({
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  textDecoration: "none",
                  color: isActive ? "#d90429" : "#fff",
                })}
                onClick={() => handleMenuClick(item.link)}
              >
                <p style={{ color: "#fff", fontWeight: "500" }}>{item.label}</p>
              </NavLink>
            ))}
          </div>

          {/* Menu mobile */}

          {abreMeno && (
            <div className="menu-celular">
              <div className="icone-fechar">
                <span
                  onClick={() => setAbreMeno(false)}
                  aria-label="Fechar menu"
                >
                  Fechar
                  <CloseIcon />
                </span>
              </div>
              <div className="itens-menu-celular">
                {myLink.map((item, index) => (
                  <NavLink
                    to={item.link}
                    key={index}
                    aria-label={item.label}
                    style={({ isActive }) => ({
                      textDecoration: "none",
                      color: isActive ? "#d90429" : "#fff",
                    })}
                    onClick={() => handleMenuClick(item.link)} // Fecha o menu ao clicar no link
                  >
                    <p>{item.label}</p>
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </Stack>

        <Box
          sx={{
            position: "relative",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            // backgroundColor: "#d90429",
            cursor: "pointer",
            gap: "0.50rem",
          }}
        >
          <Box sx={{ color: "#33bf30" }}>
            <CalendarTodayIcon
              onClick={handleTroggleCalendar}
              style={{ cursor: "pointer" }}
            />
          </Box>

          {openCalendar && (
            <Stack
              sx={{
                position: "fixed",
                height: "90vh",
                width: "auto",
               
                zIndex: 1000,
                top: "3.8rem",
                right: 0,
                
                overflowY: "auto", // <-- isso ativa o scroll
                scrollbarWidth: "thin", // opcional para scroll mais fino no Firefox
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#ccc",
                  borderRadius: "4px",
                },
                "@media only screen and (max-width: 805px)": {
                  width: "100%", // ocupa a tela toda no mobile
                  height: "100vh", // ocupa toda altura da tela no mobile
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "5px",
                  right: "10px",
                  cursor: "pointer",
                  color: "var(--light-orange-color)",
                  fontSize: "30px",
                }}
              >
                <CloseIcon
                  sx={{ fontSize: "30px" }}
                  onClick={() => setOpenCalendar(false)}
                />
              </Box>
              <AgendamentoPage
                handleListaFavoritos={() => setOpenCalendar(false)}
              />
            </Stack>
          )}

          <Stack
            sx={{
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              top: "-1.2rem",
              right: "2rem",
              cursor: "pointer",
              fontSize: "16px",
              color: "orange",
            }}
          >
            {carinho.length}
          </Stack>

          <ShoppingCartIcon
            onClick={handleToggleSacala}
            sx={{ fontSize: "1.4rem", color: "#33bf30" }}
          />

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
                top: "3.8rem",
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
                <CloseIcon
                  sx={{ fontSize: "20px" }}
                  onClick={handleToggleSacala}
                />
              </Box>
              <BagMarket
                handleToggleSacola={() => setSacola(!sacola)}
                openModal={openModal}
                setOpenModal={setOpenModal}
                sacola={sacola}
                setSacola={setSacola}
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
                handleOpenAlert={handleOpenAlert}
                handleCloseAlert={handleCloseAlert}
              />
            </Stack>
          )}

          <Stack
            sx={{
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              top: "-1rem",
              right: "-1rem",
              cursor: "pointer",
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
              <WishlistItem
                handleListaFavoritos={() => setListaFavoritos(false)}
              />
            </Stack>
          )}
        </Box>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          sx={{
            zIndex: 1300,
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            boxShadow: "none",
            "@media (max-width: 600px)": {
              margin: 0,
              borderRadius: 0,
            },
          }}
        >
          <DialogContent
            sx={{
              width: "100%",
              background: "transparent",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px",
            }}
          ></DialogContent>
        </Modal>
        {/* Animação */}
        {notifications.map((item, index) => (
          <PoupNewItem
            item={item}
            index={index}
            lastAddedItem={lastAddedItem}
            animationState={animationState}
            defaultOptions={defaultOptions}
          />
        ))}

        <Box>
          <Box
            sx={{
              position: "fixed",
              top: "1rem",
              right: "10px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "GrayText",
              cursor: "pointer",
              display: "none",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "20px",
              transition: "0.5s",
              transform: abreMeno ? "rotate(180deg)" : "rotate(0deg)",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              zIndex: "100",
              "&:hover": {
                backgroundColor: "#d90429",
              },

              "@media only screen and (max-width: 800px)": {
                display: "flex",
              },
            }}
            onClick={() => setAbreMeno(!abreMeno)}
            aria-label="Abrir menu"
          >
            {abreMeno ? <CloseIcon /> : <DehazeIcon />}
          </Box>
        </Box>

        <Dialog
          sx={{
            zIndex: 2000,
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            boxShadow: "none",
            "@media (max-width: 600px)": {
              margin: 0,
              borderRadius: 0,
            },
          }}
          open={openAlert}
          onClose={handleCloseAlert} // Aqui está a correção
        >
          <DialogTitle>Aviso</DialogTitle>
          <DialogContent>
            <Alert severity="info">
              Adicione itens ao carrinho para continuar com o processo.
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAlert} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>

      {/* LINHAS COM GRADIENTE MOSTRADAS APENAS COM SCROLL */}
      {scrolling && (
        <Box
          sx={{
            position: "fixed",
            top: "10vh",
            width: "100%",
            height: "2px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1999,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: 0,
              width: "50%",
              height: "2px",
              background: "linear-gradient(to left, #33BF30, transparent)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              right: 0,
              width: "50%",
              height: "2px",
              background: "linear-gradient(to left, transparent, #33BF30)",
            }}
          />
        </Box>
      )}
    </>
  );
};
