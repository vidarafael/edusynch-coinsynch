import { Routes, Route } from "react-router-dom";
import { CoinCryptoProvider } from "./contexts/CoinCrypto";
import { AuthUserProvider } from "./contexts/AuthUser";

import { Home } from "./pages/home";
import { Dashboard } from "./pages/dashboard";

import './index.css'

export function App() {
  return (
    <CoinCryptoProvider>
      <AuthUserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthUserProvider>
    </CoinCryptoProvider>
  )
}

