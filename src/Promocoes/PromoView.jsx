import { useState } from "react";

const disponibilidade = {
  luxo: 12,
  sendche: 13,
  presitencia: 10
};

export default function SistemaReservas() {
  const [carrinho, setCarrinho] = useState([]);

  function verificaDisponibilidade(tipoQuarto) {
    const ocupados = carrinho.filter(reserva => reserva.quarto === tipoQuarto).length;
    return ocupados < disponibilidade[tipoQuarto];
  }

  function adicionarAoCarrinho(reserva) {
    if (verificaDisponibilidade(reserva.quarto)) {
      setCarrinho([...carrinho, reserva]);
      console.log(`Reserva adicionada: ${reserva.cliente}`);
    } else {
      console.log("Tipo de quarto indisponível.");
    }
  }

  // Exemplo de uso:
  const novaReserva = {
    nome: "Quizito",
    quarto: "luxo",
    cliente: "João"
  };

  return (
    <div>
      <h1>Sistema de Reservas</h1>
      <button onClick={() => adicionarAoCarrinho(novaReserva)}>
        Adicionar Reserva
      </button>
      <ul>
        {carrinho.map((reserva, index) => (
          <li key={index}>{reserva.cliente} - {reserva.quarto}</li>
        ))}
      </ul>
    </div>
  );
}
