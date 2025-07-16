import React, { useEffect, useState } from "react";
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
import "dayjs/locale/pt-br";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../UserAuthContext/AuthContext";
import { db } from "../../firebaseconfig/firebaseconfig";

import Quizito1 from "../imagens/quizito1.png";

const profissionaisMock = [
  {
    name: "Lucas Silva",
    especialidade: "Consultor de Smartphones e Acessórios",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
    horarios: ["10:00 - 11:00", "14:00 - 15:00", "16:00 - 17:00"],
  },
  {
    name: "Mariana Costa",
    especialidade: "Especialista em Televisores e Monitores",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    horarios: ["09:00 - 11:00", "13:00 - 14:00", "15:30 - 17:00"],
  },
  {
    name: "Carlos Henrique",
    especialidade: "Atendente de Informática e Tablets",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    horarios: ["08:30 - 10:30", "11:00 - 12:00", "16:00 - 17:30"],
  },
  {
    name: "Quizito Cristiano",
    especialidade: "Gerente de Loja / Multissetor",
    avatar: Quizito1,
    horarios: ["08:30 - 09:30", "11:30 - 15:30", "16:00 - 18:20"],
  },
  {
    name: "Beatriz Almeida",
    especialidade: "Consultora de Relógios Inteligentes",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    horarios: ["08:30 - 09:30", "11:30 - 15:30", "16:00 - 18:20"],
  },
];

const AgendamentoPage = () => {
  const { user } = useAuth();
  const [date, setDate] = useState(dayjs());
  const [selectedProf, setSelectedProf] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [selectedHorario, setSelectedHorario] = useState("");
  const [meusAgendamentos, setMeusAgendamentos] = useState([]);
  const [modalVerAgendamentos, setModalVerAgendamentos] = useState(false);

  const [bloqueioDataMensagem, setBloqueioDataMensagem] = useState("");
  const [agendamentoPermitido, setAgendamentoPermitido] = useState(true);

  const handleCardClick = (prof) => {
    setSelectedProf(prof);
    setSelectedHorario(""); // <-- Isso zera o horário!
    setModalOpen(true);
    setSuccess("");
    setError("");
  };

  const fetchAgendamentos = async () => {
    if (!user || !user.id) {
      setError("Usuário não identificado.");
      return;
    }

    const q = query(
      collection(db, "appointments"),
      where("userId", "==", user.id)
    );

    const snapshot = await getDocs(q);

    const now = dayjs(); // Current datetime

    const validAgendamentos = [];

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const appointmentDateTime = dayjs(
        `${data.date} ${data.time.split(" - ")[0]}`,
        "YYYY-MM-DD HH:mm"
      );

      if (appointmentDateTime.isBefore(now)) {
        // Delete expired appointment
        await deleteDoc(doc(db, "appointments", docSnap.id));
      } else {
        validAgendamentos.push({ id: docSnap.id, ...data });
      }
    }

    setMeusAgendamentos(validAgendamentos);
  };

  useEffect(() => {
    fetchAgendamentos();
  }, [user]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000); // 3 segundos
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    const diaSemana = date.day(); // 0 a 6 (Dom -> Sab)
    const horaAtual = dayjs().hour();
    const minutoAtual = dayjs().minute();
    const hoje = dayjs().format("YYYY-MM-DD");
    const dataSelecionada = date.format("YYYY-MM-DD");
    const ehHoje = hoje === dataSelecionada;

    if (diaSemana === 0) {
      setAgendamentoPermitido(false);
      setBloqueioDataMensagem("Agendamentos não são permitidos aos domingos.");
    } else if (
      diaSemana === 6 &&
      ehHoje &&
      (horaAtual > 13 || (horaAtual === 13 && minutoAtual > 0))
    ) {
      setAgendamentoPermitido(false);
      setBloqueioDataMensagem(
        "Aos sábados, agendamentos só são permitidos até às 13h."
      );
    } else {
      setAgendamentoPermitido(true);
      setBloqueioDataMensagem("");
    }
  }, [date]);

  useEffect(() => {
    console.log("Data selecionada:", date.format("YYYY-MM-DD"));
    console.log("Agendamento permitido?", agendamentoPermitido);
  }, [agendamentoPermitido, date]);

  const filtrarHorariosPermitidos = (horarios) => {
    const diaSemana = date.day(); //6 é sábado

    if (diaSemana !== 6) {
      return horarios;
    }

    // Se for sábado, só retorna horários que começam antes ou até 13h

    return horarios.filter((horario) => {
      const [horaInicial] = horario.split(" - ");
      const [h, m] = horaInicial.split(":").map(Number);
      const horarioInicio = dayjs().hour(h).minute(m);
      const limite = dayjs().hour(13).minute(0);
      return horarioInicio.isSameOrBefore(limite);
    });
  };

  const handleAgendar = async () => {
    const selectedDate = date.format("YYYY-MM-DD");

    if (!selectedHorario) {
      setError("Você precisa selecionar um horário para agendar.");
      return;
    }

    const agora = dayjs();
    const [horaSelecionada] = selectedHorario.split(" - ");
    const dataHoraSelecionada = dayjs(
      `${selectedDate} ${horaSelecionada}`,
      "YYYY-MM-DD HH:mm"
    );

    if (dataHoraSelecionada.isBefore(agora)) {
      setError(
        "Não é possível agendar para horários ou datas que já passaram."
      );
      return;
    }

    const diaSemana = date.day();
    const horaAtual = dayjs().hour();
    const minutoAtual = dayjs().minute();
    const hoje = dayjs().format("YYYY-MM-DD");
    const ehHoje = selectedDate === hoje;

    if (diaSemana === 0) {
      setError("Não é possível agendar aos domingos.");
      return;
    }

    if (diaSemana === 6 && ehHoje) {
      if (horaAtual > 13 || (horaAtual === 13 && minutoAtual > 0)) {
        setError("Agendamentos aos sábados só são permitidos até as 13h.");
        return;
      }
    }

    const agendamentoRef = collection(db, "appointments");

    // Verifica se o horário já está ocupado pelo profissional
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

    // 🔐 Verifica se o usuário já tem agendamento no mesmo horário
    const conflitoQuery = query(
      agendamentoRef,
      where("date", "==", selectedDate),
      where("time", "==", selectedHorario),
      where("userId", "==", user.id)
    );

    const conflitoSnapshot = await getDocs(conflitoQuery);

    if (!conflitoSnapshot.empty) {
      setError(
        "Você já possui um agendamento nesse horário com outro profissional."
      );
      return;
    }

    if (diaSemana === 6) {
      const [horaInicialStr] = selectedHorario.split(" - "); // ex: "14:00"
      const [hora, minuto] = horaInicialStr.split(":").map(Number);
      const horarioSelecionado = dayjs().hour(hora).minute(minuto);

      const limiteSabado = dayjs().hour(13).minute(0);

      if (horarioSelecionado.isAfter(limiteSabado)) {
        setError("Aos sábados, só é possível agendar até as 13h.");
        return;
      }
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

      await fetchAgendamentos();

      setTimeout(() => {
        setModalOpen(false);
      }, 2000);
    } catch (err) {
      console.error("Erro ao agendar:", err);
      setError("Erro ao salvar o agendamento.");
    }
  };

  const handleCancelarAgendamento = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja cancelar este agendamento?"
    );
    if (!confirmar) return;

    try {
      await deleteDoc(doc(db, "appointments", id));
      setMeusAgendamentos((prev) => prev.filter((item) => item.id !== id));
      setSuccess("Agendamento cancelado com sucesso!");
    } catch (error) {
      console.error("Erro ao cancelar:", error);
      setError("Erro ao cancelar o agendamento.");
    }

    await fetchAgendamentos();
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

          {bloqueioDataMensagem && (
            <Alert severity="warning" sx={{ mt: 2, mb: 2 }}>
              {bloqueioDataMensagem}
            </Alert>
          )}
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
              </Stack>
            </CardContent>
          </Card>
        ))}

        {/* Modal de Confirmação */}
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          fullWidth
          maxWidth="sm"
          sx={{ zIndex: 9999 }} // garante visibilidade no mobile
          disableScrollLock={false} // o padrão já é false
        >
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

            {/* Aqui adicionamos os botões de horário DENTRO do modal */}
            <Box mt={2}>
              <Typography fontWeight="bold" mb={1}>
                Selecione o horário:
              </Typography>
              {filtrarHorariosPermitidos(selectedProf?.horarios || []).map(
                (horario, idx) => (
                  <Button
                    key={idx}
                    variant={
                      selectedHorario === horario ? "contained" : "outlined"
                    }
                    onClick={() => setSelectedHorario(horario)}
                    sx={{ mr: 1, mb: 1 }}
                  >
                    {horario}
                  </Button>
                )
              )}
            </Box>

            <Typography>
              <strong>Horário selecionado:</strong>{" "}
              {selectedHorario || "Nenhum selecionado"}
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
            <Button
              sx={{
                bgcolor: "#f75f1d",
                color: "#fff",
              }}
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              sx={{ bgcolor: "#33bf30" }}
              variant="contained"
              onClick={handleAgendar}
              disabled={!selectedHorario || !agendamentoPermitido}
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>

        <Typography variant="h6" fontWeight="bold" mt={4}>
          Meus Agendamentos
        </Typography>

        <Button
          sx={(theme) => ({
            background: "#fff",

            width: "100%",
            color: "#33bf30",
            padding: "1rem",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            borderRadius: "16px",

            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              cursor: "pointer",
            },
          })}
          variant="outlined"
          onClick={() => setModalVerAgendamentos(true)}
          disabled={meusAgendamentos.length === 0}
        >
          Ver meus Agendamentos
        </Button>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
      </Box>

      <Dialog
        open={modalVerAgendamentos}
        onClose={() => setModalVerAgendamentos(false)}
        maxWidth="sm"
        sx={{ zIndex: 9999 }} // garante visibilidade no mobile
        disableScrollLock={false} // o padrão já é false
      >
        <DialogTitle>Seus Agendamentos</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            {Array.isArray(meusAgendamentos) &&
              meusAgendamentos.map((agendamento) => (
                <Box
                  key={agendamento.id}
                  sx={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    width: "100%",
                    padding: "0.60rem",
                    borderRadius: "15px",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      cursor: "pointer",
                    },
                  }}
                >
                  <Typography>
                    <strong>Profissional:</strong> {agendamento.professional}
                  </Typography>
                  <Typography>
                    <strong>Serviço:</strong> {agendamento.service}
                  </Typography>
                  <Typography>
                    <strong>Data:</strong>{" "}
                    {dayjs(agendamento.date).format("DD/MM/YYYY")}
                  </Typography>
                  <Typography>
                    <strong>Horário:</strong> {agendamento.time}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{
                      bgcolor: "#f75f1d",
                      color: "#fff",
                      mt: 1,
                    }}
                    onClick={() => handleCancelarAgendamento(agendamento.id)}
                  >
                    Cancelar Agendamento
                  </Button>
                </Box>
              ))}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setModalVerAgendamentos(false)}
            sx={{
              padding: 1,
              bgcolor: "#f75f1d",
              color: "#fff",
            }}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default AgendamentoPage;
