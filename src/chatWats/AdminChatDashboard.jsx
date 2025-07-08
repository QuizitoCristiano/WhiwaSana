import React, { useEffect, useState } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

import { db } from "../../firebaseconfig/firebaseconfig";
import AdminChat from "./AdminChat";

import { Box, Typography, Stack, Avatar } from "@mui/material";

// Função para gerar iniciais do nome
const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const ChatAdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);

  useEffect(() => {
    const fetchClientsData = async () => {
      const conversationsSnapshot = await getDocs(
        collection(db, "conversations")
      );
      const clientIds = conversationsSnapshot.docs.map((doc) => doc.id);

      console.log("📦 Conversas encontradas:", clientIds);

      const clientsData = await Promise.all(
        clientIds.map(async (id) => {
          const userDoc = await getDoc(doc(db, "users", id));
          if (userDoc.exists()) {
            console.log("✅ Usuário encontrado:", userDoc.data());
            return { id, ...userDoc.data() };
          } else {
            console.warn("⚠️ Usuário não encontrado para o ID:", id);
            return { id, name: "Usuário não encontrado" };
          }
        })
      );

      console.log("📋 Lista final de usuários:", clientsData);
      setClients(clientsData);
    };

    fetchClientsData();
  }, []);

  return (
    <Stack
      direction="row"
      sx={{
        maxWidth: "1290px",
        margin: "auto",
        height: "80vh",
        border: "1px solid #ccc",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {/* Lista lateral de clientes */}
      <Box
        sx={{
          width: "30%",
          borderRight: "1px solid #ddd",
          bgcolor: "#f5f5f5",
          padding: 1,
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h6"
          sx={{ textAlign: "center", mb: 1, color: "#3cb815" }}
        >
          Clientes
        </Typography>

        {clients.length === 0 ? (
          <Typography textAlign="center" color="#000">
            Nenhuma conversa encontrada.
          </Typography>
        ) : (
          clients.map((client) => (
            <Box
              key={client.id}
              sx={{
                mb: 2,
                p: 1,
                borderRadius: "8px",
                bgcolor: selectedClientId === client.id ? "#dff0d8" : "#fff",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                "&:hover": {
                  bgcolor: "#e8f5e9",
                },
              }}
              onClick={() => setSelectedClientId(client.id)}
            >
              {/* Avatar com iniciais */}
              <Avatar
                sx={{
                  bgcolor: "#3cb815",
                  color: "#fff",
                  fontSize: "0.9rem",
                  width: 30,
                  height: 30,
                }}
              >
                {getInitials(client.name)}
              </Avatar>

              {/* Informações do cliente */}
              <Box sx={{ color: "#000" }}>
                <Typography fontWeight="bold" fontSize="0.50rem">
                  {client.name || "Nome não disponível"}
                </Typography>
                <Typography fontSize="0.40rem">
                  {client.email || "Email não disponível"}
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>

      {/* Área do chat */}
      <Box sx={{ width: "70%", padding: 2 }}>
        {selectedClientId ? (
          <AdminChat
            clientId={selectedClientId}
            clientName={clients.find((c) => c.id === selectedClientId)?.name}
          />
        ) : (
          <Typography sx={{ textAlign: "center", mt: 4 }}>
            Selecione um cliente para iniciar o atendimento.
          </Typography>
        )}
      </Box>
    </Stack>
  );
};

export default ChatAdminDashboard;
