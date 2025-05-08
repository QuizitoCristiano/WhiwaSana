import React, { useEffect, useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";


const CounterComponent = ({ endValue }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000; // Duración de la animación en milisimos de seundos
          const increment = parseFloat(endValue) / (duration / 16);


          const timer = setInterval(() => {
            start += increment;
            if (start >= parseFloat(endValue)) {
              setCount(endValue);
          
                
              
             
              clearInterval(timer); 
            } else {
              
              
              setCount(Math.ceil(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [endValue]);

  return (
    <h2 ref={ref} style={{ color: "#fff", fontSize: "3rem" }}>
      {count.toLocaleString()}
    </h2>
  );
};

const Achievements = () => {
  return (
    <Stack
      sx={(theme) => ({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        // bgcolor:'gray',
        width: '100%',
        gap: "2rem",
        padding: "1rem",
        borderRadius: "10px",
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
        },
    

        [theme.breakpoints.down(1015)]: {
          flexDirection: "column",
       
          padding: "0.60rem",
        }
        
      })}
    >
      <Stack
        sx={ (theme) => ({
          width: "100%",
          height: "370px",
       
          borderRadius: "2rem",
          margin: "2rem",
          padding: "3rem",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          transition: "all 0.3s ease-in-out",
          background:
            "linear-gradient(135deg, rgba(20, 20, 20, 0.9) 35%,rgb(4, 59, 9) 100%)",

            '&:hover': {
              border: "1px solid rgba(255, 255, 255, 0.2)",
            },

            [theme.breakpoints.down(768)]: {
              width: "100%",
              height: "auto",
              margin: "1rem",
              padding: "1.5rem",
            }
         
        })}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: "4rem",
            "@media (max-width: 768px)": {
              flexDirection: "column",
              gap: "2rem",
            },
          }}
        >
          <h1 style={{ color: "#33bf30", fontSize: "9rem" }}>25</h1>
          <Typography
            sx={(theme) => ({
              color: "#fff",
              fontSize: "2rem",
              fontWeight: "700",
              fontFamily: "Poppins, sans-serif",

              [theme.breakpoints.down(968)] : {
                fontSize: "1.90rem",
              }
             
            })}
          >
            Anos de experiência
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
             
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "500",
              textAlign: 'left',
              fontFamily: "Poppins, sans-serif",
              "@media (max-width: 768px)": {
                fontSize: "1rem",
              },
            }}
          >
            Consultoria empresarial, consultores especializados oferecendo
            aconselhamento e guiando as empresas para melhorar sua eficiência e
            desempenho.
          </Typography>
        </Box>
      </Stack>

      <Stack
        
        sx={(theme) => ({
          display: "grid",

          gridTemplateColumns: "repeat(2, 1fr)", // 3 colunas padrão
          gap: "20px",
          width: "100%",
          marginBottom: "1rem",

          maxWidth: "1500px", // Define um limite máximo
         
          [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "repeat(2, 1fr)", // 1 coluna no mobile
          },
        })}
      >
        {[
          { endValue: "100K+", subtitle: "Nossos projetos concluídos" },
          { endValue: "10K+", subtitle: "Nossos produtos naturais" },
          { endValue: "200+", subtitle: "Avaliações de clientes" },
          { endValue: "1000+", subtitle: "Nossos clientes satisfeitos" },
        ].map((item, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.2rem",
              borderRadius: "16px",
              height: "190px",
              background: "rgba(20, 20, 20, 0.9)",
              textAlign: "center",
              transition: "all 0.3s ease-in-out",
              overflow: "hidden",
              "&:hover": {
                transform: "scale(1.04)",

                border: "1px solid rgba(255, 255, 255, 0.2)",
              },
              "@media (max-width: 768px)": {
                height: "150px",
                padding: "0.50rem",
              },
            }}
          >
            <CounterComponent
              sx={(theme) => ({
                color: "#d90429",
                fontSize: "1.3rem",
                fontFamily: "Poppins, sans-serif",

                [theme.breakpoints.down(500)]: {
                  fontSize: "1rem",
                }
              })}
              endValue={item.endValue}
            />
            <Typography
              sx={(theme) =>({
                color: "#aaa",
                fontSize: "1.10rem",
                fontFamily: "Poppins, sans-serif",

                [theme.breakpoints.down(500)]: {
                  fontSize: '0.80rem'
                }
              })}
            >
              {item.subtitle}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default Achievements;
