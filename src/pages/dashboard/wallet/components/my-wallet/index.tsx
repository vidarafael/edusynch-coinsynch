import { Dispatch, SetStateAction } from "react"

import wallet from 'src/assets/wallet.svg'

import { Button } from "src/components/button"
import { EmptyWallet } from "./components/empty-wallet"

import { IMyCrypto } from "../.."
import { Table } from "./components/table"

import './styles.css'

interface MyWalletProps {
  setOpenModalAddCrypto: Dispatch<SetStateAction<boolean>>;
  handleOpenModalTransferCrypto: (crypto: IMyCrypto) => void;
  myCryptos: IMyCrypto[]
}

export function MyWallet({ setOpenModalAddCrypto, handleOpenModalTransferCrypto, myCryptos }: MyWalletProps) {

  return (
    <div className="dashboard__mywallet">
      <div className="dashboard_mywallet_container">
        <div className="dashboard__mywallet_header">
          <div>
            <img src={wallet} alt="wallet icon" />
            <h2>My Wallet</h2>
          </div>
          <Button text="+ Add crypto" onClick={() => setOpenModalAddCrypto(true)} />
        </div>
        {myCryptos.length ? (
          <Table 
            cryptos={myCryptos}
            handleOpenModalTransferCrypto={handleOpenModalTransferCrypto}
          />
        ) : <EmptyWallet/>}
      </div>
    </div>
  )
}