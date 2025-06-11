import React from "react";
import { Stack } from "@mui/material";
import { MyHeader } from "./Header/Header";
import { Outlet } from "react-router-dom"; // 👈 IMPORTANTE

export const MainLayout = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MyHeader />
      <Stack
        sx={{
          width: "100%",
          flexGrow: 1,
          mt: 0,
          height: "auto",
          background:
            "linear-gradient(34deg, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 50%)",
          color: "white",
        }}
      >
        <Outlet /> {/* 👈 Aqui é onde as rotas internas aparecerão */}
      </Stack>
    </Stack>
  );
};
