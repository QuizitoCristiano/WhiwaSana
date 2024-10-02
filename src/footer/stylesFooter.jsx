import { Margin } from "@mui/icons-material";
import {
  Box,
  Stack,
  styled,
  Button,
  TextField,
  Typography,
} from "@mui/material";

export const StyleFooter = {
  container: styled(Stack)(({ bg }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    background: "#2e332e",
    flexDirection: "column",

    bottom: 0,
    width: "100%",

    zIndex: 1000,
  })),

  wrapperCardBoxCharts: styled(Stack)(({}) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    flexDirection: "row",
    bottom: 0, // pode remover se não for necessário
    width: "100%",
    padding: "12px",
    gap: "10px",
    "@media only screen and (max-width: 805px)": {
      width: "100%",
      flexDirection: "column",
      padding: "1px",
    },
  })),

  newBoxCharts: styled(Box)(({}) => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "150px",
    width: "100%",
    padding: "2px",
    backgroundColor: "#1a2428",
    position: "relative",
    "@media only screen and (max-width: 805px)": {
      width: "100%",
      flexDirection: "column",
    },
  })),

  newContainerStack: styled(Stack)(({}) => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "150px",
    width: "100%",
    padding: "12px",
   
    "@media only screen and (max-width: 805px)": {
      // Aqui foi corrigido
      width: "100%",
      flexDirection: "column",
      height: "auto",
      gap: "1rem",
      padding: "9px",
      
    },
  })),

  centeredBox: styled(Box)(({}) => ({
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "[theme.breakpoints.down(805)]": {
      width: "100%",
      flexDirection: "column",
    },
    "@media only screen and (max-width: 805px)": {
      width: "100%",
    },
  })),

  inputButtonStack: styled(Stack)(({}) => ({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "50%",
    flexDirection: "row",
    gap: "5px",
    "[theme.breakpoints.down(805)]": {
      width: "100%",
      justifyContent: "center",
    },
    "@media only screen and (max-width: 805px)": {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })),

  cardStyledTextField: styled(TextField)(({}) => ({
    width: "50%",
    fontSize: "1.3rem",
    fontWeight: "bold",
    backgroundColor: "var(--green-color)",
    borderRadius: "5px",
    "[theme.breakpoints.down(805)]": {
      width: "65%",
      justifyContent: "center",
    },
    
    "@media only screen and (max-width: 805px)": {
      width: "66%",
      display: "flex",
      
      alignItems: "center",
    },
  })),

  newCardStyledButton: styled(Button)(({}) => ({
    width: "20%",
    height: "55px",
    backgroundColor: "#c0eb7b",
    color: "#000",
    fontSize: "1.2rem",
    fontWeight: 600,
    padding: "1rem",
    "&:hover": {
      backgroundColor: "#c0eb7b",
      color: "#000",
    },
    "[theme.breakpoints.down(805)]": {
      width: "34%",
      justifyContent: "center",
    },
    
    "@media only screen and (max-width: 805px)": {
      width: "30%",
      display: "flex",
      
      alignItems: "center",
    },
  })),

  containerChild: styled(Stack)(({}) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "250px",
    gap: "10px",
    padding: "12px",

    "@media only screen and (max-width: 850px)": {
      width: "100%",
      flexDirection: "column",
      padding: "1px",
      padding: "2px",
    },
  })),

  wrapperCardBox: styled(Box)(({}) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "250px",
    gap: "10px",
    padding: "12px",
  })),

  wrapperTextBox: styled(Box)(({}) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    gap: "5px",
    padding: "12px",

    zIndex: 1000,
  })),

  wrapperH4Box: styled(Typography)(({}) => ({
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#3cb815",
  })),

  secialMiddleBox: styled(Typography)(({}) => ({
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "5px",
    width: "100%",
  })),

  secialMiddleIcon: styled(Typography)(({}) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
    width: "50px",
    color: "white",
    cursor: "pointer",
    borderRadius: "50%",
    border: "2px solid #ccc",

    boxShadow: "0 0 10px 2px #33bf30",
    "&:hover": {
      boxShadow: "0 0 50px 2px #33bf30",
      color: "#33bf30",
      cursor: "pointer",
      transition: "box-shadow 0.2s ease",
      transform: "scale(1.03)",
    },
  })),

  wrapperTygrphyBox: styled(Typography)(({}) => ({
    fontSize: "2rem",
    fontWeight: 600,
    color: "#3cb815",
    transform: "scale(1.03) skewX(-10deg)",
  })),

  wrapperTextTitleBox: styled(Typography)(({}) => ({
    color: "white",
    fontWeight: 600,
    transform: "scale(1.03) skewX(-10deg)",
    "&:hover": {
      color: "#c0eb7b",
      transition: "transform 0.2s ease, color 0.2s ease",
      transform: "scale(1.03) skewX(10deg)",
      backgroundColor: "transparent",
    },
  })),

  cardBotton: styled(Button)(({}) => ({
    display: "inline-block",
    padding: "12px 28px",
    backgroundColor: "var(--green-color)",
    borderRadius: "5px",
    color: "var(--bg-color)",
    fontSize: "1rem",
    letterSpacing: "1px",
    fontWeight: 600,
    transition: "all 0.45s ease",
    border: "none",
    outline: "none",
    ":hover": {
      background: "var(--light-orange-color)",
      border: "none",
      outline: "none",
      color: "var(--bg-color)",
      transition: "all 0.45s ease",
    },
  })),
};
