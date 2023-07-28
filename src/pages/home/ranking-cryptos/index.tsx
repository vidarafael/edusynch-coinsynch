import { Table } from "src/components/table";

import './styles.css'
import { Button } from "src/components/button";
import { useCoinCrypto } from "src/contexts/CoinCrypto";
import { useState } from "react";


export function RankingCryptos() {
  const { cryptos } = useCoinCrypto()
  const [viewMore, setViewMore] = useState(false) 

  const cryptosViewMoreOrLess = viewMore ? cryptos.slice(0, 10) : cryptos.slice(0, 4)

  return (
    <section className="home__ranking_cryptos default__spacing">
      <main>
        <h2>Top Cryptos</h2>
        <Table cryptos={cryptosViewMoreOrLess} btnAction={<Button id="btn_table_crypto_buy" text="Buy" />}/>
        <button onClick={() => setViewMore((prevState) => !prevState)}>{viewMore ? 'View less' : 'View more +'}</button>
      </main>
    </section>
  )
}