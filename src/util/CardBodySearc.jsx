import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  TextareaAutosize,
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputAdornment,
} from "@mui/material";

import InputMask from "react-input-mask";
import { CardStylSearche } from "./CardStyles";



const FilterItemForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
  });

  return (
    <>
      <Box
        component="form"
        sx={{
          width: "100%",
          maxWidth: "700px",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
          "@media (max-width: 750px)": {
            width: "100%",
            height: "100vh",
          },
        }}
      >
        <CardStylSearche.wrapperfort>
          <Stack
            sx={{
              paddingBottom: "1.8rem",
              color: "var(--green-color)",
              fontSize: "1.8rem",
              gap: "1.9rem",
              width: "100%",
            }}
          >
            <h2>Confirmar dados da entrega</h2>
          </Stack>

          <CardStylSearche.containerBox>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.3rem",
                width: "100%",
              }}
            >
              <TextField
                sx={{
                  width: "100%",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
                type="text"
                label="Nome completo"
                variant="outlined"
                size="small"
                FormHelperTextProps={{ sx: { fontSize: "1.4rem" } }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.3rem",
                width: "100%",
              }}
            >
              <TextField
                sx={{
                  width: "100%",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
                type="text"
                label="Telefone"
                variant="outlined"
                size="small"
                FormHelperTextProps={{ sx: { fontSize: "1.4rem" } }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.3rem",
                width: "100%",
              }}
            >
              <TextField
                sx={{
                  width: "100%",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
                type="text"
                label="Email"
                variant="outlined"
                size="small"
                FormHelperTextProps={{ sx: { fontSize: "1.4rem" } }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.3rem",
                width: "100%",
              }}
            >
              <TextField
                sx={{
                  width: "100%",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
                type="text"
                label="CPF (ou CNPJ)"
                variant="outlined"
                size="small"
                FormHelperTextProps={{ sx: { fontSize: "1.4rem" } }}
              />
            </Box>
          </CardStylSearche.containerBox>

          <CardStylSearche.containerBox>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.3rem",
                width: "100%",
              }}
            >
              <TextField
                sx={{
                  width: "100%",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
                type="text"
                label="CEP"
                variant="outlined"
                size="small"
                FormHelperTextProps={{ sx: { fontSize: "1.4rem" } }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.3rem",
                width: "100%",
              }}
            >
              <TextField
                sx={{
                  width: "100%",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
                type="text"
                label="Rua / Logradouro	"
                variant="outlined"
                size="small"
                FormHelperTextProps={{ sx: { fontSize: "1.4rem" } }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.3rem",
                width: "100%",
              }}
            >
              <TextField
                sx={{
                  width: "100%",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
                type="text"
                label="Número"
                variant="outlined"
                size="small"
                FormHelperTextProps={{ sx: { fontSize: "1.4rem" } }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.3rem",
                width: "100%",
              }}
            >
              <TextField
                sx={{
                  width: "100%",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
                type="text"
                label="Bairro	"
                variant="outlined"
                size="small"
                FormHelperTextProps={{ sx: { fontSize: "1.4rem" } }}
              />
            </Box>
          </CardStylSearche.containerBox>

          <CardStylSearche.containerBox>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.3rem",
                width: "100%",
              }}
            >
              <TextField
                sx={{
                  width: "100%",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
                type="text"
                label="Cidade"
                variant="outlined"
                size="small"
                FormHelperTextProps={{ sx: { fontSize: "1.4rem" } }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.3rem",
                width: "100%",
              }}
            >
              <TextField
                sx={{
                  width: "100%",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
                type="text"
                label="Estado (UF)	"
                variant="outlined"
                size="small"
                FormHelperTextProps={{ sx: { fontSize: "1.4rem" } }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.3rem",
                width: "100%",
              }}
            >
              <TextField
                sx={{
                  width: "100%",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
                type="text"
                label="Número"
                variant="outlined"
                size="small"
                FormHelperTextProps={{ sx: { fontSize: "1.4rem" } }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.3rem",
                width: "100%",
              }}
            >
              <TextField
                sx={{
                  width: "100%",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
                type="text"
                label="Referência	"
                variant="outlined"
                size="small"
                FormHelperTextProps={{ sx: { fontSize: "1.4rem" } }}
              />
            </Box>
          </CardStylSearche.containerBox>
        </CardStylSearche.wrapperfort>
      </Box>
    </>
  );
};

export default FilterItemForm;
