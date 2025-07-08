import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const   navigate = useNavigate();
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Painel do Administrador</Typography>
      <Typography>Bem-vindo(a) ao painel administrativo.</Typography>

      <Button
        variant="contained"
        color="success"
        sx={{ mt: 2 }}
        onClick={() => navigate("/admin/chat")}
      >
        Abrir Conversas com Clientes
      </Button>
    </Box>
  );
};

export default AdminDashboard;
