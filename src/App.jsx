import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes";
import { GlobalProvider } from "./contexto_global/useContextGlobal";
import { AuthProvider } from "./UserAuthContext/AuthContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack, Typography } from "@mui/material";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <GlobalProvider>
          <BrowserRouter>
            <MainRoutes />
          </BrowserRouter>
        </GlobalProvider>
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default App;
