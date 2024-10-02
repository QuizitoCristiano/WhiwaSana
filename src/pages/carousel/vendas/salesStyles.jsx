import { Box, Stack, styled, Button } from "@mui/material";

export const StyleClientNweLib = {
  container: styled(Stack)(({ bg }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
   
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





  {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
            borderRadius: "10px",
            padding: "10px",
            backgroundColor: "#4e564e",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            height: "290px",
            width: "290px",
            cursor: "pointer",
            transition:
              "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)",
              border: "2px solid #677771",
            },
          }}
        >
          <Box>
           
          </Box>
          <Box>
            <h3>
              universo sem sair de casa
            </h3>
          </Box>

          <p>
            O Headphone H37770apresenta o sistema de driver de câmara dupla que
            reduz a distorção e oferece som mais claro bem como o conforto
          </p>

          <Box sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            borderRadius: '10px',
            height: "50px",
            marginTop: "10px",
            bgcolor:  "#4a4a4a",
          }}>
            <FacebookIcon className="SocialMidia" />
            <WhatsAppIcon className="SocialMidia" />
            <InstagramIcon className="SocialMidia" />
            <LinkedInIcon className="SocialMidia" />
          </Box>
        </Box> */}
