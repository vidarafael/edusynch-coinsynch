import { useState, MouseEvent, Dispatch, SetStateAction, useRef, useEffect, FormEvent } from 'react'
import ReactDOM from "react-dom";
import { api } from 'src/services/axios';
import { IoMdClose } from 'react-icons/io';

import { Input } from 'src/components/input';
import { Button } from 'src/components/button';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { CustomSelect } from './components/custom-select';

import { IMyCrypto } from '../..';


import './styles.css'
import { toast } from 'react-toastify';

interface ModalTransferCryptoProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  crypto: IMyCrypto;
  setMyCryptos: Dispatch<SetStateAction<IMyCrypto[]>>;
  setTotalBalance: Dispatch<SetStateAction<number>>
}


export function ModalTransferCrypto({ isOpen, setIsOpen, crypto, setMyCryptos, setTotalBalance }: ModalTransferCryptoProps) {
  const [selectedValue, setSelectedValue] = useState('');
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null)

  const divOutsideRef = useRef<HTMLDivElement | null>(null)

  function handleClearFormAndCloseModal() {
    setIsOpen(false)
    setSelectedValue('')
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

  async function handleTransferCrypto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!selectedValue) {
      return toast.error('No type of transfer selected');
    }
 
    const inputQuantity = Number(inputRef.current?.value)

    if (inputQuantity <= 0) {
      return toast.error('Quantity value cannot be negative');
    }

    await api.post('/cryptos/transfer', {
      coinId: crypto.id,
      quantity: inputQuantity
    })

    const totalBalance = inputQuantity * crypto.price

    setMyCryptos((prevState) => {
      const findCryptoIndex = prevState.findIndex((coin) => coin.id === crypto.id)

      if (prevState[findCryptoIndex]) {
        const subtractCalculate = prevState[findCryptoIndex].quantity - inputQuantity
        
        if (subtractCalculate <= 0) {
          prevState.splice(findCryptoIndex, 1) // remove element if quantity less than 0
          return prevState
        }

        prevState[findCryptoIndex].quantity = subtractCalculate
      }

      return prevState
    })

    setTotalBalance((prevState) => prevState - totalBalance)

    handleClearFormAndCloseModal()
  }

  return ReactDOM.createPortal(
    <div ref={divOutsideRef} className={`modal__overlay ${isOpen ? '' : 'modal__hidden'}`} onClick={handleClickOutsideModal}>
      <div className="modal__content modal__content_transfer_crypto">
        <button id="modal__btn_close" onClick={handleClearFormAndCloseModal}>
          <IoMdClose />
        </button>
        
        <form onSubmit={(e) => handleTransferCrypto(e)}>
          <h4>Tansfer Crypto</h4>

          <div className="container_transfer_crypto">
            <span>You are transfering</span>
            <img src={crypto.logo} alt="icon" />
            <p>{crypto.name} <span className='color_secondary'>{crypto.symbol}</span></p>
          </div>


          <div className='container_transfer_crypto_inputs'>
            <div className='container_transfer_crypto_input_transfer'>
              <label>Transfer</label>
              <CustomSelect
                selectedValue={selectedValue} 
                setSelectedValue={setSelectedValue} 
                isOptionsVisible={isOptionsVisible}
                setIsOptionsVisible={setIsOptionsVisible}
              />
            </div>

            <div className='container_transfer_crypto_input_quantity'>
              <label htmlFor="quantity_crypto_transfer">Quantity</label>
              <div>
                <Input id="quantity_crypto_transfer" type="number" placeholder="0,00" ref={inputRef} max={crypto.quantity} />
                <div className='container_buttons_increment_decrement'>
                  <button type='button' onClick={() => handleIncrementOrDecrement('INCREMENT')}><BiChevronUp /></button>
                  <button type='button' onClick={() => handleIncrementOrDecrement('DECREMENT')}><BiChevronDown /></button>
                </div>
              </div>
            </div>
          </div>

          <footer>
            <Button text="Transfer Crypto" type='submit'/>
          </footer>
        </form>
      </div>
    </div>,
    document.body
  )
}