import React, { createContext, useState, useContext,  useEffect } from 'react';


const GlobalContext = createContext();


const GlobalProvider = ({ children }) => {
  const [someState, setSomeState] = useState(null);

  const [carinho, setCarinho] = useState([]);

  const adicionarItemAuCarinho = (item) => {
    setCarinho([...carinho, item])
  };

  return (
    <GlobalContext.Provider value={{ someState, setSomeState, carinho, adicionarItemAuCarinho }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
