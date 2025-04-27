import React from "react";
import { Stack } from "@mui/material";
import { MyHeader } from "./Header/Header";

export const MainLayout = ({ children }) => { // Corrigido para "children"
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
     <MyHeader/>
      <Stack
        sx={{
          width: "100%",
          flexGrow: 1,
          mt: 0,
          height: "auto",
        }}
      >
        {children} {/* Corrigido para "children" */}
      </Stack>
    </Stack>
  );
};
