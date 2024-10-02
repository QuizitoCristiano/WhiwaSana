import { useState } from 'react'
import { MainRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { GlobalProvider } from './contexto_global/useContextGlobal'
import { MyFooter } from './footer/footerBx'



function App() {

  return (
    <GlobalProvider>
    <BrowserRouter>
    <MainRoutes/>
    
    </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
