import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './App'

// Provider de informações de usuário logado.
import AuthProvider from './contexts/AuthContext'

import { Toaster } from 'react-hot-toast'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <Toaster position="top-right" reverseOrder={false}/>
            <RouterProvider router={router}/>
        </AuthProvider>
  </StrictMode>,
)
