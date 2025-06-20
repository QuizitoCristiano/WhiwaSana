import React, { useState, useContext } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  formatTelefone,
  fetchAddressByPostalCode,
  validateDeliveryData,
} from "./validateDeliveryData";
import InputMask from "react-input-mask";
import { CardStylSearche } from "./CardStyles";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseconfig/firebaseconfig";
import { GlobalContext } from "../contexto_global/useContextGlobal";
import { useAuth } from "../UserAuthContext/AuthContext";

const FormularioEntrega = () => {
  const { carinho, favoriteItem, limparCarrinho, limparFavorito } =
    useContext(GlobalContext); // pega o carrinho do contexto global
  const { user } = useAuth(); // pega o usuário logado do contexto Auth

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    telefone: "",
    cnpj: "",
    cep: "",
    bairro: "",
    cidade: "",
    estado: "",
    rua: "",
    numeroDoEdificios: "",
    referencia: "",
    country: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Função para atualizar campos do formulário
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleTelefoneChange = (e) => {
    const formatted = formatTelefone(e.target.value);
    handleChange("telefone", formatted);
  };

  const handleCheckPostalCode = async () => {
    if (!formData.country) {
      setFormErrors((prev) => ({
        ...prev,
        cep: "Selecione o país antes do CEP",
      }));
      return;
    }

    try {
      const data = await fetchAddressByPostalCode(
        formData.cep,
        formData.country
      );
      setFormData((prev) => ({
        ...prev,
        rua: data.rua,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        country: data.country,
      }));
      setFormErrors((prev) => ({ ...prev, cep: "" }));
    } catch (error) {
      setFormErrors((prev) => ({
        ...prev,
        cep: error.message,
      }));
    }
  };

  // Validação simples (você pode usar sua função validateDeliveryData)
  const validate = () => {
    const errors = {};
    if (!formData.nomeCompleto) errors.nomeCompleto = "Nome é obrigatório";
    if (!formData.email) errors.email = "Email é obrigatório";
    // ... outras validações

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setSnackbarSeverity("error");
      setSnackbarMsg("Por favor, corrija os erros do formulário.");
      setOpenSnackbar(true);
      return;
    }

    if (!user) {
      setSnackbarSeverity("error");
      setSnackbarMsg("Você precisa estar logado para fazer um pedido.");
      setOpenSnackbar(true);
      return;
    }

    if (!carinho || carinho.length === 0) {
      setSnackbarSeverity("error");
      setSnackbarMsg("Seu carrinho está vazio.");
      setOpenSnackbar(true);
      return;
    }

    if (!favoriteItem || favoriteItem.length === 0) {
      setSnackbarSeverity("error");
      setSnackbarMsg("Seu carrinho está vazio.");
      setOpenSnackbar(true);
    }

    try {
      await addDoc(collection(db, "pedidos"), {
        dadosEntrega: formData,
        produtos: carinho,
        itemFavorito: favoriteItem,
        usuario: {
          id: user.id || user.uid,
          nome: user.name || user.displayName || "",
          email: user.email || "",
        },
        status: "Pendente",
        createdAt: serverTimestamp(),
      });

      setSnackbarSeverity("success");
      setSnackbarMsg("Pedido enviado com sucesso!");
      setOpenSnackbar(true);

      // Limpa formulário e carrinho se quiser
      setFormData({
        nomeCompleto: "",
        email: "",
        telefone: "",
        cnpj: "",
        cep: "",
        bairro: "",
        cidade: "",
        estado: "",
        rua: "",
        numeroDoEdificios: "",
        referencia: "",
        country: "",
      });
      // Também pode limpar o carrinho aqui se quiser, usando setCarinho([]) do contexto global


      limparCarrinho();
       limparFavorito();
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      setSnackbarSeverity("error");
      setSnackbarMsg("Erro ao enviar pedido. Tente novamente.");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Stack
        sx={{
          width: "100%",
          minHeight: "100vh", // Permite crescer
          marginTop: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          padding: "10px",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            maxWidth: "700px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
            "@media (max-width: 750px)": {
              width: "100%",
              height: "auto",
            },
          }}
        >
          <CardStylSearche.wrapperfort>
            <Stack
              sx={{
                paddingBottom: "0.20rem",
                color: "var(--green-color)",
                fontSize: "1.8rem",
                gap: "1.9rem",
                width: "100%",
              }}
            >
              <Typography
                variant="h2"
                component="h2"
                sx={(theme) => ({
                  fontSize: "1.8rem",
                  [theme.breakpoints.down(500)]: {
                    fontSize: "1.2rem",
                  },
                  [theme.breakpoints.down(282)]: {
                    fontSize: "1rem",
                  },
                })}
              >
                Confirmar dados da entrega
              </Typography>
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
                  label="Nome Completo"
                  variant="outlined"
                  size="small"
                  value={formData.nomeCompleto}
                  onChange={(e) => handleChange("nomeCompleto", e.target.value)}
                  error={!!formErrors.nomeCompleto}
                  helperText={formErrors.nomeCompleto}
                  FormHelperTextProps={{ sx: { fontSize: "0.90rem" } }}
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
                  value={formData.telefone}
                  onChange={handleTelefoneChange}
                  error={!!formErrors.telefone}
                  helperText={formErrors.telefone}
                  FormHelperTextProps={{ sx: { fontSize: "0.90rem" } }}
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
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  FormHelperTextProps={{ sx: { fontSize: "0.90rem" } }}
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
                  label="CPF ou CNPJ"
                  variant="outlined"
                  size="small"
                  value={formData.cnpj}
                  onChange={(e) => handleChange("cnpj", e.target.value)}
                  error={!!formErrors.cnpj}
                  helperText={
                    formErrors.cnpj ||
                    "Digite seu CPF (11 dígitos) ou CNPJ (14 dígitos)"
                  }
                  FormHelperTextProps={{
                    sx: { fontSize: "0.75rem", color: "#666" },
                  }}
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
                  label="CEP / ZIP / CAP"
                  variant="outlined"
                  size="small"
                  value={formData.cep}
                  onChange={(e) => handleChange("cep", e.target.value)}
                  onBlur={handleCheckPostalCode}
                  error={!!formErrors.cep}
                  helperText={formErrors.cep}
                  FormHelperTextProps={{ sx: { fontSize: "0.90rem" } }}
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
                  value={formData.rua}
                  onChange={(e) => handleChange("rua", e.target.value)}
                  error={!!formErrors.rua}
                  helperText={formErrors.rua}
                  FormHelperTextProps={{ sx: { fontSize: "0.90rem" } }}
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
                  variant="outlined"
                  size="small"
                  label="Número do Edifício"
                  value={formData.numeroDoEdificios}
                  onChange={(e) =>
                    handleChange("numeroDoEdificios", e.target.value)
                  }
                  error={!!formErrors.numeroDoEdificios}
                  helperText={formErrors.numeroDoEdificios}
                  FormHelperTextProps={{ sx: { fontSize: "0.90rem" } }}
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
                  value={formData.bairro}
                  onChange={(e) => handleChange("bairro", e.target.value)}
                  error={!!formErrors.bairro}
                  helperText={formErrors.bairro}
                  FormHelperTextProps={{ sx: { fontSize: "0.90rem" } }}
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
                  value={formData.cidade}
                  onChange={(e) => handleChange("cidade", e.target.value)}
                  error={!!formErrors.cidade}
                  helperText={formErrors.cidade}
                  FormHelperTextProps={{ sx: { fontSize: "0.90rem" } }}
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
                  value={formData.estado}
                  onChange={(e) => handleChange("estado", e.target.value)}
                  error={!!formErrors.estado}
                  helperText={formErrors.estado}
                  FormHelperTextProps={{ sx: { fontSize: "0.90rem" } }}
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
                  select
                  label="País"
                  value={formData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  size="small"
                  fullWidth
                >
                  <MenuItem value="Brasil">Brasil</MenuItem>
                  <MenuItem value="Estados Unidos">Estados Unidos</MenuItem>
                  <MenuItem value="Itália">Itália</MenuItem>
                  <MenuItem value="Moçambique">Moçambique</MenuItem>
                </TextField>
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
                  sx={{ width: "100%", fontSize: "1.5rem", fontWeight: "700" }}
                  type="text"
                  label="Referência"
                  variant="outlined"
                  size="small"
                  value={formData.referencia || ""}
                  onChange={(e) => {
                    if (e.target.value.length <= 100) {
                      handleChange("referencia", e.target.value);
                    }
                  }}
                  helperText="Ex: Casa amarela, perto do mercado X"
                  FormHelperTextProps={{
                    sx: { fontSize: "0.75rem", color: "#666" },
                  }}
                />
              </Box>
            </CardStylSearche.containerBox>

            <Box>
              <Button
                type="submit"
                sx={{
                  background: "#33bf30",
                  border: "none !important",
                  outline: "none !important",
                  color: "#fff",
                  padding: "1rem 2.4rem",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "2rem",
                  minWidth: "450px",
                  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.16)",
                  transition: "all 0.3s",
                  "&:hover": { background: "#3cb815" },
                  "&:disabled": { background: "#ccc" },
                  "@media (max-width: 900px)": {
                    minWidth: "200px",
                  },
                }}
              >
                Enviar
              </Button>
            </Box>
          </CardStylSearche.wrapperfort>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={5000}
            onClose={() => setOpenSnackbar(false)}
          >
            <Alert
              onClose={() => setOpenSnackbar(false)}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMsg}
            </Alert>
          </Snackbar>
        </Box>
      </Stack>
    </>
  );
};

export default FormularioEntrega;
