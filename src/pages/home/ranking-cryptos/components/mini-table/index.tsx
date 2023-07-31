
import { Dispatch, SetStateAction } from 'react';

import './styles.css'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

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

interface MiniTableProps {
  cryptos: ICryptoFormated[];
  setFormatedCryptos: Dispatch<SetStateAction<ICryptoFormated[]>>
}

export function MiniTable({ cryptos, setFormatedCryptos }: MiniTableProps) {

  function handleOpenContainerCrypto(id: number, cryptoIsOpen: boolean) {
    setFormatedCryptos((prevState) => {
      return prevState.map((crypto) => {
        if (crypto.id === id) {
          crypto.isOpen = !cryptoIsOpen
        }

        return crypto
      })
    })
  }

  return (
    <main className='home__container_mini_table'>
      <header className='home__container_mini_table_title'>
        <p>Crypto</p>
        <p>Trade</p>
      </header>
      <main>
        {cryptos.map((coinCrypto, index) => {
           const formatPrice = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', currencyDisplay: 'code' }).format(coinCrypto?.quote?.USD?.price).replace('D', '$')
           const isPositive = coinCrypto.quote.USD.percent_change_24h >= 0

           return (
            <div key={index} className='home__main_container_cryptos' onClick={() => {handleOpenContainerCrypto(coinCrypto.id, coinCrypto.isOpen)}}>
              <header>
                <div className='home__main_container_cryptos_header_content'>
                  <img src={coinCrypto.logo} alt="image crypto coin" />
                  <span>{coinCrypto.name}</span>
                  <p>{coinCrypto.symbol}</p>
                </div>
                <div className='home__main_container_cryptos_header_arrowicon'>
                  {coinCrypto.isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />} 
                </div>
              </header>

              {coinCrypto.isOpen && (
                <main>
                  <div>
                    <p>Price</p>
                    <p>{formatPrice}</p>
                  </div>
                  <div>
                    <p>Change</p>
                    <p className={`${isPositive ? 'positive_color' : 'negative_color' }`}>{isPositive && '+'}{coinCrypto.quote.USD.percent_change_24h.toFixed(3)}%</p>
                  </div>
                </main>
              )}
            </div>
           )
        })}
      </main>
    </main>
  )
}