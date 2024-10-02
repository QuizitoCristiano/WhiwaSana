import { Box, Stack, styled, Button } from "@mui/material";

export const StyleClientNweLib = {
  container: styled(Stack)(({ bg }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
   position: "relative",
    width: "100%",
    height: "auto",
   

    
  })),



  wrapperCardBoxCharts: styled(Stack)(({}) => ({
    display: "flex",
    flexDirection: "column",
    paddingTop: "2rem",

    boxShadow: "1px 2px 11px 4px rgb(14 55 54 / 25%)",
    transition: "0.5s",
    width: "100%",
    height: '100%',
    // maxHeight: "130vh",
    margin: '3.5rem 20px 20px 20px',
  
    
    overflowY: "auto",
    overflowX: "auto",
    background:
      "linear-gradient(34deg, rgba(0, 0, 0, 1) 8%, rgba(0, 0, 0, 1) 10%, rgba(5, 33, 9, 1) 80%, rgba(10, 142, 44, 0.770773638968481) 140%)",
    color: "white",

    
  })),

  newBoxCharts: styled(Box)(({}) => ({
    width: "100%",
    height: "100%",
  })),

  containerChild: styled(Stack)(({}) => ({
    width: "100%",
    display: "grid",

    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "10px",
    "@media (max-width: 550px)": {
      width: "100%",
      gridTemplateColumns: "1fr",
    },
  })),

  wrapperCardBox: styled(Box)(({}) => ({
    width: "100%",
    display: "flex",
    gap: "1.3rem",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
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
