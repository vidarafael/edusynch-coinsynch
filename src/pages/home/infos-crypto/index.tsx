import bitcoin from 'src/assets/bitcoin.svg'
import circle from 'src/assets/circle.svg'
import graphic from 'src/assets/graphic.svg'
import { Dispatch, SetStateAction } from 'react';

import desktop from 'src/assets/desktop.svg'
import { CardCrypto } from "./components/card-crypto";
import { Button } from 'src/components/button'

import './styles.css'

interface InfosCryptoProps {
  setOpenModalSignUp: Dispatch<SetStateAction<boolean>>
}

export function InfosCrypto({ setOpenModalSignUp }: InfosCryptoProps) {
  return (
    <section className='home__infocrypto_section'>
      <div className='default__spacing home__infocrypto_container'>
        <div className='home__infocrypto_container_cardcrypto'>
          <CardCrypto icon={bitcoin} title="Crypto Solutions" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, " />
          <CardCrypto icon={circle} title="Crypto Solutions" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, " />
          <CardCrypto icon={graphic} title="Crypto Solutions" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, " />
          <CardCrypto icon={desktop} title="Crypto Solutions" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, " />
        </div>

        <div className='home__infocrypto_container_information'>
          <span>Lorem ipsum</span>
          <h2>Lorem ipsum</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit <br /> ut aliquam, purus sit amet luctus venenatis, lectus <br /> magna fringilla urna, porttitor</p>
          <Button text="Sign up now" onClick={() => setOpenModalSignUp(true)}/>
        </div>
      </div>
    </section>
  )
}