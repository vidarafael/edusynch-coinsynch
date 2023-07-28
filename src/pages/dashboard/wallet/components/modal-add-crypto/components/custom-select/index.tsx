import { MouseEvent, CSSProperties, Dispatch, SetStateAction } from "react";

import { BiChevronRight } from "react-icons/bi";
import { ICrypto } from "src/contexts/CoinCrypto";

import './styles.css'

interface CustomSelectProps {
  cryptos: ICrypto[];
  selectedValue: ICrypto;
  setSelectedValue: Dispatch<SetStateAction<ICrypto>>;
  isOptionsVisible: boolean;
  setIsOptionsVisible: Dispatch<SetStateAction<boolean>>;
}

export function CustomSelect({ cryptos, selectedValue, setSelectedValue, isOptionsVisible, setIsOptionsVisible }: CustomSelectProps) {
  const handleOptionClick = (e: MouseEvent, crypto: any) => {
    e.stopPropagation()
    setSelectedValue(crypto);
    setIsOptionsVisible(false);
  };

  const stylesSelectedOptions = {
    backgroundImage: `url(${isOptionsVisible ? '/arrowUp.svg' : '/arrowDown.svg'})`,
    color: selectedValue ? 'var(--text-base)' : 'var(--secondary-400)',
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
  } as CSSProperties

  const valueSelected = Object.values(selectedValue).length ? 
  (
    <>
      <img src={selectedValue.logo} alt={selectedValue.name} />
      <p>
        {selectedValue.name} <span>{selectedValue.symbol}</span>
      </p>
    </>
  ): (<span style={{ color: 'var(--secondary-500)' }}>Choose Crypto</span>)

  return (
    <div className="select_custom_container" onClick={() => setIsOptionsVisible((prevState) => !prevState)}>
      <div 
        className="selected-option" 
        style={stylesSelectedOptions}
      >
        {valueSelected}
      </div>
      {isOptionsVisible && (
        <ul className="options">
          {cryptos.map((crypto: any, index: number) => (
            <li key={index} onClick={(e) => handleOptionClick(e, crypto)}>
              <img src={crypto.logo} alt={crypto.name} />
              <p>
                {crypto.name} <span>{crypto.symbol}</span>
              </p>
              <BiChevronRight className="modal__add_crypto_custom_select_arrow_icon" />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}