import { createRoot } from 'react-dom/client'
import Routes from './Routes.jsx'
import { StrictMode } from 'react'
import { AppProvider } from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <StrictMode>
    <Routes />
    </StrictMode>
  </AppProvider>
)
