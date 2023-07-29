import logo from 'src/assets/logo.svg'
import { Button } from 'src/components/button'
import { Dispatch, SetStateAction } from 'react'
import { MiniCarousel } from './components/mini-carousel'

import './styles.css'
interface HeaderProps {
  setOpenModalSignIn: Dispatch<SetStateAction<boolean>>
  setOpenModalSignUp: Dispatch<SetStateAction<boolean>>
}

export function Header({ setOpenModalSignIn, setOpenModalSignUp }: HeaderProps) {

  return (
    <header>
      <div className='home__header default__spacing'>
        <nav>
          <img src={logo} alt="Logo CoinSynch" />
          <a href="#">About us</a>
          <a href="#">Top Cryptos</a>
        </nav>

        <div className='home__header_carousel_container_desktop_device'>
          <MiniCarousel />
        </div>

        <div className='home__auth'>
          <Button id="home_btn_sign_in" text='Sign in' onClick={() => { setOpenModalSignIn(true) }}/>
          <Button text='Sign up' onClick={() => { setOpenModalSignUp(true) }}/>
        </div>
      </div>
      <div className='home__header_carousel_container_tablet_device default__spacing'>
        <MiniCarousel 
          slidesPerView={3}
          spaceBetween={0}
        />
      </div>
    </header>
  )
}