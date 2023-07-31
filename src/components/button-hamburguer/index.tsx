import { ButtonHTMLAttributes } from 'react'
import hamburguer from 'src/assets/hamburguer.svg'

import './styles.css'

export function ButtonHamburguer(props: ButtonHTMLAttributes<HTMLButtonElement>){
  return (
    <button className='btn_hamburguer' {...props}>
      <img src={hamburguer} alt='hamburguer icon' />
    </button>
  )
}