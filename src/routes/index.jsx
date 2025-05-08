import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { MyHome } from "../pages/home"; 
import { MainLayout } from "../layouts/mylayouts";
import { MyFooter } from "../footer/footerBx";
import ContactForm from "../contact/ContactForm";
import AlmadaWhiwaSana from "../companyStory/CompanyHistory";
import PromocoesPage from "../Promocoes/PromocoesPage";

const MainRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<MyHome />} />
        
        <Route  path="/AlmadaWhiwaSana" element={<AlmadaWhiwaSana/>}/>
        <Route  path="/PromocoesPage" element={<PromocoesPage/>}/>
        
      </Routes>
    </MainLayout>
  );
};

export default MainRoutes;
