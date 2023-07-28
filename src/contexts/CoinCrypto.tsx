import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { api } from "src/services/axios";

export interface ICrypto {
  id: number;
  logo: string;
  name: string;
  symbol: string;
  cmc_rank: number;
  quote: {
    USD: { 
      price: number;
      percent_change_24h: number;
    }
  }
}

interface CoinCryptoProviderProps {
  children: ReactNode
}

interface ICoinCryptoContext {
  cryptos: ICrypto[]
  setCryptos: Dispatch<SetStateAction<ICrypto[]>>
}

const CoinCryptoContext = createContext({} as ICoinCryptoContext)

export function CoinCryptoProvider({ children }: CoinCryptoProviderProps) {
  const [cryptos, setCryptos] = useState<ICrypto[]>([])

  async function handleGetCryptos() {
    const { data } = await api.get(`/cryptos-api`)
  
    setCryptos(data)
  }

  useEffect(() => {
    if (!cryptos.length) {
      handleGetCryptos()
    }
  }, [])

  return (
    <CoinCryptoContext.Provider value={{ cryptos, setCryptos }}>
      {children}
    </CoinCryptoContext.Provider>
  );
}

export function useCoinCrypto() {
  const context = useContext(CoinCryptoContext)

  return context
}