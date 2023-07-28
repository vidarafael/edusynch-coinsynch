
import { useEffect, useState } from 'react'
import { ICrypto } from 'src/contexts/CoinCrypto'

import { InfoWallet } from './components/info-wallet'
import { MyWallet } from './components/my-wallet'
import { ModalAddCrypto } from './components/modal-add-crypto'
import { ModalTransferCrypto } from './components/modal-transfer-crypto'

import './styles.css'

import { api } from 'src/services/axios'

export interface IMyCrypto extends Omit<ICrypto, 'quote'> {
  quantity: number;
  price: number;
  percent_change_24h: number;
}

export function Wallet() {
  const [openModalAddCrypto, setOpenModalAddCrypto] = useState(false)
  const [openModalTransferCrypto, setOpenModalTransferCrypto] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState<IMyCrypto>({} as IMyCrypto)
  const [myCryptos, setMyCryptos] = useState<IMyCrypto[]>([])
  const [totalBalance, setTotalBalance] = useState(0)

  function handleOpenModalTransferCrypto(crypto: IMyCrypto) {
    setOpenModalTransferCrypto(true)
    setSelectedCrypto(crypto)
  }

  async function handleGetMyCryptos() {
    const { data } = await api.get('/cryptos')

    setMyCryptos(data.coins)
    setTotalBalance(data?.totalBalance || 0)
  }

  useEffect(() => {
    handleGetMyCryptos()
  }, [])

  return (
    <>
      <main className='dashboard__wallet_container'>
        <InfoWallet totalBalance={totalBalance} />
        <MyWallet 
          setOpenModalAddCrypto={setOpenModalAddCrypto} 
          handleOpenModalTransferCrypto={handleOpenModalTransferCrypto}
          myCryptos={myCryptos}
        />
      </main>

      <ModalAddCrypto 
        isOpen={openModalAddCrypto} 
        setIsOpen={setOpenModalAddCrypto} 
        setMyCryptos={setMyCryptos}
        setTotalBalance={setTotalBalance}
      />
      
      <ModalTransferCrypto 
        isOpen={openModalTransferCrypto} 
        setIsOpen={setOpenModalTransferCrypto} 
        crypto={selectedCrypto} 
        setMyCryptos={setMyCryptos}
        setTotalBalance={setTotalBalance}
      />
    </>
  )
}