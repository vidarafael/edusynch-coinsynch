import balance from 'src/assets/dashboard/icons/balance.svg'
import elephant from 'src/assets/dashboard/imgs/elephant.png'
import { Graphic } from './components/graphic'

import './styles.css'

interface InfoWalletProps {
  totalBalance: number;
}


export function InfoWallet({ totalBalance }: InfoWalletProps) {
  const formatTotalBalance = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(totalBalance)

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
            <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" alt="image crypto coin" />
            <span>ETH</span>
          </div>
          <p className='positive_color'>+5.23%</p>

          <div className='currency_variation_info_crypto_mobile'>
            <div>
              <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" alt="image crypto coin" />
              <span>ETH</span>
            </div>
            <p className='positive_color'>+5.23%</p>
          </div>
        </aside>

        <div className='graphic'>
          <Graphic />
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