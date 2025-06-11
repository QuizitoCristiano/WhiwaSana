import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes";
import { GlobalProvider } from "./contexto_global/useContextGlobal";
import { AuthProvider } from "./UserAuthContext/AuthContext";

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
