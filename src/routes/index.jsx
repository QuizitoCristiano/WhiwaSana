


import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../mylayouts';
import { Home } from '../pages/home';
import { Login } from '../pages/login';
import { MyFooter } from '../footer/footerBx';



export const MainRoutes = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
        
            <MainLayout>
              <Routes>
              <Route path="" element={<Home />} />
              <Route path='' element={<Login />} />
              <Route path="/MyFooter" element={ <MyFooter/>} />
              </Routes>
            </MainLayout>
         
        }
      />
    </Routes>
  );
};

