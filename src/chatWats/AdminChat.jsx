import React, { useEffect, useState, useRef } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import "./chatStyles.css";
import { db } from "../../firebaseconfig/firebaseconfig";

import { Box, Button, Stack, Modal, Typography } from "@mui/material";
import {
  Send as SendIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const AdminChat = ({ clientId, clientName }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [editMessageIndex, setEditMessageIndex] = useState(null);
  const messagesEndRef = useRef(null);

  // 🔥 Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔥 Buscar mensagens em tempo real
  useEffect(() => {
    if (!clientId) return; // evita erro se clientId for undefined

    const q = query(
      collection(db, "conversations", clientId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [clientId]);

  // ✅ Enviar mensagem
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    await addDoc(collection(db, "conversations", clientId, "messages"), {
      text: message,
      createdAt: serverTimestamp(),
      userId: "admin",
      userName: "Atendente WhiwaSana",
      type: "incoming", // Mensagem do admin para cliente
    });

    setMessage("");
    setEditMessageIndex(null);
  };

  // ✅ Editar mensagem
  const handleUpdateMessage = async () => {
    const msg = messages[editMessageIndex];
    if (!msg?.id) return;

    await updateDoc(doc(db, "conversations", clientId, "messages", msg.id), {
      text: message,
    });

    setMessage("");
    setEditMessageIndex(null);
  };

  const handleEditMessage = (index) => {
    const msg = messages[index];
    if (msg?.text) {
      setMessage(msg.text);
      setEditMessageIndex(index);
    }
  };

  const handleDeleteMessage = async (index) => {
    const msg = messages[index];
    if (!msg?.id) return;

    await deleteDoc(doc(db, "conversations", clientId, "messages", msg.id));
  };

  return (
    <Stack
      sx={{
        display: "flex",
        maxWidth: "1290px",
        margin: "auto",
        padding: "20px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box className="chatbot">
        <Box
          sx={{
            background: "#33bf30",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#fff", fontSize: "1.4rem" }}>
            Chat com: {clientName || clientId}
          </h2>
        </Box>

        <ul className="chatbox">
          {messages.map((msg, index) => (
            <li
              key={msg.id || index}
              className={`chat ${msg.type}`}
              onClick={() => handleEditMessage(index)}
              style={{
                cursor: "pointer",
                display: "flex",
                width: "100%",
                justifyContent:
                  msg.type === "incoming" ? "flex-start" : "flex-end",
                backgroundColor:
                  msg.type === "incoming" ? "#e9ecef" : "#d4edda",
                padding: "6px",
                borderRadius: "10px",
                marginBottom: "4px",
              }}
            >
              <p style={{ margin: 0, fontWeight: "bold", color: "#000" }}>
                [{msg.type}] {msg.userName}: {msg.text}
              </p>
            </li>
          ))}
          <div ref={messagesEndRef} />
        </ul>

        <div className="chat-input">
          <textarea
            className="TheNewtextarea"
            placeholder="Digite sua mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            onClick={
              editMessageIndex !== null
                ? handleUpdateMessage
                : handleSendMessage
            }
            disabled={message.trim() === ""}
            sx={{
              color: message.trim() === "" ? "#ccc" : "#3cb815",
              cursor: message.trim() === "" ? "not-allowed" : "pointer",
              minWidth: "40px",
            }}
          >
            {editMessageIndex !== null ? (
              <EditIcon sx={{ fontSize: "1.4rem" }} />
            ) : (
              <SendIcon sx={{ fontSize: "1.4rem" }} />
            )}
          </Button>
        </div>
      </Box>
    </Stack>
  );
};

export default AdminChat;
