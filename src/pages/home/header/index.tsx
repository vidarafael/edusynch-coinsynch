import { Button } from 'src/components/button'
import { Dispatch, SetStateAction } from 'react'
import { MiniCarousel } from './components/mini-carousel'
import { ButtonHamburguer } from 'src/components/button-hamburguer'

import logo from 'src/assets/logo.svg'

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

        {/* only show for mobile device and tablets */}
        <div className='home__header_container_auth_hamburguer_mobile_device'>
          <ButtonHamburguer onClick={() => { setOpenModalSignIn(true) }} />
        </div>
      </div>
      {/* only show for tablets device and desktops */}
      <div className='home__header_container_carousel home__header_carousel_container_tablet_device default__spacing'>
        <MiniCarousel 
          slidesPerView={3}
          spaceBetween={0}
        />
      </div>

      {/* only show for mobile device and tablets */}
      <div className='home__header_container_carousel home__header_carousel_container_mobile_device default__spacing'>
        <MiniCarousel 
          slidesPerView={2}
          spaceBetween={120}
        />
      </div>
    </header>
  )
}