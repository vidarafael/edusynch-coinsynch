import { MouseEvent, CSSProperties, Dispatch, SetStateAction } from "react";

import './styles.css'

interface CustomSelectProps {
  selectedValue: string;
  setSelectedValue: Dispatch<SetStateAction<string>>;
  isOptionsVisible: boolean;
  setIsOptionsVisible: Dispatch<SetStateAction<boolean>>;
}

export function CustomSelect({ selectedValue, setSelectedValue, isOptionsVisible, setIsOptionsVisible }: CustomSelectProps) {
  const handleOptionClick = (e: MouseEvent, transfers: string) => {
    e.stopPropagation()
    setSelectedValue(transfers);
    setIsOptionsVisible(false);
  };

  const stylesSelectedOptions = {
    backgroundImage: `url(${isOptionsVisible ? '/arrowUp.svg' : '/arrowDown.svg'})`,
    color: selectedValue ? 'var(--text-base)' : 'var(--secondary-400)',
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
  } as CSSProperties

  const valueSelected = selectedValue ? 
  (
    <>
      <p>
        {selectedValue}
      </p>
    </>
  ): (<span style={{ color: 'var(--secondary-500)' }}>Select transfer</span>)

  const values = ['Transfer in', 'Transfer Out']

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
          {values.map((value: string, index: number) => (
            <li key={index} onClick={(e) => handleOptionClick(e, value)}>
              <span>
                {value}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}