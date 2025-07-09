import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom"
import App from './App.jsx'
import FormLogin from './router/FormLogin.jsx'
import FormCadastro from './components/FormCadastro.jsx'
import InitialValor from './router/InitialValor.jsx'
import FormProdutos from './router/FormProdutos.jsx'
import CreditValor from './router/CreditValor.jsx'

const router = createBrowserRouter ([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <FormLogin />
  },
  {
    path: "cadastro",
    element: <FormCadastro />
  },
  {
    path: "valorInicial",
    element: <InitialValor />
  },
  {
    path: "produtos",
    element: <FormProdutos />
  },
  {
    path: "credito",
    element: <CreditValor />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
