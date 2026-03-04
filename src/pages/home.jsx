import {
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import React, { useState, useContext } from "react";

import { ControlledCarousel } from "./carousel/carousel";
import { Category } from "../componetes/catecorepage";
import DiscoverOurHeadphones from "../componetes/DiscoverOur/indexDiscover";
import ElectronicsItemOne from "../componetes/CardsCollection/ElectronicsItem";
import PromoCard from "../componetes/Showcase/PromoCard";
import DiscountediPhones from "../componetes/iPhoneShowcase/BestDeals/iPhoneDetails";
import FeaturediPhone from "../componetes/iPhoneShowcase/iPhoneCard";
import PremiumiPhones from "../componetes/NewReleases/DiscountBadge";
import UIBlocksCards from "../componetes/UIBlocks";
import { Testimonials } from "../componetes/TestimonialCard/cardsData";
import ContactForm from "../contact/ContactForm";
import ProductDetails from "../componetes/MonitorCard/MonitorList";
import MapHome from "../Promocoes/PaginaPromocoes";
import ChatWhatsApp from "../chatWats/zap";
import { useAuth } from "../UserAuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AdminChat from "../chatWats/AdminChat";
import ChatAdminDashboard from "../chatWats/AdminChatDashboard";
import AgendamentoPage from "./AgendamentoPage";
// import ControlledCarousel from "./carousel/HeadphoneImageContainer ";

export const MyHome = () => {
  const { user, logout, open, setOpen } = useAuth();


  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("newUser");
    localStorage.removeItem("isLogged");
    logout(); // <-- dispara logout do contexto, se tiver
    navigate("/"); // volta para login
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleClose = (confirmLogout) => {
    setOpen(false);
    if (confirmLogout) {
      handleLogout();
    }
  };
  return (
    <>
      <Stack
        sx={{
          minHeight: "100vh",
          // bgcolor: "",
          marginTop: "1rem",
          width: "100%",

          gap: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "160px 2% 20px",
          transition: "3s ease-in-out",

          "@media only screen and (max-width: 800px)": {
            width: "100%",
            marginTop: "4rem",
            position: "relative",
          },

          // boxShadow: "1px 2px 11px 4px rgb(14 55 54 / 25%)",
          // transition: "0.5s",
          // width: "100%",
          // height: "100%",
          // maxHeight: "130vh",

          overflowY: "auto",
          overflowX: "auto",
          background:
            "linear-gradient(34deg, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 50%)",

          color: "white",
        }}
      >
        <Stack>
          <button className="logoutButton" onClick={handleClickOpen}>
            Sair
          </button>
        </Stack>

        <Dialog open={open} onClose={() => handleClose(false)}>
          <DialogTitle
            style={{ fontSize: "2rem", fontWeight: "bold", color: "#3cb815" }}
          >
            {"Confirmar Logout"}
          </DialogTitle>
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "space-evenly",
              gap: "1rem",
              padding: "1rem 2rem",
              borderRadius: "0.5rem",
              width: "100%",
              color: "#3ca63a",
            }}
          >
            <Button
              sx={{
                padding: "1.5rem",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "14px",
                gap: "1rem",
                width: "100%",
                backgroundColor: "#1a2428",
                boxShadow: "1px 5px 20px #3ca63a",
                "&:hover": {
                  boxShadow: "1px 5px 20px #000",
                  border: "2px solid #3ca63a",
                  background: "#3cb815",
                  color: "#fff",
                },
              }}
              onClick={handleNavigateBack} // Função de navegação
            >
              Voltar para a página anterior
            </Button>
          </Box>

          <DialogContent>
            <DialogContentText
              sx={{
                fontSize: "1.8rem",
                color: "#f75f1d;",
                fontWeight: "bold",
              }}
            >
              Você tem certeza que deseja sair?
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "space-evenly",
              gap: "1rem",
              padding: "1rem 2rem",
              borderRadius: "0.5rem",
              color: "#3ca63a",
            }}
          >
            <Button
              sx={{
                padding: "10",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "14px",
                gap: "1rem",
                backgroundColor: "#1a2428",
                boxShadow: "1px 5px 20px #3ca63a",
                "&:hover": {
                  boxShadow: "1px 5px 20px #f75f1d",
                  border: "2px solid #3ca63a",
                  background: "#f75f1d",
                  color: "#000",
                },
              }}
              onClick={() => handleClose(true)}
            >
              <ArrowBackIcon sx={{ fontSize: "2rem" }} />
              Sim
            </Button>

            <Button
              sx={{
                padding: "10",
                boxShadow: "1px 5px 20px #3ca63a",
                backgroundColor: "#1a2428",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "14px",
                gap: "1rem",
                "&:hover": {
                  boxShadow: "1px 5px 20px #3ca63a",
                  border: "2px solid #3ca63a",
                  color: "#3ca63a",
                },
              }}
              onClick={() => handleClose(false)}
            >
              Não
              <ArrowForwardIcon sx={{ fontSize: "2rem" }} />
            </Button>
          </DialogActions>
        </Dialog>

        <ControlledCarousel />
        <Testimonials />
        <Category />
        <MapHome />
        <DiscoverOurHeadphones />
        <ElectronicsItemOne />
        <PromoCard />
        <DiscountediPhones />
        <FeaturediPhone />
        <PremiumiPhones />

        <UIBlocksCards />

        <ProductDetails />
        <ContactForm />

        {/* <ChatAdminDashboard /> */}

        <AdminChat />
        <ChatWhatsApp />

        

        {/* <ChatWhatsAppTxet/> */}
      </Stack>
    </>
  );
};
