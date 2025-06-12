import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../UserAuthContext/AuthContext";
import { db } from "../../firebaseconfig/firebaseconfig";

const VerificarCodigo = () => {
  const { user, enviarCodigoVerificacao } = useAuth();
  const userId = user?.uid;
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingReenvio, setLoadingReenvio] = useState(false);
  const navigate = useNavigate();

  const handleVerificar = async () => {
    setLoading(true);
    setError("");

    if (!userId) {
      setError("Usuário não autenticado.");
      setLoading(false);
      return;
    }

    try {
      const docRef = doc(db, "codigoVerificacao", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { codigoVerificacao, expiracao } = docSnap.data();
        const agora = new Date();

        if (codigo === codigoVerificacao && agora < expiracao.toDate()) {
          navigate("/RedefinirSenha");
        } else {
          setError("Código inválido ou expirado.");
        }
      } else {
        setError("Código não encontrado.");
      }
    } catch (err) {
      setError("Erro ao verificar código. Tente novamente.");
      console.error(err);
    }

    setLoading(false);
  };

  const handleReenviarCodigo = async () => {
    setLoadingReenvio(true);
    setError("");
    if (!userId) {
      setError("Usuário não autenticado.");
      setLoadingReenvio(false);
      return;
    }

    const result = await enviarCodigoVerificacao(user.email, user.uid);
    if (result?.success) {
      alert("Código reenviado para seu e-mail!");
    } else {
      alert("Erro ao enviar código, tente novamente.");
    }
    setLoadingReenvio(false);
  };

  return (
    <div>
      <h2>Digite o código enviado para seu e-mail</h2>
      <input
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        maxLength={8}
        placeholder="Ex: 12345678"
        disabled={loading}
      />
      <button onClick={handleVerificar} disabled={loading || codigo.length === 0}>
        {loading ? "Verificando..." : "Verificar"}
      </button>
      <button onClick={handleReenviarCodigo} disabled={loadingReenvio}>
        {loadingReenvio ? "Reenviando..." : "Reenviar Código"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default VerificarCodigo;
