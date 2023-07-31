import { ReactNode } from "react";
import { ICrypto } from "src/contexts/CoinCrypto";

import { Button } from "../../../../../components/button";
import trade from 'src/assets/dashboard/icons/trade.svg'

import './styles.css'

interface TableProps {
  cryptos: ICrypto[],
  btnAction?: ReactNode
  handleOpenModalTransferCrypto?: (crypto: ICrypto) => void;
}

export function Table({ cryptos, btnAction, handleOpenModalTransferCrypto }: TableProps) {
  
  return (
    <table className="table_cryptos">
      <thead>
        <tr>
          <th>#</th>
          <th style={{ width: '300px' }}>Crypto</th>
          <th style={{ width: '300px' }}>Price</th>
          <th>Change</th>
          <th>Trade</th>
        </tr>
      </thead>

      <tbody>
        {cryptos.map((coinCrypto, index) => {
          const formatPrice = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', currencyDisplay: 'code' }).format(coinCrypto?.quote?.USD?.price).replace('D', '$')
          const isPositive = coinCrypto.quote.USD.percent_change_24h >= 0
          
          return (
            <tr key={index}>
              <td>{coinCrypto.cmc_rank}</td>
              <td className="table_cryptos_name_crypto">
                <img src={coinCrypto.logo} alt="image crypto coin" />
                <span>{coinCrypto.name}</span>
                <p>{coinCrypto.symbol}</p>
              </td>
              <td className="table_cryptos_price_crypto"><p>{formatPrice}</p></td>
              <td><p className={`${isPositive ? 'positive_color' : 'negative_color' }`}>{isPositive && '+'}{coinCrypto.quote.USD.percent_change_24h.toFixed(3)}%</p></td>
              <td>
                {
                  btnAction ? btnAction 
                  : <Button 
                      text={<img src={trade} alt="trade icon" />}
                      className="dashboard__btn_trade_crypto"
                      onClick={() => {
                        handleOpenModalTransferCrypto && handleOpenModalTransferCrypto(coinCrypto)
                      }} 
                    /> 
                }
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}