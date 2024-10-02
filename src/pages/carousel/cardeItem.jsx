import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import StarIcon from "@mui/icons-material/Star";
import "./carousel.css";

const CardItem = ({ title, description, Images, textName, textProfession, cartIcon}) => {
  const [starColors, setStarColors] = useState(["", "", "", ""]);

  const handleToggleColor = (index) => {
    setStarColors((prevColors) =>
      prevColors.map((color, i) =>
        i === index ? (color ? "" : "#33bf30") : color
      )
    );
  };

  return (
    <Box
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
        height: "350px",
        width: "290px",
        position: "relative",
        cursor: "pointer",
        transition:
          "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)",
          border: "2px solid #677771",
        },
        "@media (max-width: 530px)": {
          width: "95%",
        },
        "@media (max-width: 430px)": {
          width: "100%",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "row",
          gap: "10px",
          padding: "5px",
          width: "98%",
          
          position: "absolute",
          marginTop: "-18.4rem",
        }}
      >
        <Box>
          {starColors.map((color, index) => (
            <StarIcon
              key={index}
              style={{ color: color}}
              onClick={() => handleToggleColor(index)}
            />
          ))}
        </Box>
        <h4>{title}</h4>
      </Box>
      <p>{description}</p>

      <Stack
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "row",
          gap: "10px",
          width: "100%",
          borderRadius: "10px 10px 0px 0px",
          height: "65px",
          bgcolor: "#4a4a4a",
          position: "absolute",
          marginTop: "11.4rem",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
          }}
        >
          <img
            style={{
              width: "50px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              border: "2px solid #33bf30",
            }}
            src={Images}
            alt={textName}
          />
        </Box>
        <Box>
          <Typography>{textName}</Typography>
          <Typography>{textProfession}</Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "10px",
          width: "100%",
          borderRadius: "0px 0px 10px 10px",
          height: "50px",
          marginTop: "18.5rem",
          bgcolor: "#4a4a4a",
          position: "absolute",
        }}
      >
        <FacebookIcon className="SocialMidia" />
        <WhatsAppIcon className="SocialMidia" />
        <InstagramIcon className="SocialMidia" />
        <LinkedInIcon className="SocialMidia" />
      </Box>
    </Box>
  );
};

export default CardItem;
