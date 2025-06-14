import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Send as SendIcon, Mic, MicOff, AttachFile } from "@mui/icons-material";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db,  auth, storage } from "../../firebaseconfig/firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatWhatsAppTxet = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [mediaType, setMediaType] = useState("");
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const mediaRecorder = useRef(null);
  const fileInputRef = useRef(null);
  const [user] = useAuthState(auth);

  // Enviar texto
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        senderId: user?.uid || "anon",
        displayName: user?.displayName || "Desconhecido",
        timestamp: serverTimestamp(),
      });
      setMessage("");
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    }
    setLoading(false);
  };

  // Upload de mídia
  const uploadToStorage = async (file) => {
    const storageRef = ref(storage, `media/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        reject,
        () => resolve()
      );
    });

    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    return downloadURL;
  };

  const handleConfirmSend = async () => {
    if (!mediaFile) return;

    setLoading(true);
    try {
      const mediaUrl = await uploadToStorage(mediaFile);
      await addDoc(collection(db, "messages"), {
        mediaUrl,
        mediaType,
        senderId: user?.uid || "anon",
        displayName: user?.displayName || "Desconhecido",
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error("Erro ao enviar mídia:", err);
    } finally {
      setLoading(false);
      setOpenConfirm(false);
      setMediaFile(null);
    }
  };

  // Gravação de áudio
  const handleMicPress = async () => {
    setRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    mediaRecorder.current = recorder;

    const chunks = [];
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = async () => {
      const audioBlob = new Blob(chunks, { type: "audio/webm" });
      const file = new File([audioBlob], "audio.webm", { type: "audio/webm" });
      await handleUploadAudio(file);
    };

    recorder.start();
  };

  const handleMicRelease = () => {
    if (mediaRecorder.current && recording) {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  const handleUploadAudio = async (audioFile) => {
    setLoading(true);
    try {
      const audioUrl = await uploadToStorage(audioFile);
      await addDoc(collection(db, "messages"), {
        mediaUrl: audioUrl,
        mediaType: "audio",
        senderId: user?.uid || "anon",
        displayName: user?.displayName || "Desconhecido",
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error("Erro ao enviar áudio:", err);
    } finally {
      setLoading(false);
    }
  };

  // Preview de mídia
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMediaFile(file);
    const type = file.type.startsWith("image") ? "image" : file.type.startsWith("video") ? "video" : "";
    setMediaType(type);
    setOpenConfirm(true);
  };

  // Carregar mensagens em tempo real
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Stack spacing={2} p={2}>
      <Box
        sx={{
          background: "#f0f0f0",
          borderRadius: 2,
          padding: 2,
          minHeight: 400,
          maxHeight: 500,
          overflowY: "auto",
        }}
      >
        {messages.map((msg) => (
          <Box key={msg.id} mb={2}>
            <Typography variant="caption" color="text.secondary">
              {msg.displayName || "Usuário"}
            </Typography>
            {msg.text && (
              <Typography
                sx={{
                  background: "#fff",
                  borderRadius: 2,
                  padding: 1,
                  maxWidth: "60%",
                  mt: 0.5,
                }}
              >
                {msg.text}
              </Typography>
            )}
            {msg.mediaUrl && msg.mediaType === "image" && (
              <img src={msg.mediaUrl} alt="media" style={{ maxWidth: "60%", borderRadius: 8 }} />
            )}
            {msg.mediaUrl && msg.mediaType === "video" && (
              <video controls src={msg.mediaUrl} style={{ maxWidth: "60%", borderRadius: 8 }} />
            )}
            {msg.mediaUrl && msg.mediaType === "audio" && (
              <audio controls src={msg.mediaUrl} style={{ width: "60%" }} />
            )}
          </Box>
        ))}
      </Box>

      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton onClick={() => fileInputRef.current.click()}>
          <AttachFile />
        </IconButton>
        <input
          type="file"
          hidden
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,video/*"
        />

        <IconButton
          onMouseDown={handleMicPress}
          onMouseUp={handleMicRelease}
          color={recording ? "error" : "default"}
        >
          {recording ? <MicOff /> : <Mic />}
        </IconButton>

        <TextareaAutosize
          placeholder="Digite uma mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          minRows={1}
          maxRows={4}
          style={{ flex: 1, resize: "none", padding: 8, borderRadius: 8 }}
        />

        <IconButton onClick={handleSendMessage} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : <SendIcon />}
        </IconButton>
      </Stack>

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Enviar {mediaType === "image" ? "Imagem" : "Vídeo"}</DialogTitle>
        <DialogContent>
          {mediaFile && mediaType === "image" && (
            <img src={URL.createObjectURL(mediaFile)} alt="preview" style={{ width: "100%", borderRadius: 8 }} />
          )}
          {mediaFile && mediaType === "video" && (
            <video controls src={URL.createObjectURL(mediaFile)} style={{ width: "100%" }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancelar</Button>
          <Button onClick={handleConfirmSend} variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Enviar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default ChatWhatsAppTxet;
