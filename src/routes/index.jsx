import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { MyHome } from "../pages/home";
import { MainLayout } from "../layouts/mylayouts";
import AlmadaWhiwaSana from "../companyStory/CompanyHistory";
import PromocoesPage from "../Promocoes/PromocoesPage";
import Signup from "../Cadastro/SignUpPage";
import AlterarSenha from "../Cadastro/UpdatePassword";
import RecuperarSeanha from "../Cadastro/ForgotPasswordPage";
import SignIn from "../Cadastro/LoginPage";
import VerificarCodigo from "../Cadastro/VerifyCodePage";
import FormularioEntrega from "../util/CardBodySearc";

import AdminDashboard from "../admin/AdminDashboard";
import AdminUsersManagement from "../admin/AdminUsersManagement";

import { useAuth } from "../UserAuthContext/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "../admin/AdminRoute";
import ChatWhatsApp from "../chatWats/zap";
import ChatAdminDashboard from "../chatWats/AdminChatDashboard";

export const MainRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {/* Rotas protegidas para usuários logados */}
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
        <Route path="/FormularioEntrega" element={<FormularioEntrega />} />
      </Route>

      {/* Rotas exclusivas para admins */}
      <Route
        element={
          <AdminRoute>
            <MainLayout />
          </AdminRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsersManagement />} />
        <Route path="/admin/chat" element={<ChatAdminDashboard />} />
        <Route path="/admin/chat/:clientId" element={<ChatWhatsApp />} />
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
