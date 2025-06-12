import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { MyHome } from "../pages/home";
import { MainLayout } from "../layouts/mylayouts";
import { MyFooter } from "../footer/footerBx";
import ContactForm from "../contact/ContactForm";
import AlmadaWhiwaSana from "../companyStory/CompanyHistory";
import PromocoesPage from "../Promocoes/PromocoesPage";
import Signup from "../Cadastro/SignUpPage";
import AlterarSenha from "../Cadastro/UpdatePassword";
import RecuperarSeanha from "../Cadastro/ForgotPasswordPage";
import SignIn from "../Cadastro/LoginPage";
import { AuthContext } from "../UserAuthContext/AuthContext";
import VerificarCodigo from "../Cadastro/VerifyCodePage";

// 🔒 **Componente para rotas protegidas**
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/Login" />;
};

// 🌍 **Definição das rotas principais**

export const MainRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    // Rotas
    <Routes>
      {/* Rotas protegidas */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<MyHome />} />
        <Route path="/AlmadaWhiwaSana" element={<AlmadaWhiwaSana />} />
        <Route path="/PromocoesPage" element={<PromocoesPage />} />
      </Route>



      {/* Rotas públicas */}
      <Route path="/Login" element={<SignIn />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/AlterarSenha" element={<AlterarSenha />} />
      <Route path="/RecuperarSeanha" element={<RecuperarSeanha />} />
        <Route path="/VerificarCodigo" element={<VerificarCodigo />} />

      

      {/* Fallback */}
      <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/Login"} />} />
    </Routes>
  );
};

export default MainRoutes;
