import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Stack } from "@mui/material";

// import Quizito from "../../managerImg/quizito4.png";
import ceoMni from "../managerImg/cfo.png";
import CMO from "../managerImg/cio.png-removebg-preview.png";
import Ceo from "../managerImg/quizito4.png";

const teamMembers = [
  {
    image: Ceo,
    name: "Lucas Andrade",
    title: "Chief Executive Officer (CEO)",
    textAvatar: "LA",
    subheader: "CEO • Entrou em Janeiro de 2018",
    description: `Lidera a visão estratégica da empresa, focando em crescimento 
    sustentável, inovação e cultura centrada no cliente.`,
  },
  {
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Marina Costa",
    textAvatar: "MC",
    title: "Chief Technology Officer (CTO)",
    subheader: "CTO • Entrou em Março de 2019",
    description: `Responsável pela tecnologia da empresa, lidera o time de desenvolvimento 
    e define padrões de inovação e segurança.`,
  },
  {
    image: CMO,
    name: "Renato Silva",
    textAvatar: "RS",
    title: "Chief Marketing Officer (CMO)",
    subheader: "CMO • Entrou em Julho de 2020",
    description: `Comanda as estratégias de marketing digital, branding e comunicação para posicionar a empresa no mercado nacional.`,
  },
  {
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Ana Beatriz Lima",
    textAvatar: "AB",
    title: "Gerente de Suporte ao Cliente",
    subheader: "Customer Support • Entrou em Outubro de 2021",
    description: `Garante atendimento ágil e humanizado, 
    fortalecendo o pós-venda e a fidelização dos clientes.`,
  },
  {
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    name: "Carlos Eduardo",
    title: "Designer de Produto",
    textAvatar: "CE",
    subheader: "Design • Entrou em Fevereiro de 2022",
    description: `Cria interfaces e experiências visuais, 
    garantindo que nossos produtos sejam funcionais e visualmente agradáveis.`,
  },
  {
    image: "https://randomuser.me/api/portraits/women/51.jpg",
    name: "Juliana Mendes",
    title: "Analista de Dados",
    textAvatar: "JM",
    subheader: "Data Analyst • Entrou em Maio de 2021",
    description: `Transforma dados em decisões, otimizando processos 
    internos e estratégias de negócio com análises precisas.`,
  },
  {
    image: ceoMni,
    name: "Quizito Cristiano ",
    title: "Desenvolvedor Full Stack",
    textAvatar: "QC",
    subheader: "Dev • Entrou em Novembro de 2022",
    description: `Constrói soluções escaláveis para front-end e back-end, conectando a experiência do cliente à tecnologia moderna.`,
  },
  {
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Camila Dias",
    textAvatar: "CD",
    title: "Especialista em Logística",
    subheader: "Logística • Entrou em Junho de 2020",
    description: `Coordena toda a cadeia de entrega dos produtos, garantindo prazos, segurança e eficiência no envio aos clientes.`,
  },
];

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

const TheEssence = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Stack
      sx={(theme) => ({
        display: "grid",
        justifyContent: "center", // Centraliza os itens dentro do grid
        textAlign: "center",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "2rem",
        maxWidth: "1700px", // Define um limite para o grid
        width: "100%", // Permite que ele se ajuste conforme o conteúdo
        [theme.breakpoints.down(1500)]: {
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.7rem",
        },
        [theme.breakpoints.down(1050)]: {
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
        },
        [theme.breakpoints.down(750)]: {
          gridTemplateColumns: "repeat(2, 1fr)", // Duas colunas para telas menores
          gap: "1.3rem",
        },
        [theme.breakpoints.down(550)]: {
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.2rem",
          placeItems: "center", // centraliza os itens dentro da grid
        },
        [theme.breakpoints.down(420)]: {
          gridTemplateColumns: "1fr", // apenas 1 coluna
        },
      })}
    >
      {teamMembers.map((item, index) => (
        <Box
          key={index}
          sx={(theme) => ({
            background:
              "linear-gradient(135deg, rgba(235, 232, 232, 0.47), rgba(65, 62, 62, 0.06))",
            border: "1px solid rgba(141, 141, 141, 0.16)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "10px",
            textAlign: "center",
            overflow: "hidden",
            boxShadow: "0 0 30px rgba(71, 71, 71, 0.1)",
            maxWidth: "300px",
            width: "100%",
            height: "auto",
            transition: "0.8s ease-in-out",

            "&:hover": {
              transform: "scale(1.05)",
            },

            // Breakpoints responsivos:
            [theme.breakpoints.down(800)]: {
              maxWidth: "98%",
            },
            [theme.breakpoints.down(600)]: {
              maxWidth: "100%",
            },
            [theme.breakpoints.down(400)]: {
              maxWidth: "100%",
              width: "100%",
            },
          })}
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: '#33bf30', fontSize: "1rem" }}
                aria-label="avatar"
              >
                {item.textAvatar}
              </Avatar>
            }
            title={item.name}
            subheader={item.title}
            sx={{ textAlign: "left" }}
          />
          <Box
            sx={(theme) => ({
              background:
                "linear-gradient(135deg, rgba(138, 137, 137, 0.1), rgba(133, 128, 128, 0.43))",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "2px",
              height: "200px",
              width: "100%",
              overflow: "hidden",

              [theme.breakpoints.down(420)]:{
                height:'350px'
              }

            })}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%", // garante que a largura ocupe 100%
                height: "auto", // altura automática, proporcional
                objectFit: "cover", // se quiser preencher todo o box
                display: "block",
              }}
            />
          </Box>

          <Box
            sx={{
              margin: "15px",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.85rem",
                textAlign: "left",
              }}
            >
              {item.description}
            </Typography>
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

export default TheEssence;
