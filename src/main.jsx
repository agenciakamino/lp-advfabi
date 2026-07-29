import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LeadFormProvider } from './context/LeadFormContext.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LeadFormProvider>
      <App />
    </LeadFormProvider>
  </React.StrictMode>,
)