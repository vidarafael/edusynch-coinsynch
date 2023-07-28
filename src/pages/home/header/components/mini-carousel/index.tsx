import { useCoinCrypto } from "src/contexts/CoinCrypto";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import './styles.css'

export function MiniCarousel() {
  const { cryptos } = useCoinCrypto()

  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={100}
      loop={true}
      autoplay={{
        delay: 0,
      }}
      speed={10000}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay]}
      className='home__header_carousel'
    >
      {cryptos.map((crypto, index) => {
        const formatPrice = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(crypto.quote.USD.price)
        const isPositive = crypto.quote.USD.percent_change_24h >= 0

        return (
          <SwiperSlide key={index} className="home__header_carousel_content">
            <p>{crypto.symbol}</p>
            <p>{formatPrice}</p>
            <p className={`${isPositive ? 'positive_color' : 'negative_color' }`}>{isPositive && '+'}{crypto.quote.USD.percent_change_24h.toFixed(3)}</p>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}