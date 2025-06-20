import React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";

const AdminUsersManagement = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Usuários
      </Typography>
      <Typography variant="body1" gutterBottom>
        Aqui você pode gerenciar os usuários da plataforma.
      </Typography>

      <Stack spacing={2} mt={4}>
        <Button variant="contained" color="primary">
          Ver lista de usuários
        </Button>
        <Button variant="outlined" color="secondary">
          Adicionar novo usuário
        </Button>
      </Stack>
    </Box>
  );
};

export default AdminUsersManagement;
