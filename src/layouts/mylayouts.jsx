import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { MyHeader } from "./Header/Header";
import { Link, Outlet } from "react-router-dom"; // 👈 IMPORTANTE
import { NewLogoHeader } from "./Header/logoHeader";

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
        <Box
          sx={(theme) => ({
            width: "100%",
            height: "4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#262626",
            px: 2,
            flexDirection: "row",

            [theme.breakpoints.down(480)]: {
             
              display: "flex",
              justifyContent:'center',
              flexDirection: "column",
            },
          })}
        >
          {/* Logo e título */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box>
              <NewLogoHeader />
            </Box>
            <Typography sx={{ fontSize: "" }} color="white">
              <Link className="Newlogo" to="/">
                Whiw<strong>aSana</strong>
              </Link>
            </Typography>
          </Stack>

          {/* Texto de direitos autorais */}
          <Typography color="white" sx={{ fontSize: "0.875rem" }}>
            Autor de direitos © fale com a gente
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};
