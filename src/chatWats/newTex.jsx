import React, { useState, useEffect, useRef } from "react";
import {
  onSnapshot,
  query,
  collection,
  orderBy,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebaseconfig/firebaseconfig";
import { useAuth } from "../UserAuthContext/AuthContext";

import {
  Box,
  Button,
  Stack,
  TextField,
  Modal,
  IconButton,
} from "@mui/material";



import {
  Close as CloseIcon,
  WhatsApp as WhatsAppIcon,
  Whatshot as WhatshotIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Mic as MicIcon,
  Send as SendIcon,
  AddAPhoto as AddAPhotoIcon,
} from "@mui/icons-material";

const mensagensAutomaticas = [
  "Oi, meu querido! Bom dia! 😊 Você está falando com Cristiano. Como posso te ajudar hoje?",
];

const ChatWhatsApp = ({ isAdmin, selectedClientId }) => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [editMessageId, setEditMessageId] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const messagesEndRef = useRef(null);

  const conversationId = isAdmin ? selectedClientId : user.uid;

  // 🔥 Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔥 Escutar mensagens em tempo real
  useEffect(() => {
    if (!conversationId) return;

    const q = query(
      collection(db, "conversations", conversationId, "messages"),
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
  }, [conversationId]);

  // 🤖 Mensagem automática se for a primeira mensagem
  useEffect(() => {
    if (!messages.length && conversationId) {
      const sendWelcome = async () => {
        await addDoc(
          collection(db, "conversations", conversationId, "messages"),
          {
            text: mensagensAutomaticas[0],
            createdAt: serverTimestamp(),
            userId: "bot",
            userName: "Cristiano Bot",
            type: "incoming",
            edited: false,
          }
        );
      };
      sendWelcome();
    }
  }, [messages, conversationId]);

  // ✅ Enviar ou atualizar mensagem
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    if (editMessageId) {
      const msgRef = doc(
        db,
        "conversations",
        conversationId,
        "messages",
        editMessageId
      );
      await updateDoc(msgRef, {
        text: message,
        edited: true,
      });
      setEditMessageId(null);
    } else {
      await addDoc(
        collection(db, "conversations", conversationId, "messages"),
        {
          text: message,
          createdAt: serverTimestamp(),
          userId: user.uid,
          userName: user.name,
          type: isAdmin ? "incoming" : "outgoing",
          edited: false,
        }
      );
    }

    setMessage("");
  };

  // ✅ Editar mensagem
  const handleEditMessage = (msg) => {
    setMessage(msg.text);
    setEditMessageId(msg.id);
  };

  // ✅ Deletar mensagem
  const handleDeleteMessage = async (msg) => {
    const msgRef = doc(
      db,
      "conversations",
      conversationId,
      "messages",
      msg.id
    );
    await deleteDoc(msgRef);
  };

  // ✅ Upload de mídia (simples)
  const handleMediaUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,video/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setMediaFile(file);
        setIsModalOpen(true);
      }
    };
    input.click();
  };


  const handleConfirmSend = async () => {
      if (!mediaFile) return;
  
      const mediaUrl = URL.createObjectURL(mediaFile);
      const mediaType = mediaFile.type.startsWith("image/")
        ? "image"
        : mediaFile.type.startsWith("video/")
        ? "video"
        : "file";
  
      await addDoc(collection(db, "conversations", conversationId, "messages"), {
        media: mediaUrl,
        mediaType,
        createdAt: serverTimestamp(),
        userId: user.uid,
        userName: user.name,
        type: isAdmin ? "incoming" : "outgoing",
      });
  
      setMediaFile(null);
      setIsModalOpen(false);
    };



  const handleCloseModal = () => {
    setMediaFile(null);
    setIsModalOpen(false);
  };

  return (
  <Stack
    sx={{
      display: "flex",
      maxWidth: "1290px",
      marginLeft: "auto",
      marginRight: "auto",
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      gap: "2rem",
      padding: "20px",
    }}
  >
    <Stack className="show-chatbot">
      <button className="chatbot-toggler" onClick={toggleChat}>
        {isChatOpen ? (
          <CloseIcon sx={{ fontSize: "30px", color: "#fff" }} />
        ) : (
          <WhatsAppIcon sx={{ fontSize: "30px", color: "#fff" }} />
        )}
      </button>

      {isChatOpen && (
        <Box className="chatbot">
          {/* Header */}
          <Box
            sx={{
              background: "#33bf30",
              padding: "16px 0",
              textAlign: "center",
            }}
          >
            <h2 style={{ color: "#fff", fontSize: "1.4rem" }}>
              Fale com a gente
            </h2>
          </Box>

          {/* Chat Messages */}
          <ul className="chatbox">
            {messages.map((msg, index) => (
              <li
                key={msg.id || index}
                className={`chat ${msg.type}`}
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent:
                    msg.type === "incoming" ? "flex-start" : "flex-end",
                  backgroundColor:
                    msg.type === "outgoing" && msg.userId === user.uid
                      ? "#d4edda"
                      : "transparent",
                  padding: "8px",
                  borderRadius: "10px",
                  marginBottom: "4px",
                }}
              >
                {msg.type === "incoming" && (
                  <WhatshotIcon sx={{ marginRight: 1 }} />
                )}

                {msg.mediaType === "image" ? (
                  <img
                    src={msg.media}
                    alt="Arquivo enviado"
                    style={{ maxWidth: "200px", margin: "5px" }}
                  />
                ) : msg.mediaType === "video" ? (
                  <video
                    controls
                    src={msg.media}
                    style={{ maxWidth: "200px", margin: "5px" }}
                  />
                ) : (
                  <p style={{ margin: 0 }}>{msg.text}</p>
                )}

                {msg.userId === user.uid && (
                  <Box
                    sx={{
                      display: "flex",
                      gap: "0.5rem",
                      alignItems: "center",
                      marginLeft: "8px",
                    }}
                  >
                    <EditIcon
                      sx={{
                        fontSize: "18px",
                        cursor: "pointer",
                        color: "#1976d2",
                      }}
                      onClick={() => handleEditMessage(index)}
                    />
                    <DeleteIcon
                      sx={{
                        fontSize: "18px",
                        cursor: "pointer",
                        color: "#d32f2f",
                      }}
                      onClick={() => handleDeleteMessage(index)}
                    />
                  </Box>
                )}
              </li>
            ))}
            <div ref={messagesEndRef} />
          </ul>

          {/* Chat Input */}
          <div className="chat-input">
            <AddAPhotoIcon
              onClick={handleMediaClick}
              sx={{
                color: "#3cb815",
                fontSize: "1.4rem",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "50%",
                backgroundColor: "#fff",
                boxShadow: "0 0 5px #3cb815",
                "&:hover": { boxShadow: "0 0 10px #3cb815" },
              }}
            />
            <textarea
              className="TheNewtextarea"
              placeholder="Enviar Mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <Button
              onClick={
                editMessageIndex !== null
                  ? handleUpdateMessage
                  : handleSendMessage
              }
              onMouseDown={handleMicPress}
              onMouseUp={handleMicRelease}
            >
              {message.trim() ? (
                editMessageIndex !== null ? (
                  <EditIcon
                    sx={{
                      color: "#3cb815",
                      fontSize: "1.4rem",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <SendIcon
                    sx={{
                      color: "#3cb815",
                      fontSize: "1.4rem",
                      cursor: "pointer",
                    }}
                  />
                )
              ) : (
                <MicIcon
                  sx={{
                    color: isMicActive ? "#3cb815" : "#ccc",
                    fontSize: "1.4rem",
                    cursor: "pointer",
                  }}
                />
              )}
            </Button>
          </div>
        </Box>
      )}

      {/* Modal de mídia */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            maxWidth: 450,
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          {mediaFile && (
            <img
              src={URL.createObjectURL(mediaFile)}
              alt="Preview"
              style={{ maxWidth: "100%", margin: "10px 0" }}
            />
          )}

          <h5
            style={{
              fontWeight: 800,
              fontSize: "18px",
              marginBottom: "20px",
              color: "rgb(51, 191, 48)",
            }}
          >
            Confirmar envio de mídia
          </h5>
          <Box
            sx={{
              marginTop: "10px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              onClick={handleCloseModal}
              sx={{
                height: "50px",
                width: "40%",
                borderRadius: "15px 0 15px 0",
                bgcolor: "rgb(51, 191, 48)",
                color: "#fff",
                "&:hover": {
                  background: "#3cb815",
                },
              }}
            >
              Cancelar
            </Button>

            <Button
              onClick={handleConfirmSend}
              sx={{
                height: "50px",
                width: "40%",
                borderRadius: "15px 0 15px 0",
                bgcolor: "rgb(51, 191, 48)",
                color: "#fff",
                "&:hover": {
                  background: "#3cb815",
                },
              }}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Stack>
  </Stack>
);

 
};

export default ChatWhatsApp;







