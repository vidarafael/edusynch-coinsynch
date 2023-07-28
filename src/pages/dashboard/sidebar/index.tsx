import wallet from 'src/assets/wallet.svg'
import circle from 'src/assets/circle.svg'
import bitcoin from 'src/assets/bitcoin.svg'
import graphic from 'src/assets/graphic.svg'

import './styles.css'

export function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><img src={wallet} alt="wallet icon" /></li>
          <li><img src={circle} alt="circle icon" /></li>
          <li><img src={bitcoin} alt="bitcoin icon" /></li>
          <li><img src={graphic} alt="graphic icon" /></li>
        </ul>
      </nav>
    </aside>
  )
}