import { Button } from "src/components/button"
import { IMyCrypto } from "src/pages/dashboard/wallet"

import './styles.css'

interface CardsCryptoProps {
  cryptos: IMyCrypto[]
  handleOpenModalTransferCrypto: (crypto: IMyCrypto) => void;
}

export function CardsCrypto({ cryptos, handleOpenModalTransferCrypto }: CardsCryptoProps) {

  return (
    <div className="dashboard__container_card_crypto_mobile">
      {cryptos.map((coinCrypto) => {
        const formatPrice = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', currencyDisplay: 'code' }).format(coinCrypto?.price).replace('D', '$')
        const isPositive = coinCrypto?.percent_change_24h >= 0

        return (
          <div key={coinCrypto.id} className="dashboard__container_content_card_crypto">
            <header>
              <img src={coinCrypto.logo} alt="image crypto coin" />
              <p>{coinCrypto.name} <span>{coinCrypto.symbol}</span></p>
            </header>

            <main>
              <div className="dashboard__container_content_card_crypto_holdings">
                <p>Holdings</p>
                <span>{formatPrice}</span>
                <p id="dashboard__holdings_quantity">{coinCrypto.quantity} {coinCrypto.symbol}</p>
              </div>

              <div className="dashboard__container_content_card_crypto_change">
                <span>Change</span>
                <p className={`${isPositive ? 'positive_color' : 'negative_color' }`}>{isPositive && '+'}{coinCrypto?.percent_change_24h?.toFixed(3)}%</p>
              </div>

              <Button text="Trade" onClick={() => { handleOpenModalTransferCrypto(coinCrypto) }} />
            </main>
          </div>
        )
      })}
    </div>
  )
}