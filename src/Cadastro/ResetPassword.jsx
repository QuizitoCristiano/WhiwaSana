// ResetPassword.jsx
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // ajuste o caminho
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const oobCode = params.get("oobCode");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("validating"); // validating | ready | success | error
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyCode = async () => {
      try {
        await verifyPasswordResetCode(auth, oobCode);
        setStatus("ready");
      } catch (err) {
        setError("Link inválido ou expirado.");
        setStatus("error");
      }
    };

    if (oobCode) {
      verifyCode();
    } else {
      setError("Código de verificação ausente.");
      setStatus("error");
    }
  }, [oobCode]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setStatus("success");
      setTimeout(() => navigate("/SignIn"), 2000); // redireciona após 2s
    } catch (err) {
      setError("Erro ao redefinir a senha.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Nova Senha</h2>
      {status === "validating" && <p>Validando código...</p>}
      {status === "ready" && (
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="Nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Redefinir senha</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      )}
      {status === "success" && (
        <p style={{ color: "green" }}>
          Senha redefinida com sucesso! Redirecionando para login...
        </p>
      )}
      {status === "error" && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
