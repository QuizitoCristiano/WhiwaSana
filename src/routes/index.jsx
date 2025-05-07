import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { MyHome } from "../pages/home"; 

import { MainLayout } from "../layouts/mylayouts";
import { MyFooter } from "../footer/footerBx";
import ContactForm from "../contact/ContactForm";
<<<<<<< HEAD
=======
import AlmadaWhiwaSana from "../companyStory/CompanyHistory";
>>>>>>> feat/cycle-layout







const MainRoutes = () => {

  

  return (
    <MainLayout>
      <Routes>
       
        <Route path="/" element={<MyHome />} />
<<<<<<< HEAD
        <Route path="/" element={<MyFooter />} />
        <Route path="/" element={<ContactForm/>} />
=======
        
        <Route  path="/AlmadaWhiwaSana" element={<AlmadaWhiwaSana/>}/>
>>>>>>> feat/cycle-layout
        
      </Routes>

    </MainLayout>
  ) 
};

export default MainRoutes;
