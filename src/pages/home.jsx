import { Stack } from "@mui/material";
import React from "react";
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
import { MyFooter } from "../footer/footerBx";
import WishlistItem from "../Wishlist/WishlistView";
import ContactForm from "../contact/ContactForm";
import ProductDetails from "../componetes/MonitorCard/MonitorList";
import MapHome from "../Promocoes/PaginaPromocoes";
import Signup from "../Cadastro/SignUpPage";
import Login from "../Cadastro/LoginPage";
import RecuperarSeanha from "../Cadastro/ForgotPasswordPage";
import AlterarSenha from "../Cadastro/UpdatePassword";
// import ControlledCarousel from "./carousel/HeadphoneImageContainer ";

export const MyHome = () => {
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
        <ControlledCarousel />
        <Testimonials />
        <Category />
        <MapHome/>
        <DiscoverOurHeadphones />
        <ElectronicsItemOne />
        <PromoCard />
        <DiscountediPhones />
        <FeaturediPhone />
        <PremiumiPhones />

        <UIBlocksCards />

        <ProductDetails/>
        <ContactForm/>



        
        {/* <MyFooter /> */}
       
       {/* <AlterarSenha/>
        <RecuperarSeanha/>
          <Login/>
        <Signup/> */}

        
      </Stack>
    </>
  );
};
