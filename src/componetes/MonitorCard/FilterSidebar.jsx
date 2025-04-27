
import Quizito4 from "../../imagens/iPhonePro5e.png";
import iPhoneOferta4e from "../../imagens/iPhoneVerde.png";
import iPhonePreto from "../../imagens/iPhonePreto12e.png";
import Macbook1 from "../../imagens/iPhoneRed12.png";

import iPhone2 from "../../imagens/iPhone2.jpg";
import iPhoneRosa from "../../imagens/iPhoneRosapr.png";
import iPhoneAzul from "../../imagens/iPhoneAzul.png";
import iPhoneverdcralor from "../../imagens/iPhoneverdcralor.png";

const appleCollection = [
  {
    id: 1,
    title: "iPhone 13",
    brand: "Apple",
    price: 4999.99,
    image: "/assets/images/iphone13.png",
    specs: ["128GB", '6.1"', "A15 Bionic"],
  },
  {
    id: 2,
    title: "iPhone 14 Pro",
    brand: "Apple",
    price: 7999.99,
    image: "/assets/images/iphone14pro.png",
    specs: ["256GB", '6.1"', "A16 Bionic"],
  },
];

const premiumScreenProtectors = [
  {
    id: "p1",
    title: "Película 5D Ultra HD",
    imageOne: "pelicula-5d-ultra-hd.jpg",
    price: "39,90",
  },
  {
    id: "p2",
    title: "Película de Vidro Nano",
    imageOne: "pelicula-vidro-nano.jpg",
    price: "29,90",
  },
  {
    id: "p3",
    title: "Película 9D Full Cover",
    imageOne: "pelicula-9d-full-cover.jpg",
    price: "49,90",
  },
  {
    id: "p4",
    title: "Película Híbrida Flexível",
    imageOne: "pelicula-hibrida-flexivel.jpg",
    price: "34,90",
  },
  {
    id: "p5",
    title: "Película de Vidro Curvo",
    imageOne: "pelicula-vidro-curvo.jpg",
    price: "44,90",
  },
  {
    id: "p6",
    title: "Película de Privacidade",
    imageOne: "pelicula-privacidade.jpg",
    price: "59,90",
  },
  {
    id: "p7",
    title: "Película Antirreflexo Matte",
    imageOne: "pelicula-antirreflexo-matte.jpg",
    price: "32,90",
  },
  {
    id: "p8",
    title: "Película Blue Light Protection",
    imageOne: "pelicula-blue-light-protection.jpg",
    price: "54,90",
  },
];

const professionalHeadphonesList = [
  {
    id: "f1",
    title: "Fone Bluetooth InPods",
    imageOne: "inpods-bluetooth.jpg",
    price: "89,90",
  },
  {
    id: "f2",
    title: "Fone JBL Wireless",
    imageOne: "jbl-wireless.jpg",
    price: "199,90",
  },
  {
    id: "f3",
    title: "Fone Sony Extra Bass",
    imageOne: "sony-extra-bass.jpg",
    price: "249,90",
  },
  {
    id: "f4",
    title: "Fone Apple AirPods",
    imageOne: "apple-airpods.jpg",
    price: "999,90",
  },
  {
    id: "f5",
    title: "Fone Samsung Galaxy Buds",
    imageOne: "samsung-galaxy-buds.jpg",
    price: "499,90",
  },
  {
    id: "f6",
    title: "Fone Beats Studio Buds",
    imageOne: "beats-studio-buds.jpg",
    price: "799,90",
  },
  {
    id: "f7",
    title: "Fone Edifier W800BT",
    imageOne: "edifier-w800bt.jpg",
    price: "329,90",
  },
  {
    id: "f8",
    title: "Fone Xiaomi Redmi Buds",
    imageOne: "xiaomi-redmi-buds.jpg",
    price: "179,90",
  },
];

const professionalMonitorsList = [
  {
    id: 1,
    title: 'Monitor LG Ultragear 27"',
    brand: "LG",
    price: 1499.99,
    image: "/assets/images/lg-ultragear-27.jpg",
    specs: ["144Hz", "1ms", "IPS", "Full HD"],
  },
  {
    id: 2,
    title: 'Monitor Samsung Curved 24"',
    brand: "Samsung",
    price: 1099.9,
    image: "/assets/images/samsung-curved-24.jpg",
    specs: ["75Hz", "4ms", "VA", "Full HD"],
  },
  {
    id: 3,
    title: 'Monitor AOC Gamer 32"',
    brand: "AOC",
    price: 1799.0,
    image: "/assets/images/aoc-gamer-32.jpg",
    specs: ["165Hz", "1ms", "VA", "QHD"],
  },
  {
    id: 4,
    title: 'Monitor Dell UltraSharp 27"',
    brand: "Dell",
    price: 2399.0,
    image: "/assets/images/dell-ultrasharp-27.jpg",
    specs: ["60Hz", "5ms", "IPS", "QHD"],
  },
  {
    id: 5,
    title: 'Monitor Asus TUF Gaming 24"',
    brand: "Asus",
    price: 1299.9,
    image: "/assets/images/asus-tuf-gaming-24.jpg",
    specs: ["165Hz", "1ms", "IPS", "Full HD"],
  },
  {
    id: 6,
    title: 'Monitor Philips 27" LED',
    brand: "Philips",
    price: 999.9,
    image: "/assets/images/philips-led-27.jpg",
    specs: ["75Hz", "4ms", "IPS", "Full HD"],
  },
  {
    id: 7,
    title: 'Monitor Acer Predator 34"',
    brand: "Acer",
    price: 4499.9,
    image: "/assets/images/acer-predator-34.jpg",
    specs: ["120Hz", "1ms", "IPS", "UWQHD"],
  },
  {
    id: 8,
    title: 'Monitor Lenovo ThinkVision 24"',
    brand: "Lenovo",
    price: 1149.9,
    image: "/assets/images/lenovo-thinkvision-24.jpg",
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


