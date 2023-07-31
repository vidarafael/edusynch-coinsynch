import { Dispatch, SetStateAction } from "react"

import wallet from 'src/assets/wallet.svg'

import { Button } from "src/components/button"
import { EmptyWallet } from "./components/empty-wallet"

import { IMyCrypto } from "../.."
import { Table } from "./components/table"
import { CardsCrypto } from "./components/cards-crypto"

import './styles.css'

interface MyWalletProps {
  setOpenModalAddCrypto: Dispatch<SetStateAction<boolean>>;
  handleOpenModalTransferCrypto: (crypto: IMyCrypto) => void;
  myCryptos: IMyCrypto[]
}

export function MyWallet({ setOpenModalAddCrypto, handleOpenModalTransferCrypto, myCryptos }: MyWalletProps) {

  return (
    <div className="dashboard__mywallet">
      <div className="dashboard__mywallet_container">
        <div className="dashboard__mywallet_header">
          <div>
            <img src={wallet} alt="wallet icon" />
            <h2>My Wallet</h2>
          </div>
          <Button id="btn_add_crypto" text="+ Add crypto" onClick={() => setOpenModalAddCrypto(true)} />

          {/* Show only mobile device */}
          <button id="btn_add_crypto_mobile" onClick={() => setOpenModalAddCrypto(true)}>
            +
          </button>
        </div>
        {myCryptos.length ? (
          <>
            <Table 
              cryptos={myCryptos}
              handleOpenModalTransferCrypto={handleOpenModalTransferCrypto}
            />
            <CardsCrypto cryptos={myCryptos} handleOpenModalTransferCrypto={handleOpenModalTransferCrypto} />
          </>
        ) : <EmptyWallet/>}
      </div>
    </div>
  )
}