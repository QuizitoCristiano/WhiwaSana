import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes";
import { GlobalProvider } from "./contexto_global/useContextGlobal";


function App() {
  return (
    <GlobalProvider>
    <BrowserRouter>
      <MainRoutes/> {/* Nome corrigido */}
    </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
