import React, { useState, useEffect, useRef, useContext, use } from "react";

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
  getDoc,
  setDoc,
  getFirestore,
  where, // 🔥 Importa aqui
  getDocs, // Adicionado para verificar mensagens existentes
  runTransaction,
} from "firebase/firestore";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import "./chatStyles.css";
import { db } from "../../firebaseconfig/firebaseconfig";

import { Box, Button, Modal, Stack } from "@mui/material";
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
import { useAuth } from "../UserAuthContext/AuthContext";
import { uploadFile } from "./firebaseStorage";
import { getStorage, ref, deleteObject } from "firebase/storage";

const storage = getStorage();

const ChatWhatsApp = ({ selectedClientId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [editMessageIndex, setEditMessageIndex] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);
  const [actionModalOpen, setActionModalOpen] = useState(false);


  // Crie um estado para contar novas mensagens não lidas
  const [unreadCount, setUnreadCount] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");


 useEffect(() => {
  if (!isChatOpen && messages.length > 0) {
    // Só conta se a última mensagem não for do próprio usuário
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.userId !== user?.id) {
      setUnreadCount(prev => prev + 1);

    }
  }
 }, [messages]);

 useEffect(() => {
  if (isChatOpen) setUnreadCount(0);
 }, [isChatOpen])

 useEffect(() => {
     if (!isChatOpen && messages.length > 0) {
       const lastMsg = messages[messages.length - 1];
       if (lastMsg.userId !== user?.id) {
         setToastMsg(lastMsg.text || "Nova mensagem recebida!");
         setShowToast(true);
       }
     }
   }, [messages]);


  const handleOpenActionModal = (index) => {
    setSelectedMessageIndex(index);
    setActionModalOpen(true);
  };

  const handleCloseActionModal = () => {
    setSelectedMessageIndex(null);
    setActionModalOpen(false);
  };

  const messagesEndRef = useRef(null);

  const { user, isAdmin } = useAuth();

  const conversationId = isAdmin ? selectedClientId : user?.id;

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  // 🔥 Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔥 Escutar mensagens
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

  /// 🟢 Mensagem automática — aparece apenas uma vez no início da conversa
  useEffect(() => {
    if (!conversationId) return;

    const sendWelcomeIfNeeded = async () => {
      const conversationRef = doc(db, "conversations", conversationId);

      await runTransaction(db, async (transaction) => {
        const convDoc = await transaction.get(conversationRef);

        if (!convDoc.exists()) {
          // Cria a conversa e envia a mensagem automática
          transaction.set(conversationRef, {
            createdAt: serverTimestamp(),
            userId: user.id,
            userName: user.name,
            welcomeSent: true,
          });
          const messagesRef = collection(
            db,
            "conversations",
            conversationId,
            "messages"
          );
          transaction.set(doc(messagesRef), {
            text: mensagensAutomaticas[0],
            createdAt: serverTimestamp(),
            userId: "bot",
            userName: "Cristiano Bot",
            type: "incoming",
          });
        } else if (!convDoc.data().welcomeSent) {
          // Marca que já enviou a mensagem automática
          transaction.update(conversationRef, { welcomeSent: true });
          const messagesRef = collection(
            db,
            "conversations",
            conversationId,
            "messages"
          );
          transaction.set(doc(messagesRef), {
            text: mensagensAutomaticas[0],
            createdAt: serverTimestamp(),
            userId: "bot",
            userName: "Cristiano Bot",
            type: "incoming",
          });
        }
        // Se já existe e welcomeSent: true, não faz nada
      });
    };

    sendWelcomeIfNeeded();
  }, [conversationId]);

  // 🕐 Função para gerar saudação conforme o horário
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Bom dia";
    if (hour >= 12 && hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  // 🟢 Mensagem automática com saudação dinâmica
  const mensagensAutomaticas = [
    `${getGreeting()}! 😊 Seja bem-vindo à WhiwaSana. Me chamo Cristiano, seu assistente virtual. Como posso te ajudar hoje?`,
  ];

  //🔥 1. Verificar se é texto e se está dentro dos 10 minutos:

  const canEditMessage = (msg) => {
    if (msg.mediaType) return false; // Se for mídia, não pode editar
    if (msg.userId !== user?.id && !isAdmin) return false; // Só o dono ou admin

    const createdAt = msg.createdAt?.toDate?.();
    if (!createdAt) return false;

    const now = new Date();
    const diffMinutes = (now - createdAt) / (1000 * 60);
    return diffMinutes <= 10;
  };

  // ✅ Enviar mensagem

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    if (!user || !user.id) {
      console.error("Usuário não autenticado.");
      return;
    }

    try {
      let currentConversationId = conversationId;
      
      // Se não tem conversationId, cria uma nova conversa
      if (!currentConversationId) {
        const newConversationRef = await addDoc(collection(db, "conversations"), {
          userId: user.uid,
          userName: user.displayName || user.email,
          createdAt: serverTimestamp(),
          welcomeSent: false
        });
        currentConversationId = newConversationRef.id;
        console.log("Nova conversa criada:", currentConversationId);
      }
      
      // Agora usa o currentConversationId
      const conversationRef = doc(db, "conversations", currentConversationId);

      // Verifica se a conversa existe
      const conversationDoc = await getDoc(doc(db, "conversations", currentConversationId));
      
      if (!conversationDoc.exists()) {
        console.error("Conversa não encontrada:", currentConversationId);
        // Cria a conversa se não existir
        await setDoc(doc(db, "conversations", currentConversationId), {
          userId: user.uid,
          userName: user.displayName || user.email,
          createdAt: serverTimestamp(),
          welcomeSent: false
        });
      }

      // Agora adiciona a mensagem normalmente
      await addDoc(
        collection(db, "conversations", currentConversationId, "messages"),
        {
          text: message,
          createdAt: serverTimestamp(),
          userId: user.id,
          userName: user.name,
          type: isAdmin ? "incoming" : "outgoing",
        }
      );

      setMessage("");
      setEditMessageIndex(null);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  const handleUpdateMessage = async () => {
    const msg = messages[editMessageIndex];
    if (!msg?.id) return;

    await updateDoc(
      doc(db, "conversations", conversationId, "messages", msg.id),
      { text: message }
    );

    setMessage("");
    setEditMessageIndex(null);
  };

  // ✅ Editar mensagem
  const handleEditMessage = (index) => {
    const msg = messages[index];
    const isOwnMessage = msg.userId === user?.id || isAdmin;

    if (!isOwnMessage) {
      alert("Você não pode editar esta mensagem.");
      return;
    }

    if (msg?.text) {
      setMessage(msg.text);
      setEditMessageIndex(index);
    }
  };


  // Função para extrair o caminho do arquivo a partir da URL do Storage


  function getStoragePathFromUrl(url) {
    // Pega o trecho depois de '/o/' e antes do '?'
    const path = decodeURIComponent(url.split('/o/')[1].split('?')[0]);
    return path;
  }

 async function deleteMediaFromStorage(mediaUrl) {
  if (!mediaUrl) return;

  try {
    const storage = getStorage();
    const filePath = getStoragePathFromUrl(mediaUrl);
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    // Opcional: console.log('Arquivo removido com sucesso no Storage')

  } catch (error) {
    console.error('Erro ao deletar arquivo do Storage:', error);
  }
 }


  // ✅ Deletar mensagem
  const handleDeleteMessage = async (index) => {
    const msg = messages[index];
    const isOwnMessage = msg.userId === user?.id || isAdmin;

    if (!isOwnMessage) {
      alert("Você não pode deletar esta mensagem.");
      return;
    }

    if (!msg?.id) return;

    await deleteDoc(
      doc(db, "conversations", conversationId, "messages", msg.id)
    );
    if (msg.media) {
      await deleteMediaFromStorage(msg.media);
    }
  };

  // ✅ Upload de mídia
  const MAX_FILE_SIZE_MB = 20; // ou 20, se preferir permitir vídeos maiores
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "video/mp4"];

  const handleMediaClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ALLOWED_TYPES.join(",");
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        if (!ALLOWED_TYPES.includes(file.type)) {
          alert("Tipo de arquivo não permitido!");
          return;
        }
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          alert("Arquivo muito grande! Máximo permitido: 10MB");
          return;
        }
        setMediaFile(file);
        setIsModalOpen(true);
      }
    };
    fileInput.click();
  };

  const handleConfirmSend = async () => {
    if (!mediaFile) return;

    setIsUploading(true); // 👉 Começa o loading

    try {
      const mediaUrl = await uploadFile(mediaFile, "chatMedia");

      if (!mediaUrl) {
        alert("Erro ao enviar o arquivo.");
        return;
      }

      await addDoc(
        collection(db, "conversations", conversationId, "messages"),
        {
          media: mediaUrl,
          mediaType: mediaFile.type.startsWith("image/")
            ? "image"
            : mediaFile.type.startsWith("video/")
            ? "video"
            : "file",
          createdAt: serverTimestamp(),
          userId: user.id,
          userName: user.name,
          type: isAdmin ? "incoming" : "outgoing",
        }
      );

      setMediaFile(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao enviar arquivo.");
    } finally {
      setIsUploading(false); // 👉 Finaliza o loading
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMediaFile(null);
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
        // bgcolor: '#e3f2fd',
        gap: "2rem",
        padding: "20px 20px",
      }}
    >
      <Stack className="show-chatbot">
        <button className="chatbot-toggler" onClick={toggleChat}>
          {isChatOpen ? (
            <CloseIcon sx={{ fontSize: "30px", color: "#fff" }} />
          ) : (
            <WhatsAppIcon sx={{ fontSize: "30px", color: "#fff" }} />
          )}


          {unreadCount > 0 && (
            <span 
            style={{
             
              position: "absolute",
              top: 2,
              right: 2,
              background: "red",
              color: "#fff",
              borderRadius: "50%",
              width: 18,
              height: 18,
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
            >
              {unreadCount}
            </span>
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
                  onClick={() => handleOpenActionModal(index)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    width: "100%",
                    justifyContent:
                      msg.type === "incoming" ? "flex-start" : "flex-end",
                    backgroundColor:
                      msg.type === "incoming",
                      bgcolor:'#fff',
                       
                    padding: "2px",
                    borderRadius: "10px",
                    marginBottom: "4px",
                  }}
                >
                  {msg.type === "incoming" && (
                    <WhatshotIcon sx={{ marginRight: 0, color:'#1a2428' }} />
                  )}

                  {msg.mediaType === "image" ? (
                    <img
                      src={msg.media}
                      alt="Arquivo enviado"
                      style={{ maxWidth: "200px", margin: "5px", borderRadius: "8px" }}
                    />
                  ) : msg.mediaType === "video" ? (
                    <video
                      controls
                      src={msg.media}
                      style={{ maxWidth: "300px", margin: "5px" }}
                    />
                  ) : (
                    <p style={{ margin: 0, fontSize: "14px" }}>{msg.text}</p>
                  )}
                </li>
              ))}
              <div  ref={messagesEndRef} />
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
                disabled={message.trim() === ""}
                sx={{
                  color: message.trim() === "" ? "#ccc" : "#3cb815",
                  cursor: message.trim() === "" ? "not-allowed" : "pointer",
                  minWidth: "40px", // opcional, para tamanho fixo
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
                  borderRadius: "15px 0px 15px 0px",
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
                  borderRadius: "15px 0px 15px 0px",
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

            {/* 🔥 Tela de carregando sobreposta */}
            {isUploading && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(255, 255, 255, 0.8)",
                  zIndex: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                }}
              >
                <img
                  src="https://i.gifer.com/ZZ5H.gif"
                  alt="Carregando"
                  width="50"
                />
                <h4 style={{ color: "#33bf30", marginTop: "10px" }}>
                  Enviando mídia...
                </h4>
              </Box>
            )}
          </Box>
        </Modal>

        <Modal open={actionModalOpen} onClose={handleCloseActionModal}>
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: "8px",
              boxShadow: 24,
              p: 4,
              maxWidth: 400,
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
            <h4 style={{ color: "#33bf30" }}>Ações da Mensagem</h4>

            <Stack direction="row" gap={2} sx={{ mt: 3 }}>
              {selectedMessageIndex !== null &&
                canEditMessage(messages[selectedMessageIndex]) && (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    sx={{
                      padding: "10",
                      color: "#fff",
                      borderRadius: "8px",
                      fontSize: "10px",
                      gap: "0.20rem",
                      backgroundColor: "#1a2428",
                      boxShadow: "1px 5px 20px #3ca63a",
                      "&:hover": {
                        boxShadow: "1px 5px 20px #f75f1d",
                        background: "#f75f1d",
                        color: "red",
                      },
                    }}
                    onClick={() => {
                      handleEditMessage(selectedMessageIndex);
                      handleCloseActionModal();
                    }}
                  >
                    Editar
                  </Button>
                )}

              {selectedMessageIndex !== null &&
                (messages[selectedMessageIndex].userId === user?.id ||
                  isAdmin) && (
                  <Button
                    variant="contained"
                    color="error"
                    sx={{
                      padding: "10",
                      color: "#fff",
                      borderRadius: "8px",
                      fontSize: "10px",
                      gap: "0.20rem",
                      backgroundColor: "#1a2428",
                      boxShadow: "1px 5px 20px #3ca63a",
                      "&:hover": {
                        boxShadow: "1px 5px 20px #f75f1d",
                        background: "#f75f1d",
                        color: "red",
                      },
                    }}
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      handleDeleteMessage(selectedMessageIndex);
                      handleCloseActionModal();
                    }}
                  >
                    Excluir
                  </Button>
                )}
            </Stack>

            <Button
              onClick={handleCloseActionModal}
              sx={{
                padding: "10",
                boxShadow: "1px 5px 20px #3ca63a",
                backgroundColor: "#3ca63a",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "14px",
                mt: 3,
                gap: "1rem",
                "&:hover": {
                  boxShadow: "1px 5px 20px #3ca63a",
                  color: "#000",
                },
              }}
              variant="outlined"
            >
              Cancelar
            </Button>
          </Box>
        </Modal>
      </Stack>
    </Stack>
  );
};

export default ChatWhatsApp;
