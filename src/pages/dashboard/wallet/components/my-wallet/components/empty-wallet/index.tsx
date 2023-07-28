import emptyWallet from 'src/assets/dashboard/icons/emptywallet.svg'

import './styles.css'

export function EmptyWallet() {
  return (
    <main className='dashboard__empty_wallet'>
      <img src={emptyWallet} alt="empty wallet icon" />

      <h3>Nothing here yet...</h3>
      <span>Add a crypto and start earning</span>
    </main>
  )
}