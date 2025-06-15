// ====================
// 📦 Configurações dos países
// ====================
const countryConfigs = {
  Brasil: {
    ddi: "+55",
    telefoneLength: 11,
    formatTelefone: (n) => {
      if (n.length > 6) {
        return `+55 (${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
      } else if (n.length > 2) {
        return `+55 (${n.slice(0, 2)}) ${n.slice(2)}`;
      } else if (n.length > 0) {
        return `+55 (${n}`;
      }
      return "";
    },
    postalName: "CEP",
  },

  "Estados Unidos": {
    ddi: "+1",
    telefoneLength: 10,
    formatTelefone: (n) => {
      if (n.length >= 7) {
        return `+1 (${n.slice(0, 3)}) ${n.slice(3, 6)}-${n.slice(6)}`;
      } else if (n.length >= 4) {
        return `+1 (${n.slice(0, 3)}) ${n.slice(3)}`;
      } else if (n.length > 0) {
        return `+1 (${n}`;
      }
      return "";
    },
    postalName: "ZIP Code",
  },

  Itália: {
    ddi: "+39",
    telefoneLength: [9, 11],
    formatTelefone: (n) => {
      if (n.length > 7) {
        return `+39 ${n.slice(0, 3)} ${n.slice(3, 7)} ${n.slice(7)}`;
      } else if (n.length > 3) {
        return `+39 ${n.slice(0, 3)} ${n.slice(3)}`;
      } else if (n.length > 0) {
        return `+39 ${n}`;
      }
      return "";
    },
    postalName: "CAP",
  },

  Moçambique: {
    ddi: "+258",
    telefoneLength: 9,
    formatTelefone: (n) => {
      if (n.length > 5) {
        return `+258 ${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5)}`;
      } else if (n.length > 2) {
        return `+258 ${n.slice(0, 2)} ${n.slice(2)}`;
      } else if (n.length > 0) {
        return `+258 ${n}`;
      }
      return "";
    },
    postalName: "Código Postal",
  },
};

// ====================
// 📞 Formatação do telefone
// ====================
export const formatTelefone = (value, country) => {
  const numeros = value.replace(/\D/g, "");
  const config = countryConfigs[country];
  if (!config) return value;

  return config.formatTelefone(numeros);
};

// ====================
// ✅ Validação do telefone
// ====================
export const validarTelefone = (telefone, country) => {
  const numeros = telefone.replace(/\D/g, "");
  const config = countryConfigs[country];
  if (!config) return false;

  if (Array.isArray(config.telefoneLength)) {
    return (
      numeros.length >= config.telefoneLength[0] &&
      numeros.length <= config.telefoneLength[1]
    );
  }

  return numeros.length === config.telefoneLength;
};

// ====================
// 📧 Validação de email
// ====================
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// ====================
// 🏢 Validação de CNPJ (somente Brasil)
// ====================
export const validarCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/[^\d]+/g, "");
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  tamanho++;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado === parseInt(digitos.charAt(1));
};

const validarCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11) return false;

  let total = 0;
  for (let i = 0; i < 9; i++) {
    total += parseInt(cpf[i]) * (10 - i);
  }
  let resto = total % 11;
  let digito1 = resto > 1 ? 11 - resto : 0;

  total = 0;
  for (let i = 0; i < 10; i++) {
    total += parseInt(cpf[i]) * (11 - i);
  }
  resto = total % 11;
  let digito2 = resto > 1 ? 11 - resto : 0;

  return parseInt(cpf[9]) === digito1 && parseInt(cpf[10]) === digito2;
};

// ====================
// 🏠 API de busca de endereço por CEP/ZIP/CAP
// ====================
export const fetchAddressByPostalCode = async (postalCode, country) => {
  const cleanPostalCode = postalCode.replace(/\D/g, "");

  if (country === "Brasil") {
    if (cleanPostalCode.length !== 8) throw new Error("CEP inválido");

    const response = await fetch(
      `https://viacep.com.br/ws/${cleanPostalCode}/json/`
    );
    if (!response.ok) throw new Error("Erro ao buscar CEP");

    const data = await response.json();
    if (data.erro) throw new Error("CEP não encontrado");

    return {
      rua: data.logradouro || "",
      bairro: data.bairro || "",
      cidade: data.localidade || "",
      estado: data.uf || "",
      country: "Brasil",
    };
  }

  if (country === "Estados Unidos") {
    const response = await fetch(
      `https://api.zippopotam.us/us/${cleanPostalCode}`
    );
    if (!response.ok) throw new Error("ZIP Code não encontrado");

    const data = await response.json();
    return {
      rua: "",
      bairro: "",
      cidade: data.places[0]["place name"] || "",
      estado: data.places[0]["state abbreviation"] || "",
      country: "Estados Unidos",
    };
  }

  if (country === "Itália") {
    const response = await fetch(
      `https://api.zippopotam.us/it/${cleanPostalCode}`
    );
    if (!response.ok) throw new Error("CAP não encontrado");

    const data = await response.json();
    return {
      rua: "",
      bairro: "",
      cidade: data.places[0]["place name"] || "",
      estado: data.places[0]["state"] || "",
      country: "Itália",
    };
  }

  if (country === "Moçambique") {
    return {
      rua: "",
      bairro: "",
      cidade: "Maputo",
      estado: "Maputo",
      country: "Moçambique",
    };
  }

  throw new Error("País não suportado.");
};

// ====================
// 🛑 Validação dos dados do formulário
// ====================
export const validateDeliveryData = (formData) => {
  let isValid = true;
  let errors = {};
  const { country } = formData;

  if (!formData.nomeCompleto.trim() || formData.nomeCompleto.length < 2) {
    errors.nomeCompleto = "Por favor, digite seu nome completo.";
    isValid = false;
  }

  if (!formData.telefone.trim()) {
    errors.telefone = "Por favor, informe o telefone.";
    isValid = false;
  } else if (!validarTelefone(formData.telefone, country)) {
    errors.telefone = "Por favor, informe um telefone válido.";
    isValid = false;
  }

  if (!formData.email.trim() || !isValidEmail(formData.email)) {
    errors.email = "Por favor, digite um e-mail válido.";
    isValid = false;
  }

  if (country === "Brasil") {
    const valor = formData.cnpj.trim();

    if (!valor) {
      errors.cnpj = "Por favor, informe o CPF ou CNPJ.";
      isValid = false;
    } else if (!validarCPF(valor) && !validarCNPJ(valor)) {
      errors.cnpj = "Por favor, informe um CPF ou CNPJ válido.";
      isValid = false;
    }
  }

  if (!formData.cep.trim()) {
    errors.cep = `Por favor, informe o ${
      countryConfigs[country]?.postalName || "CEP"
    }.`;
    isValid = false;
  }

  if (!formData.rua.trim()) {
    errors.rua = "Por favor, informe o nome da rua.";
    isValid = false;
  }

  if (!formData.bairro.trim()) {
    errors.bairro = "Por favor, informe o nome do bairro.";
    isValid = false;
  }

  if (!formData.cidade.trim()) {
    errors.cidade = "Por favor, informe o nome da cidade.";
    isValid = false;
  }

  if (!formData.estado.trim()) {
    errors.estado = "Por favor, informe o nome do estado.";
    isValid = false;
  }

  if (!formData.numeroDoEdificios.trim()) {
    errors.numeroDoEdificios = "Por favor, informe o número do edifício.";
    isValid = false;
  }

  return { isValid, errors };
};
