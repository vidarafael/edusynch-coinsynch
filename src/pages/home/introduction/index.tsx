import wave1 from 'src/assets/wave1.svg'
import wave2 from 'src/assets/wave2.svg'
import wave3 from 'src/assets/wave3.svg'
import { Button } from 'src/components/button'
import { Carousel } from './components/carousel'
import { BsArrowRight } from 'react-icons/bs'

import { Dispatch, SetStateAction } from 'react'

import './styles.css'

interface IntroductionProps {
  setOpenModalSignUp: Dispatch<SetStateAction<boolean>>
}

export function Introduction({ setOpenModalSignUp }: IntroductionProps) {
  return (
    <section className='home__introduction'>
      <main id="home_container_content" className='default__spacing'>
        <section className='home__introduction__content'>
          <h1>Lorem ipsum dolor sit <br/> amet, consectetur</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut <br/> aliquam, purus sit amet luctus venenatis, lectus magna fringilla <br/> urna, porttitor</p>
          <Button text={<span>SIGN UP NOW <BsArrowRight /></span>} onClick={() => {setOpenModalSignUp(true)}} />

          <div>
            <p>Cryptos</p>
            <p>NFTs</p>
            <p>Games</p>
          </div>
        </section>
        
        <section>
          <Carousel />
        </section>
      </main>
      
      <footer className='home__introduction_footer'>
        <img src={wave1} alt="Image wave" />
        <img src={wave2} alt="Image wave" />
        <img src={wave3} alt="Image wave" />
      </footer>
    </section>
  )
}