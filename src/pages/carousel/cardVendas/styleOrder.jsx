import { Box, Stack, styled } from "@mui/material";

export const StyleOrderClintVendas = {
  // ordercontainer: styled(Stack)(({ theme }) => ({
  //   display: "flex",
  //   flexWrap: "wrap",
  //   gap: "20px",
  //   width: "100%",
  //   height: "100%",
  //   justifyContent: "space-between",
  //   padding: "20px",
  //   maxWidth: "900px",
  //   margin: "auto",
  //   alignItems: "center",
  //   "@media (max-width: 750px)": {
  //     gap: "10px",
  //     padding: "10px",
  //     maxWidth: "300px",
  //     margin: "auto",
  //   },
  //   "@media (max-width: 450px)": {
  //     maxWidth: "250px",
  //     margin: "auto",
  //     gap: "5px",
  //   },
  //   "@media (max-width: 350px)": {
  //     maxWidth: "200px",
  //     margin: "auto",
  //     gap: "3px",
  //   },
  // })),

  ordercontainer: styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    width: "100%",
    padding: "20px",
    justifyItems: "center",
    "@media (max-width: 750px)": {
      gap: "10px",
      padding: "10px",
    },
    "@media (max-width: 450px)": {
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    },
    "@media (max-width: 350px)": {
      gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    },
  })),
  

  orderitem: styled(Box)(({ theme }) => ({
    padding: "20px",
    backgroundColor: "#c9c9c9",
    boxShadow: "1px 2px 11px 4px rgb(14 55 54 / 50%)",
    borderRadius: "0.5rem",
    color: "black",
    position: "relative",
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    },
  })),

  cotrolModalStyl: styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: "20px 20px 50px rgba(0, 0, 0, 0.9)",
    borderRadius: "15px",
    p: 4,
    "@media (max-width: 750px)": {
      width: "97%",
    },
  })),
};
