import * as React from "react";
import Box from "@mui/material/Box";
import imagemCentralizada from "../imagens/iper2Img.png";

const MasonryImageList = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 450, // ocupa 100% da altura do contêiner pai
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          cursor: "pointer",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.9)",
        },
      }}
    >
      <img
        src={imagemCentralizada}
        alt="Opa!"
        style={{
          width: "100%", // ocupa 100% da largura do pai
          height: "100%", // ocupa 100% da altura do pai
          objectFit: "cover", // cobre o espaço sem distorcer
          borderRadius: "20px",
          "&.hover": {},
        }}
      />
    </Box>
  );
};

export default MasonryImageList;
