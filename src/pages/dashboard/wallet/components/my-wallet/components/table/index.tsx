import { IMyCrypto } from "src/pages/dashboard/wallet";
import { Button } from "src/components/button";

import trade from 'src/assets/dashboard/icons/trade.svg'

import './styles.css'

interface TableProps {
  cryptos: IMyCrypto[],
  handleOpenModalTransferCrypto: (crypto: IMyCrypto) => void;
}

export function Table({ cryptos, handleOpenModalTransferCrypto }: TableProps) {
  
  return (
    <table className="dashboard_wallet_table_cryptos">
      <thead>
        <tr>
          <th>#</th>
          <th style={{ width: '300px' }}>Crypto</th>
          <th style={{ width: '300px' }}>Holdings</th>
          <th>Change</th>
          <th>Trade</th>
        </tr>
      </thead>

      <tbody>
        {cryptos.map((coinCrypto, index) => {
          const formatPrice = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', currencyDisplay: 'code' }).format(coinCrypto?.price).replace('D', '$')
          const isPositive = coinCrypto?.percent_change_24h >= 0
          
          return (
            <tr key={index}>
              <td>{coinCrypto.cmc_rank}</td>
              <td className="table_cryptos_name_crypto">
                <img src={coinCrypto.logo} alt="image crypto coin" />
                <span>{coinCrypto.name}</span>
                <p>{coinCrypto.symbol}</p>
              </td>
              <td className="table_cryptos_holdings_crypto">
                <p>{formatPrice}</p>
                <span>{coinCrypto.quantity} {coinCrypto.symbol}</span>
              </td>
              <td><p className={`${isPositive ? 'positive_color' : 'negative_color' }`}>{isPositive && '+'}{coinCrypto?.percent_change_24h?.toFixed(3)}%</p></td>
              <td>
                <Button 
                    text={<img src={trade} alt="trade icon" />}
                    className="dashboard__btn_trade_crypto"
                    onClick={() => { handleOpenModalTransferCrypto(coinCrypto) }} 
                  /> 
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}