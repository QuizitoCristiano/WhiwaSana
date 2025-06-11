 const [formNweData, setFormNweData] = useState({ paymentMethod: "" });
  const [open, setOpen] = useState(false);
  const [isBoletoModalOpen, setBoletoModalOpen] = useState(false);
  const [boletoData, setBoletoData] = useState(null);

  const [isPixModalOpen, setPixModalOpen] = useState(false);
  const navigateHomepag = useNavigate();
  const selectedProduct = {
    /* Defina seu produto selecionado aqui */
  };

  const handleClickMyHomepag = () => {
    setLoading(true); // Ativa o estado de loading

    // Navegação com um pequeno atraso
    setTimeout(() => {
      navigateHomepag("", {
        state: { selectedProduct },
      });
      setLoading(false); // Desativa o loading após a navegação
      setOnCloseModl(false); // Fecha o modal
    }, 1000); // Ajuste o delay se necessário
  };

  const handleOpenPixModal = () => {
    setPixModalOpen(true);
  };

  const handleClosePixModal = () => {
    setPixModalOpen(false);
  };

  const handleOpenBoletoModal = async () => {
    const boleto = await generateBoleto(); // Chama a função que simula o boleto
    setBoletoData(boleto);
    setBoletoModalOpen(true);
  };

  const handleCloseBoletoModal = () => setBoletoModalOpen(false);

  // Função para gerar o boleto
  const generateBoleto = async () => {
    const codigoDeBarras = Math.random().toString().slice(2, 14); // Exemplo simples
    return {
      codigoDeBarras,
      linkPdf: "https://www.example.com/boleto.pdf",
    };
  };

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    telefone: "",
    cpf: "",
    email: "",
    numeroDoEdificios: "",
    rua: "",
    tipoImovel: "",
    bloco: "",
    apartamento: "",
    casa: "",
    paymentMethod: "",
  });

  // Recuperar os dados do LocalStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("newUser"));

    if (savedData) {
      setFormData(savedData); // Preencher o formulário com os dados salvos
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Recupera dados do localStorage e concatena rua + número
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("newUser"));

    if (savedData) {
      const enderecoCompleto = `${savedData.rua}, ${
        savedData.numeroDoEdificios || ""
      }`.trim();
      setFormData({ ...savedData, rua: enderecoCompleto });
    }
  }, []);

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handlePaymentMethodChange = (value) => {
    setFormNweData({ ...formData, paymentMethod: value });

    if (value === "pix") {
      handleOpenPixModal();
    } else if (value === "código de barras") {
      handleOpenBoletoModal();
    }
  };

  const paymentMethods = [
    { label: "Pix", value: "pix" },
    { label: "Cartão de Crédito", value: "credit_card" },
    { label: "Cartão de Débito", value: "debit_card" },
    { label: "Alimentação", value: "alimentacao" },
    { label: "Código de Barras", value: "código de barras" },
    { label: "Refeição", value: "refeicao" },
    { label: "Pagamento na Entrega", value: "cash_on_delivery" },
  ];

  const handleInputChange = (fullName, value) => {
    setFormData({ ...formData, [fullName]: value });
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...formData, [fullName]: value })
    );

    if (field === "tipoImovel") {
      if (value === "casa") {
        formData.apartamento = "";
        formData.bloco = "";
      } else if (value === "apartamento") {
        formData.casa = "";
      }
    }

    setFormData(formData);
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("newUser"));
    if (savedData) {
      const enderecoCompleto = `${savedData.rua}, ${
        savedData.numeroDoEdificios || ""
      }`.trim();
      setFormData({ ...savedData, rua: enderecoCompleto });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const errors = {};

    // Validação de campos obrigatórios
    if (!formData.fullName) {
      errors.fullName = "O nome completo é obrigatório";
    }

    if (!formData.telefone) {
      errors.telefone = "O telefone é obrigatório";
    }

    if (!formData.cpf || !validarCPF(formData.cpf)) {
      errors.cpf = "CPF inválido";
    }

    if (!formData.email) {
      errors.email = "O email é obrigatório";
    }

    if (!formData.numeroDoEdificios) {
      errors.numeroDoEdificios = "O número do edifício é obrigatório";
    }

    if (!formData.rua) {
      errors.rua = "A rua é obrigatória";
    }

    if (!formData.paymentMethod) {
      errors.paymentMethod = "O método de pagamento é obrigatório";
    }

    if (formData.tipoImovel === "apartamento") {
      if (!formData.bloco) errors.bloco = "O número do bloco é obrigatório";
      if (!formData.apartamento)
        errors.apartamento = "O número do apartamento é obrigatório";
    }

    if (formData.tipoImovel === "casa") {
      if (!formData.casa) errors.casa = "O número da casa é obrigatório";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // try {
      //   await addDoc(collection(db, 'userRequest'), {
      //     cliente: formData,
      //     createdAt: new Date(),
      //   });
      //   setSuccessMessage('Formulário enviado com sucesso!');
      //   setFormData({
      //     fullName: '',
      //     telefone: '',
      //     cpf: '',
      //     email: '',
      //     numeroDoEdificios: '',
      //     rua: '',
      //     tipoImovel: '',
      //     bloco: '',
      //     apartamento: '',
      //     casa: '',
      //     paymentMethod: '',
      //   });
      // } catch (error) {
      //   console.error('Erro ao salvar no Firebase:', error);
      // }
    }

    setLoading(false);
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



// leticiajosealbino@gmail.com
// Leticia29

// willjose121@gmail.com
// Will5543
// 74580-520

// felipemario@gmail.com
// agostinho@25


// anaclaudia@gmail.com
// AnaClaudia28

// kuizitocritiano@10gmail.com
// Agostinho10

// lynacristiano28@gmai.com
// lyina28
//Usuário cadastrado com sucesso!

// biancamario29@gmail.com

// bianca25


// lisaniatharciso18@gmail.com
// 1983628lT


// marjory@gmai.com
// 1903647


// emerina@gmail.com
// ncvhsakid8



// andoni6743@uorak.com
// 1524380



// delicacy10@gmail.com
// delicaclly19


// quizitocritiano@10gmail.com
// Agostinho@10

// delicacy10@gmail.com
// Dellicacy362@
// kizitocristiano@gmail.com
// kizito25

// WillSon Vrigilio Jose
// willsonvrigiliojose@gmail.com
// willson10

// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     // Restringe acesso aos próprios dados do usuário
//     match /users/{userId} {
//       allow read, write: if request.auth != null && request.auth.uid == userId;
//       // Opcional: Adicionar validações para garantir que os campos são os esperados
//       allow create: if request.resource.data.keys().hasAll(['name', 'email']) && request.resource.data.size() == 2;
//       allow update: if request.auth != null && request.auth.uid == userId && request.resource.data.keys().hasAll(['name', 'email']);
//     }

//     // Permitir leitura pública de uma subcoleção (opcional)
//     match /publicData/{document=**} {
//       allow read: if request.auth != null; // Somente usuários autenticados podem ler
//     }
//   }
// }
