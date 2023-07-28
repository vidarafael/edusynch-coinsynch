
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';

import img1 from 'src/assets/imgs/img1.png'
import img2 from 'src/assets/imgs/img2.png'
import img3 from 'src/assets/imgs/img3.png'

import 'swiper/css';

import './styles.css'

export function Carousel() {
  return (
    <Swiper
      direction={'horizontal'}
      slidesPerView={1}
      spaceBetween={10}
      mousewheel={true}
      modules={[Mousewheel]}
      className='home__introduction_carousel'
    >
      <SwiperSlide><img src={img1} alt="Image of a girl holding a tablet" /></SwiperSlide>
      <SwiperSlide><img src={img2} alt="Image of a man holding a cell phone" /></SwiperSlide>
      <SwiperSlide><img src={img3} alt="Image of a girl holding a tablet" /></SwiperSlide>
    </Swiper>
  );
}