import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
} from "@mui/material";
import "dayjs/locale/pt-br";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs from "dayjs";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "../UserAuthContext/AuthContext";
import { db } from "../../firebaseconfig/firebaseconfig";

import  Quizito1  from '../imagens/quizito1.png'

const profissionaisMock = [
  {
    name: "Dr. Emily Johnson",
    especialidade: "Pediatra",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    horarios: ["10:00 - 11:00", "14:00 - 15:00", "16:00 - 17:00"],
  },
   {
    name: "Temótio",
    especialidade: "Dermatologista",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    horarios: ["07:30 - 10:30", "16:00 - 16:00"],
  },
  {
    name: "Dr. Michael Lee",
    especialidade: "Dermatologista",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    horarios: ["11:00 - 12:00", "15:00 - 16:00"],
  },
   {
    name: "Quizito Cristiano",
    especialidade: "Pediatra",
    avatar: Quizito1,
    horarios: ["08:30 - 09:30", "11:30 - 15:30", "16:00 - 18:20"],
  },
 
  
];

const AgendamentoPage = () => {
  const { user } = useAuth;
  const [date, setDate] = useState(dayjs());
  const [selectedProf, setSelectedProf] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [selectedHorario, setSelectedHorario] = useState("");

  const handleCardClick = (prof) => {
    setSelectedProf(prof);
    setSelectedHorario(""); // Limpa horário
    setModalOpen(true);
    setSuccess("");
    setError("");
  };

  const handleAgendar = async () => {
    const selectedDate = date.format("YYYY-MM-DD");

    const agendamentoRef = collection(db, "appointments");

    const q = query(
      agendamentoRef,
      where("date", "==", selectedDate),
      where("time", "==", selectedHorario),
      where("professional", "==", selectedProf.name)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      setError("Esse horário já está ocupado.");
      return;
    }

    try {
      await addDoc(agendamentoRef, {
        userId: user.id,
        userName: user.name,
        professional: selectedProf.name,
        service: selectedProf.especialidade,
        date: selectedDate,
        time: selectedHorario,
        createdAt: serverTimestamp(),
      });

      setSuccess("Agendamento realizado com sucesso!");
      setError("");
    } catch (err) {
      console.error("Erro ao agendar:", err);
      setError("Erro ao salvar o agendamento.");
    }
  };

  return (
    <Stack
      sx={{
        bgcolor: "#33bf30",
        borderRadius: "20px",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "1rem",
      
        margin: "0px 5px 5px 0px",
        boxShadow: "1px 2px 11px 4px rgb(14 55 54 / 95%)",

        gap: "2rem",
      }}
    >
      <Box maxWidth={500} mx="auto" p={2}>
        <Box mt={2}>
          <Typography fontWeight="bold" mb={1}>
            Selecione o horário:
          </Typography>
          {selectedProf?.horarios.map((horario, idx) => (
            <Button
              key={idx}
              variant={selectedHorario === horario ? "contained" : "outlined"}
              onClick={() => setSelectedHorario(horario)}
              sx={{ mr: 1, mb: 1 }}
            >
              {horario}
            </Button>
          ))}
        </Box>

        <Typography variant="h6" fontWeight="bold" mb={1}>
          Calendário de Agendamento
        </Typography>

        

        <Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            px={2}
            mt={1}
            mb={1}
          >
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map(
              (dia, idx) => (
                <Typography
                  sx={{ color: "" }}
                  key={idx}
                  fontSize={12}
                  fontWeight="bold"
                >
                  {dia}
                </Typography>
              )
            )}
          </Stack>

          <DateCalendar
            value={date}
            onChange={(newValue) => setDate(newValue)}
            sx={{
              bgcolor: "#f9f9f9",
              color: "#33bf30",
              borderRadius: 2,
              mb: 3,
            }}
          />
        </Stack>

        <Typography variant="h6" fontWeight="bold" mb={1}>
          Lista de Profissionais
        </Typography>

        {profissionaisMock.map((prof, index) => (
          <Card
            key={index}
            variant="outlined"
            sx={{
              mb: 2,
              borderRadius: 3,
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": { boxShadow: 3 },
            }}
            onClick={() => handleCardClick(prof)}
          >
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={prof.avatar} alt={prof.name} />
                <Box flex={1}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {prof.name}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {prof.especialidade}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessTimeIcon fontSize="small" color="action" />
                  <Typography variant="body2" fontWeight="medium">
                    {prof.horario}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}

        {/* Modal de Confirmação */}
        <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
          <DialogTitle>Confirmar Agendamento</DialogTitle>
          <DialogContent dividers>
            <Typography>
              <strong>Profissional:</strong> {selectedProf?.name}
            </Typography>
            <Typography>
              <strong>Especialidade:</strong> {selectedProf?.especialidade}
            </Typography>
            <Typography>
              <strong>Data:</strong> {date.format("DD/MM/YYYY")}
            </Typography>
            <Typography>
              <strong>Horário:</strong> {selectedProf?.horario}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {success}
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button sx={{
              bgcolor:'#f75f1d',
              color:'#fff'
            }}  onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button sx={{
              bgcolor:'#33bf30'
            }} variant="contained" onClick={handleAgendar}>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Stack>
  );
};

export default AgendamentoPage;
