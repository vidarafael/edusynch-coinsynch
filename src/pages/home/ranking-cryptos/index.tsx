import { useEffect, useState } from "react";
import { Table } from "./components/table";

import { Button } from "src/components/button";
import { useCoinCrypto } from "src/contexts/CoinCrypto";
import { MiniTable } from "./components/mini-table";

import './styles.css'

interface ICryptoFormated {
  isOpen: boolean;
  id: number;
  logo: string;
  name: string;
  symbol: string;
  cmc_rank: number;
  quote: {
      USD: {
          price: number;
          percent_change_24h: number;
      };
  } 
}

export function RankingCryptos() {
  const { cryptos } = useCoinCrypto()
  const [viewMore, setViewMore] = useState(false) 
  const cryptosViewMoreOrLess = viewMore ? cryptos.slice(0, 10) : cryptos.slice(0, 4)
  
  const [formatedCryptos, setFormatedCryptos] = useState<ICryptoFormated[]>([])

  useEffect(() => {
    const addingPropertyIsOpenInCryptos = cryptos.map((crypto) => ({...crypto, isOpen: false}))
    
    if (viewMore) {
      return setFormatedCryptos(addingPropertyIsOpenInCryptos.slice(0, 10))
    }

    setFormatedCryptos(addingPropertyIsOpenInCryptos.slice(0, 4))
  }, [cryptos, viewMore])


  return (
    <section className="home__ranking_cryptos default__spacing">
      <main className="home__main_ranking_cryptos">
        <h2>Top Cryptos</h2>
        <Table cryptos={cryptosViewMoreOrLess} btnAction={<Button id="btn_table_crypto_buy" text="Buy" />}/>
        {/* Show for mobile device */}
        <div className="home__table_ranking_cryptos_mobile">
          <MiniTable cryptos={formatedCryptos} setFormatedCryptos={setFormatedCryptos} />
        </div>
        <button onClick={() => setViewMore((prevState) => !prevState)}>{viewMore ? 'View less' : 'View more +'}</button>
      </main>
    </section>
  )
}