import logo from 'src/assets/logo.svg'
import './styles.css'
import { Button } from 'src/components/button'
import { Dispatch, SetStateAction } from 'react'
import { MiniCarousel } from './components/mini-carousel'

interface HeaderProps {
  setOpenModalSignIn: Dispatch<SetStateAction<boolean>>
  setOpenModalSignUp: Dispatch<SetStateAction<boolean>>
}

export function Header({ setOpenModalSignIn, setOpenModalSignUp }: HeaderProps) {

  return (
    <header className='home__header default__spacing'>
      <nav>
        <img src={logo} alt="Logo CoinSynch" />
        <a href="#">About us</a>
        <a href="#">Top Cryptos</a>
      </nav>

      <div>
        <MiniCarousel />
      </div>

      <div className='home__auth'>
        <Button id="home_btn_sign_in" text='Sign in' onClick={() => { setOpenModalSignIn(true) }}/>
        <Button text='Sign up' onClick={() => { setOpenModalSignUp(true) }}/>
      </div>
    </header>
  )
}