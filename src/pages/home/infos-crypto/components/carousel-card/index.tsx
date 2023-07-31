


import { Swiper, SwiperSlide } from 'swiper/react';
import { CardCrypto } from '../card-crypto';

import bitcoin from 'src/assets/bitcoin.svg'
import circle from 'src/assets/circle.svg'
import graphic from 'src/assets/graphic.svg'
import desktop from 'src/assets/desktop.svg'

import './styles.css'

export function CarouselCard() {
  return (
    <Swiper
      direction={'horizontal'}
      slidesPerView={1}
      spaceBetween={-40}
      centeredSlides={true}
      className='home__introduction_carousel'
    >
    <SwiperSlide>
      <CardCrypto icon={bitcoin} title="Crypto Solutions" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, " />
    </SwiperSlide>
    <SwiperSlide>
      <CardCrypto icon={circle} title="Crypto Solutions" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, " />
    </SwiperSlide>
    <SwiperSlide>
      <CardCrypto icon={graphic} title="Crypto Solutions" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, " />
    </SwiperSlide>
    <SwiperSlide>
      <CardCrypto icon={desktop} title="Crypto Solutions" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, " />
    </SwiperSlide>
  </Swiper>
  )
}