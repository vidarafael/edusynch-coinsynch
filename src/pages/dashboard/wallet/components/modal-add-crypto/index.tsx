import { useState, MouseEvent, Dispatch, SetStateAction, useRef, useEffect, FormEvent } from 'react'
import ReactDOM from "react-dom";
import { IoMdClose } from 'react-icons/io';
import { ICrypto, useCoinCrypto } from 'src/contexts/CoinCrypto';
import { api } from 'src/services/axios';

import { Input } from 'src/components/input';
import { Button } from 'src/components/button';
import { CustomSelect } from 'src/pages/dashboard/wallet/components/modal-add-crypto/components/custom-select';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

import { IMyCrypto } from '../..';

import './styles.css'

interface ModalAddCrypto {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setMyCryptos: Dispatch<SetStateAction<IMyCrypto[]>>
  setTotalBalance: Dispatch<SetStateAction<number>>
}

export function ModalAddCrypto({ isOpen, setIsOpen, setMyCryptos, setTotalBalance }: ModalAddCrypto) {
  const { cryptos } = useCoinCrypto()
  const [selectedValue, setSelectedValue] = useState<ICrypto>({} as ICrypto);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null)

  const divOutsideRef = useRef<HTMLDivElement | null>(null)

  function handleClearFormAndCloseModal() {
    setIsOpen(false)
    setSelectedValue({} as ICrypto)
    setIsOptionsVisible(false)
    if (inputRef.current) {
      inputRef.current.value = '0,00'
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen])

  function handleClickOutsideModal(e: MouseEvent<HTMLDivElement>) {
    const modalOutsideId = (e.target as HTMLDivElement).getAttribute('id')

    if (!modalOutsideId) {
      return
    }

    if (modalOutsideId === divOutsideRef.current?.id) {
      handleClearFormAndCloseModal()
    }
  }

  function handleIncrementOrDecrement(string: 'INCREMENT' | 'DECREMENT') {
    if (!inputRef.current) {
      return
    }

    const valueInputToNumber = Number(inputRef.current.value)

    const calculate = string === 'INCREMENT' ? valueInputToNumber + 1 : valueInputToNumber - 1

    inputRef.current.value = String(calculate)
  }


  async function handleAddCrypto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const objectMyCryptos = {
      id: selectedValue.id,
      quantity: Number(inputRef.current?.value), 
      price: selectedValue.quote.USD.price, 
      logo: selectedValue.logo, 
      cmc_rank: selectedValue.cmc_rank, 
      name: selectedValue.name, 
      symbol: selectedValue.symbol,
      percent_change_24h: selectedValue.quote.USD.percent_change_24h
    }

    await api.post("/cryptos", { 
      ...objectMyCryptos,
      coinId: objectMyCryptos.id,
    })

    const totalBalance = objectMyCryptos.quantity * objectMyCryptos.price

    setMyCryptos((prevState) => {
      const findCryptoIndex = prevState.findIndex((coin) => coin.id === selectedValue.id)

      if (prevState[findCryptoIndex]) {
        prevState[findCryptoIndex].quantity += Number(inputRef.current?.value)
  
        return [...prevState]
      }

      return [...prevState, objectMyCryptos ]
    })

    setTotalBalance((prevState) => prevState + totalBalance)

    handleClearFormAndCloseModal()
  }

  return ReactDOM.createPortal(
    <div ref={divOutsideRef} className={`modal__overlay ${isOpen ? '' : 'modal__hidden'}`} onClick={handleClickOutsideModal}>
      <div className="modal__content modal__content_add_crypto">
        <button id="modal__btn_close" onClick={handleClearFormAndCloseModal}>
          <IoMdClose />
        </button>
        
        <form onSubmit={(e) => handleAddCrypto(e)}>
          <h4>Add Crypto</h4>

          <div>
            <CustomSelect 
              cryptos={cryptos} 
              selectedValue={selectedValue} 
              setSelectedValue={setSelectedValue} 
              isOptionsVisible={isOptionsVisible}
              setIsOptionsVisible={setIsOptionsVisible}
            />

            <div>
              <Input type="number" placeholder="0,00" ref={inputRef} />
              <div className='container_buttons_increment_decrement'>
                <button type="button" onClick={() => handleIncrementOrDecrement('INCREMENT')}><BiChevronUp /></button>
                <button type="button" onClick={() => handleIncrementOrDecrement('DECREMENT')}><BiChevronDown /></button>
              </div>
            </div>
          </div>

          <footer>
            <Button text="Add Crypto" type='submit'/>
          </footer>
        </form>
      </div>
    </div>,
    document.body
  )
}