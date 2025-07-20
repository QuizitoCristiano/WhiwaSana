// import carnaval1 from "./promoImages/carnaval1.png";
// import carnaval2 from "./promoImages/carnaval2.png";
// import carnaval3 from "./promoImages/carnaval3.png";

// import pascoa1 from "./promoImages/pascoa1.png";
// import pascoa2 from "./promoImages/pascoa2.png";
// import pascoa3 from "./promoImages/pascoa3.png";

// import maes1 from "./promoImages/maes1.png";
// import maes2 from "./promoImages/maes2.png";
// import maes3 from "./promoImages/maes3.png";


import namorados1 from "./imagensNamorados/namorados03.png"
import namorados3 from "./imagensNamorados/pmdinternacional.png";
import namorados2 from "./imagensNamorados/namorado3.png";
import namorados4 from "./imagensNamorados/galaxnamorado.png";

import pais1 from "./imagenFatherDay/fathrDay2.jpg";
import pais2 from "./imagenFatherDay/FathersDay2.png";
import pais3 from "./imagenFatherDay/FathersDay4.png";
import pais4 from "./imagenFatherDay/fathrDay1.jpg";
import pais5 from "./imagenFatherDay/FathersDay1.png";

// import criancas1 from "./promoImages/criancas1.png";
// import criancas2 from "./promoImages/criancas2.png";
// import criancas3 from "./promoImages/criancas3.png";

// import republica1 from "./promoImages/republica1.png";
// import republica2 from "./promoImages/republica2.png";
// import republica3 from "./promoImages/republica3.png";

import black1 from "./promoImages/bannerBlack0.png";
import black2 from "./promoImages/black3.png";
import black3 from "./promoImages/black1.png";

import natal1 from "./promoImages/appletv-alp.png";
import natal2 from "./promoImages/SamsungDesktop.png";
import natal3 from "./promoImages/tv-home-alp.png";

// import anoNovo1 from "./promoImages/boxApple.png";
// import anoNovo2 from "./promoImages/anonovo2.png";
// import anoNovo3 from "./promoImages/anonovo3.png";

import surpresa1 from "./promoImages/maeprom1.png";
import surpresa2 from "./promoImages/madarDay.png";
import surpresa3 from "./promoImages/iphoneMae.png";
// import surpresa4 from "./promoImages/meaeProm.png";
// import surpresa4 from "./imagensNamorados/galaxnamorado.png";



export const promocoes = [
  {
    id: "carnaval",
    nome: "Carnaval",
    data: "02-10", // exemplo de data para 2025
    intervaloDiasAntes: 10,
    intervaloDiasDepois: 5,
    mensagemTitulo: "Carnaval de Ofertas!",
    mensagemTexto: "Caia na folia com descontos incríveis!",
    // imagens: [carnaval1, carnaval2, carnaval3],
  },
  {
    id: "pascoa",
    nome: "Páscoa",
    data: "04-20", // exemplo de data para 2025
    intervaloDiasAntes: 10,
    intervaloDiasDepois: 5,
    mensagemTitulo: "Páscoa Premiada",
    mensagemTexto: "Ofertas doces para você nesta Páscoa!",
    // imagens: [pascoa1, pascoa2, pascoa3],
  },
  {
    id: "dia-das-maes",
    nome: "Dia das Mães",
    data: "05-11", // segundo domingo de maio em 2025
    intervaloDiasAntes: 10,
    intervaloDiasDepois: 5,
    mensagemTitulo: "Promoção Dia das Mães",
    mensagemTexto: "Demonstre amor com descontos especiais!",
    // imagens: [maes1, maes2, maes3],
  },
  {
    id: "dia-dos-namorados",
    nome: "Dia dos Namorados",
    data: "06-12",
    intervaloDiasAntes: 10,
    intervaloDiasDepois: 5,
    mensagemTitulo: "Dia dos Namorados",
    mensagemTexto: "Surpreenda quem você ama com um presente especial!",
    imagens: [namorados1, namorados2, namorados3, namorados4],
  },
  {
    id: "dia-dos-pais",
    nome: "Dia dos Pais",
    data: "08-10", // segundo domingo de agosto em 2025
    intervaloDiasAntes: 10,
    intervaloDiasDepois: 5,
    mensagemTitulo: "Descontos para heróis",
    mensagemTexto: "Presentes que seu pai vai adorar!",
    imagens: [pais1, pais2, pais3, pais4, pais5, ],
  },
  {
    id: "dia-das-criancas",
    nome: "Dia das Crianças",
    data: "10-12",
    intervaloDiasAntes: 10,
    intervaloDiasDepois: 5,
    mensagemTitulo: "Alegria em cada clique!",
    mensagemTexto: "Ofertas para os pequenos se divertirem muito!",
    // imagens: [criancas1, criancas2, criancas3],
  },
  {
    id: "proclamacao-republica",
    nome: "Proclamação da República",
    data: "11-15",
    intervaloDiasAntes: 10,
    intervaloDiasDepois: 5,
    mensagemTitulo: "Promoções Patrióticas",
    mensagemTexto: "Comemore com preços imbatíveis!",
    // imagens: [republica1, republica2, republica3],
  },
  {
    id: "black-friday",
    nome: "Black Friday",
    data: "11-28", // última sexta de novembro em 2025
    intervaloDiasAntes: 10,
    intervaloDiasDepois: 5,
    mensagemTitulo: "Black Friday Insana!",
    mensagemTexto: "Descontos de verdade só aqui!",
    imagens: [black1, black2, black3],
  },
  {
    id: "natal",
    nome: "Natal",
    data: "12-25",
    intervaloDiasAntes: 10,
    intervaloDiasDepois: 5,
    mensagemTitulo: "Natal de Ofertas",
    mensagemTexto: "O presente certo está aqui!",
    imagens: [natal1, natal2, natal3],
  },
  {
    id: "ano-novo",
    nome: "Ano Novo",
    data: "01-01",
    intervaloDiasAntes: 10,
    intervaloDiasDepois: 5,
    mensagemTitulo: "Feliz Ano Novo!",
    mensagemTexto: "Comece o ano com novidades e promoções!",
    // imagens: [anoNovo1, anoNovo2, anoNovo3],
  },
  {
    id: "surpresa-aleatoria",
    tipo: "aleatoria",
    nome: "Ofertas Surpresa",
    mensagemTitulo: "Surpresa da Semana!",
    mensagemTexto: "Ofertas incríveis te esperam!",
    imagens: [surpresa1, surpresa2, surpresa3, surpresa4],
  },
];

const getPromocaoAtual = () => {
  const hoje = new Date();
  const anoAtual = hoje.getFullYear();

  for (const promo of promocoes) {
    if (
      promo.data &&
      promo.intervaloDiasAntes != null &&
      promo.intervaloDiasDepois != null
    ) {
      const [mes, dia] = promo.data.split("-");
      const dataPromocao = new Date(`${anoAtual}-${mes}-${dia}`);

      const inicioExibicao = new Date(dataPromocao);
      inicioExibicao.setDate(dataPromocao.getDate() - promo.intervaloDiasAntes);

      const fimExibicao = new Date(dataPromocao);
      fimExibicao.setDate(dataPromocao.getDate() + promo.intervaloDiasDepois);

      if (hoje >= inicioExibicao && hoje <= fimExibicao) {
        return promo;
      }
    }
  }

  // Se nenhuma promoção com data estiver ativa, retorna uma aleatória
  const aleatorias = promocoes.filter((p) => p.tipo === "aleatoria");
  return aleatorias[Math.floor(Math.random() * aleatorias.length)];
};


export default getPromocaoAtual;