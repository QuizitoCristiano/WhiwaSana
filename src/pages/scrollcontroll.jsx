import React from 'react';
import { Box } from '@mui/material';

const ScrollableContent = () => {
  return (
    <Box
      sx={{
        height: 400,
        overflowY: 'scroll',
        padding: 2,
        border: '1px solid #ccc',
        // backgroundColor: '#f9f9f9'
      }}
    >
      <p>Conteúdo que você deseja rolar</p>
      <p>Mais conteúdo...</p>
      <p>Mais conteúdo...</p>
      <p>Mais conteúdo...</p>

      {/* Adicione mais conteúdo conforme necessário */}
    </Box>
  );
};

export default ScrollableContent;
