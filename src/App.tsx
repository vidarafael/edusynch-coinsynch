import { Routes, Route } from "react-router-dom";
import { CoinCryptoProvider } from "./contexts/CoinCrypto";
import { AuthUserProvider } from "./contexts/AuthUser";

import { Home } from "./pages/home";
import { Dashboard } from "./pages/dashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css'

export function App() {
  return (
    <CoinCryptoProvider>
      <AuthUserProvider>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover={false}
        theme="light"
      />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthUserProvider>
    </CoinCryptoProvider>
  )
}

