import balance from 'src/assets/dashboard/icons/balance.svg'
import elephant from 'src/assets/dashboard/imgs/elephant.png'
import { Graphic } from './components/graphic'

import './styles.css'
import { useCoinCrypto } from 'src/contexts/CoinCrypto';
import { useEffect, useState } from 'react';

interface InfoWalletProps {
  totalBalance: number;
}


export function InfoWallet({ totalBalance }: InfoWalletProps) {
  const { cryptos } = useCoinCrypto()
  const [index, setIndex] = useState(0)
  
  const formatTotalBalance = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(totalBalance)

  const isPositive = cryptos?.[index]?.quote.USD.percent_change_24h >= 0

  useEffect(() => {
    if(!cryptos.length) {
      return
    }

    const idInterval = setInterval(() => {
      
      setIndex((prevState) => {
        const quantityCryptos = cryptos.length - 1
       
        return prevState === quantityCryptos ? 0 : prevState + 1
      })
    }, 5000)

    return () => {
      clearInterval(idInterval)
    }
  }, [cryptos])

  return (
    <header className='dashboard__infowallet'>
      <div className='currency'>
        <div className='currency_text'>
          <img src={balance} alt="balance" />

          <div>
            <h2>Balance <b>in US$</b></h2>
            <span>(approximately)</span>
          </div>
        </div>

        <div className='currency_balance'>
          <span>{formatTotalBalance}</span>
        </div>
      </div>

      <div className='currency_variation'>
        <aside>
          <span>Daily Variation</span>
          <div>
            <img src={cryptos?.[index]?.logo || ""} alt="image crypto coin" />
            <span>{cryptos?.[index]?.symbol || ""}</span>
          </div>
          <p className='positive_color'>+5.23%</p>

          {/* Show only mobile */}
          <div className='currency_variation_info_crypto_mobile'>
            <div>
              <img src={cryptos?.[index]?.logo || ""} alt="image crypto coin" />
              <span>ETH</span>
            </div>
            <p className={`${isPositive ? 'positive_color' : 'negative_color' }`}>{isPositive && '+'}{cryptos?.[index]?.quote.USD.percent_change_24h.toFixed(3)}%</p>
          </div>
        </aside>

        <div className='graphic'>
          <Graphic crypto={cryptos[index]}/>
        </div>
      </div>

      <div className='news'>
        <div>
          <h4>NFT's News</h4>
          <span>New ElephantX NFT to be lauched!</span>
          <a href="#">Read more +</a>
        </div>
        <img src={elephant} alt="elephant image" />
      </div>
    </header>
  )
}