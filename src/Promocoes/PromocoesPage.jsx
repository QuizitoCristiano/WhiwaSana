import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

const PromocoesPage = () => {
  return ( // <- FALTAVA ISSO AQUI
    <Stack
      sx={{
        minHeight: "100vh",
        width: "100%",
        gap: "4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "30px 2% 20px",
        transition: "3s ease-in-out",
        "@media only screen and (max-width: 800px)": {
          width: "100%",
          marginTop: "1.20rem",
          position: "relative",
        },
        overflowY: "auto",
        overflowX: "auto",
        background: "linear-gradient(34deg, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 50%)",
        color: "white",
      }}
    >
      <Typography variant="h4">Promoções Especiais</Typography>
    </Stack>
  );
};

export default PromocoesPage;
