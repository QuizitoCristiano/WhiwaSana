
import Quizito4 from "../../imagens/iPhonePro5e.png";
import iPhoneOferta4e from "../../imagens/iPhoneVerde.png";
import iPhonePreto from "../../imagens/iPhonePreto12e.png";
import Macbook1 from "../../imagens/iPhoneRed12.png";

import iPhone2 from "../../imagens/iPhone2.jpg";
import iPhoneRosa from "../../imagens/iPhoneRosapr.png";
import iPhoneAzul from "../../imagens/iPhoneAzul.png";
import iPhoneverdcralor from "../../imagens/iPhoneverdcralor.png";


import foneDeOuvido1 from "../../Promocoes/promoImages/airpodsrenove.png";
import foneDeOuvido2 from "../../Promocoes/promoImages/airpods.png";
import foneDeOuvido3 from "../../Promocoes/promoImages/FoneMK2F1.png";
import foneDeOuvido4 from "../../Promocoes/promoImages/FoneMK2F3.png";



import foneDeOuvido5 from "../../Promocoes/promoImages/MH6P2_AV5.png";
import foneDeOuvido6 from "../../Promocoes/promoImages/MQTR3.png";
import foneDeOuvido7 from "../../Promocoes/promoImages/MK2G4.png";
import foneDeOuvido8 from "../../Promocoes/promoImages/MQTT3_AV7.png";






import monitorGalax1 from "../../Promocoes/promoImages/Adobe.png";
import tripe1 from "../../Promocoes/promoImages/HNKK2_AV3.png";
import monitorGalax13 from "../../Promocoes/promoImages/monitor-alienware.png";
import monitorApple4 from "../../Promocoes/promoImages/HPE82_AV2.png";



import monitorApple5 from "../../Promocoes/promoImages/smart-m7.png";
import monitorApple46 from "../../Promocoes/promoImages/monitorGalax3.png";
import suporte7 from "../../Promocoes/promoImages/monitor-alienware1.png";
import suporte8 from "../../Promocoes/promoImages/MX5M3_AV1.png";







import pelicuGalax1 from "../../Promocoes/PeliculaIaIamg/HP632_AV3.png";
import tripe2 from "../../Promocoes/PeliculaIaIamg/foneHTS.png";
import pelicuGalax2 from "../../Promocoes/PeliculaIaIamg/HP632pelicula2.png";
import peliculaApple4 from "../../Promocoes/PeliculaIaIamg/HR2A2_AV3pelicula-.png";



import peliculaApple5 from "../../Promocoes/PeliculaIaIamg/mauser.png";
import peliculaApple46 from "../../Promocoes/PeliculaIaIamg/ApphleAV3pelicula-.png";
import suporte75 from "../../Promocoes/PeliculaIaIamg/pelicula.png";
import suporte84 from "../../Promocoes/promoImages/HNKK2_AV4.png"



// airpodsrenove.png

const appleCollection = [
  {
    id: 1,
    title: "iPhone 13",
    brand: "Apple",
    price: 4999.99,
    image: iPhoneverdcralor,
    specs: ["128GB", '6.1"', "A15 Bionic"],
  },
  {
    id: 2,
    title: "iPhone 14 Pro",
    brand: "Apple",
    price: 7999.99,
    image: iPhoneOferta4e,
    specs: ["256GB", '6.1"', "A16 Bionic"],
  },
];

const premiumScreenProtectors = [

  {
    id: "p2",
    title: "Fone de ouvido",
    imageOne: tripe2,
    price: 3.343,
  },
  {
    id: "p3",
    title: "Película de tela iPhone 14 Pro Max",
    imageOne: peliculaApple46,
    price: 499,
  },
    {
    id: "p1",
    title: "Ultra da Belkin para iPhone SE / 8 / 7",
    imageOne: pelicuGalax1,
    price: 499,
  },
  {
    id: "p4",
    title: "Película de tela iPhone SE / 8 / 7",
    imageOne: pelicuGalax2,
    price: 279,
  },

  {
    id: "p5",
    title: "Película UltraGlass da Belkin",
    imageOne: peliculaApple4,
    price: 349,
  },
  {
    id: "p6",
    title: "Mouse Gamer sem fio Alienware",
    imageOne: peliculaApple5,
    price: 1.119,
  },
  {
    id: "p7",
    title: "Película Antirreflexo Matte",
    imageOne: suporte75,
    price: 896,
  },
  {
    id: "p8",
    title: "Tripé multifuncional",
    imageOne: suporte84,
    price: 499,
  },
];

const professionalHeadphonesList = [
  {
    id: "f1",
    title: "Fone Bluetooth InPods",
    imageOne: foneDeOuvido1,
    price: "89,90",
  },
  {
    id: "f2",
    title: "Fone JBL Wireless",
    imageOne: foneDeOuvido2,
    price: "199,90",
  },
  {
    id: "f3",
    title: "Fone Sony Extra Bass",
    imageOne: foneDeOuvido3,
    price: "249,90",
  },
  {
    id: "f4",
    title: "Fone Apple AirPods",
    imageOne: foneDeOuvido4,
    price: "999,90",
  },
  {
    id: "f5",
    title: "Fone Samsung Galaxy Buds",
    imageOne: foneDeOuvido5,
    price: "499,90",
  },
  {
    id: "f6",
    title: "Fone Beats Studio Buds",
    imageOne: foneDeOuvido6,
    price: "799,90",
  },
  {
    id: "f7",
    title: "Fone Edifier W800BT",
    imageOne: foneDeOuvido7,
    price: "329,90",
  },
  {
    id: "f8",
    title: "Fone Xiaomi Redmi Buds",
    imageOne: foneDeOuvido8,
    price: "179,90",
  },
];


// R$ 1.799,10 à vista (10% de desconto)
const professionalMonitorsList = [
  //  {
  //   id: 1,
  //   title: 'Microfone HypeMiC da Apogee',
  //   brand: "LG",
  //   price: 4.929,
  //   imageOne: monitorGalax1,
  //   specs: ["144Hz", "1ms", "IPS", "Full HD"],
  // },
  {
    id: 1,
    title: 'Monitor Gamer Alienware 29 AW2724DM',
    brand: "LG",
    price: 2.694,
    imageOne: monitorGalax1,
    specs: ["144Hz", "1ms", "IPS", "Full HD"],
  },
  {
    id: 2,
    title: 'Tripé multifuncional',
    brand: "Samsung",
    price: 669,
    imageOne: tripe1,
    specs: ["75Hz", "4ms", "VA", "Full HD"],
  },
  {
    id: 3,
    title: 'Monitor Gamer Alienware 27',
    brand: "AOC",
    price: 2.894,
    imageOne: monitorGalax13,
    
  },
  {
    id: 4,
    title: 'Base dobrável em alumínio da Satechi',
    brand: "Dell",
    price: 2.559,
    imageOne: monitorApple4,
    specs: ["60Hz", "5ms", "IPS", "QHD"],
  },
    {
    id: 7,
    title: 'Monitor Galax S34',
    brand: "Acer",
    price: 4.499,
    imageOne: monitorApple5,
    specs: ["120Hz", "1ms", "IPS", "UWQHD"],
  },
  {
    id: 5,
    title: ' Monitor Gamer Curvo Alienware',
    brand: "Asus",
    price:  6.998,
    imageOne: suporte7,
    specs: ["165Hz", "1ms", "IPS", "Full HD"],
  },
  {
    id: 6,
    title: 'Monitor Galax S27 LED',
    brand: "Philips",
    price: 999.9,
    imageOne: monitorApple46,
    specs: ["75Hz", "4ms", "IPS", "Full HD"],
  },

  {
    id: 8,
    title: 'Adaptador para montagem VESA',
    brand: "Lenovo",
    price:  1.999,
    imageOne: suporte8,
    specs: ["60Hz", "6ms", "IPS", "Full HD"],
  },
];

const premiumCasesList = [
  {
    id: "c1",
    title: "Capinha Silicone Preta",
    image: "/assets/images/capinha-silicone-preta.jpg",
    price: "49,90",
  },
  {
    id: "c2",
    title: "Capinha Transparente Antiamarelamento",
    image: "/assets/images/capinha-transparente-antiamarelamento.jpg",
    price: "45,90",
  },
  {
    id: "c3",
    title: "Capinha Armor Shockproof",
    image: "/assets/images/capinha-armor-shockproof.jpg",
    price: "59,90",
  },
  {
    id: "c4",
    title: "Capinha de Couro Premium",
    image: "/assets/images/capinha-couro-premium.jpg",
    price: "89,90",
  },
  {
    id: "c5",
    title: "Capinha Silicone Rosa Pastel",
    image: "/assets/images/capinha-silicone-rosa-pastel.jpg",
    price: "49,90",
  },
  {
    id: "c6",
    title: "Capinha MagSafe Transparente",
    image: "/assets/images/capinha-magsafe-transparente.jpg",
    price: "79,90",
  },
  {
    id: "c7",
    title: "Capinha Antichoque Rugged",
    image: "/assets/images/capinha-antichoque-rugged.jpg",
    price: "69,90",
  },
  {
    id: "c8",
    title: "Capinha Slim Fosca",
    image: "/assets/images/capinha-slim-fosca.jpg",
    price: "39,90",
  },
];

 const Categories = {
  iphone: appleCollection,

  monitorsCollection: professionalMonitorsList,
  peliculas: premiumScreenProtectors,
  CapinhasParaSmartphones: premiumCasesList,

  fones: professionalHeadphonesList,
};

export default Categories;


