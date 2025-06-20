import React, { useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../services/firebaseConnection";
import { useAuth } from "../contexts/AuthContext";

const mensagensAutomaticas = [
  "Oi, meu querido! Bom dia! 😊 Você está falando com Cristiano, assistente virtual da WhiwaSana. Como posso te ajudar hoje?",
];

const ChatWhatsApp  = () => {
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { type: "incoming", text: "Olá, como posso ajudá-lo hoje?" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editMessageIndex, setEditMessageIndex] = useState(null);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);
  const [automaticMessageIndex, setAutomaticMessageIndex] = useState(0);

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Buscar mensagens do Firestore
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "chats", user.id, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesFirestore = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesFirestore);
    });

    return () => unsubscribe();
  }, [user]);

  // Carregar mensagens do localStorage
  useEffect(() => {
    const savedMessages =
      JSON.parse(localStorage.getItem("chatMessages")) || [];
    setMessages(savedMessages);
  }, []);

  // Salvar no localStorage
  const saveMessagesToLocalStorage = (messages) => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  };

  // Toggle do chat
  const toggleChat = () => setIsChatOpen((prev) => !prev);

  // ✅ Enviar mensagem de texto
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    await addDoc(collection(db, "chats", user.id, "messages"), {
      type: "outgoing",
      text: message,
      createdAt: serverTimestamp(),
      userId: user.id,
      userName: user.name,
    });

    setMessage("");
    setEditMessageIndex(null);
  };

  // ✅ Enviar resposta automática
  const responderMensagem = async () => {
    setIsTyping(false);

    const resposta =
      automaticMessageIndex < mensagensAutomaticas.length
        ? mensagensAutomaticas[automaticMessageIndex]
        : "Se precisar de mais alguma coisa, estou por aqui! 😊";

    const newMessage = {
      type: "incoming",
      text: resposta,
      createdAt: serverTimestamp(),
      userId: "bot",
    };

    try {
      await addDoc(collection(db, "chats", user.id, "messages"), newMessage);
      setAutomaticMessageIndex(automaticMessageIndex + 1);
    } catch (error) {
      console.error("Erro ao enviar resposta automática:", error);
    }
  };

  // ✅ Editar mensagem
  const handleEditMessage = (index) => {
    const selectedMsg = messages[index];
    if (selectedMsg?.text) {
      setMessage(selectedMsg.text);
      setEditMessageIndex(index);
    }
  };

  const handleUpdateMessage = async () => {
    const messageToUpdate = messages[editMessageIndex];
    if (!messageToUpdate?.id) return;

    try {
      await updateDoc(
        doc(db, "chats", user.id, "messages", messageToUpdate.id),
        { text: message }
      );

      setMessage("");
      setEditMessageIndex(null);
    } catch (error) {
      console.error("Erro ao atualizar mensagem:", error);
    }
  };

  // ✅ Deletar mensagem
  const handleDeleteMessage = async (index) => {
    const messageToDelete = messages[index];
    if (!messageToDelete?.id) return;

    try {
      await deleteDoc(
        doc(db, "chats", user.id, "messages", messageToDelete.id)
      );
    } catch (error) {
      console.error("Erro ao deletar mensagem:", error);
    }
  };

  // ✅ Modal de opções
  const onEdit = () => {
    handleEditMessage(selectedMessageIndex);
    handleCloseModal();
  };

  const onDelete = () => {
    handleDeleteMessage(selectedMessageIndex);
    handleCloseModal();
  };

  // ✅ Enviar áudio
  const handleMicPress = async () => {
    setIsMicActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = new MediaRecorder(stream);
      newRecorder.ondataavailable = (event) => setAudioBlob(event.data);
      newRecorder.start();
      setRecorder(newRecorder);
    } catch (error) {
      console.error("Erro ao acessar o microfone:", error);
      setIsMicActive(false);
    }
  };

  const handleMicRelease = () => {
    if (recorder) {
      recorder.stop();
      recorder.stream.getTracks().forEach((track) => track.stop());
      setRecorder(null);
      setIsMicActive(false);

      if (audioBlob) {
        const audioUrl = URL.createObjectURL(audioBlob);

        const newMessage = {
          type: "outgoing",
          audio: audioUrl,
          createdAt: serverTimestamp(),
          userId: user.id,
          userName: user.name,
        };

        addDoc(collection(db, "chats", user.id, "messages"), newMessage);

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        saveMessagesToLocalStorage(updatedMessages);
      }
    }
  };

  // ✅ Upload de mídia
  const handleMediaClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*,video/*";
    fileInput.onchange = (e) => {
      if (e.target.files.length) {
        setMediaFile(e.target.files[0]);
        setIsModalOpen(true);
      }
    };
    fileInput.click();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMediaFile(null);
  };

  const handleConfirmSend = async () => {
    if (!mediaFile) return;

    const mediaUrl = URL.createObjectURL(mediaFile);
    const mediaType = mediaFile.type.startsWith("image/")
      ? "image"
      : mediaFile.type.startsWith("video/")
      ? "video"
      : "file";

    const newMessage = {
      type: "outgoing",
      media: mediaUrl,
      mediaType,
      createdAt: serverTimestamp(),
      userId: user.id,
      userName: user.name,
    };

    await addDoc(collection(db, "chats", user.id, "messages"), newMessage);

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    saveMessagesToLocalStorage(updatedMessages);

    setMediaFile(null);
    setIsModalOpen(false);




    
  }  

   return (
    <Stack
      sx={{
        display: "flex",
        marginTop: "5rem",
        marginLeft: "auto",
        marginRight: "auto",

        alignItems: "center",
        justifyContent: "center",
        // bgcolor: "#e3f2fd",
        gap: "2rem",
        // padding: "20px 20px",
        position: "absolute",
        height: "10vh",

        zIndex: 9999,
      }}
    >
      <Stack className="show-chatbot">
        <button className="chatbot-toggler" onClick={toggleChat}>
          {isChatOpen ? (
            <CloseIcon
              sx={{ fontSize: "30px", color: "#fff", cursor: "pointer" }}
            />
          ) : (
            <WhatsAppIcon
              sx={{ fontSize: "30px", color: "#fff", cursor: "pointer" }}
            />
          )}
        </button>

        {isChatOpen && (
          <Box className="chatbot">
            <Box
              sx={{
                background: "#33bf30",
                padding: "16px 0",
                textAlign: "center",
                position: "relative",
              }}
            >
              <h2 style={{ color: "#fff", fontSize: "1.4rem" }}>
                 Fale com a gente
              </h2>
            </Box>

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
                        : "transparent", // verde para user
                    padding: "8px",
                    borderRadius: "10px",
                    marginBottom: "4px",
                  }}
                >
                  {msg.type === "incoming" && (
                    <WhatshotIcon sx={{ marginRight: 1 }} />
                  )}

                  {msg.audio ? (
                    <audio controls src={msg.audio}></audio>
                  ) : msg.mediaType === "image" ? (
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

                  {/* Ícones editar/deletar apenas para mensagens do próprio usuário */}
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
                        onClick={() => onEdit(index)}
                      />
                      <DeleteIcon
                        sx={{
                          fontSize: "18px",
                          cursor: "pointer",
                          color: "#d32f2f",
                        }}
                        onClick={() => onDelete(index)}
                      />
                    </Box>
                  )}
                </li>
              ))}

              <div ref={messagesEndRef} />
            </ul>

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
                  transition: "box-shadow 0.3s ease",
                  "&:hover": { boxShadow: "0 0 10px #3cb815" },
                  "&:active": { boxShadow: "0 0 15px #3cb815" },
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
      </Stack>

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
          <img
            src={mediaFile ? URL.createObjectURL(mediaFile) : ""}
            alt="Preview"
            style={{ maxWidth: "100%", margin: "10px 0" }}
          />

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
                borderRadius: "15px 0px 15px 0px",
                bgcolor: "rgb(51, 191, 48)",
                color: "#fff",
                boxShadow: "20px 20px 50px rgba(0, 0, 0, 0.4)",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "bold",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 0 15px 5px #3cb815",
                  background: "#3cb815",
                  transform: "scale(1.05)",
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
                fontSize: "15px",
                fontWeight: "bold",
                borderRadius: "15px 0px 15px 0px",
                bgcolor: "rgb(51, 191, 48)",
                color: "#fff",
                boxShadow: "20px 20px 50px rgba(0, 0, 0, 0.4)",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 0 15px 5px #f75f1d",
                  background: "#3cb815",
                  transform: "scale(1.05)",
                  color: "#f75f1d",
                },
              }}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Stack>
  );