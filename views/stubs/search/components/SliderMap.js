import { Swiper, SwiperSlide } from 'swiper/react';

import CardSlide from './CardSlide';

const SliderMap = () => (
  <div className="search-page__map-slider">
    <Swiper
      slidesPerView="auto"
      watchOverflow
      freeMode
      freeModeSticky
      loop
    >
      <SwiperSlide>
        <CardSlide isGlamper />
      </SwiperSlide>
      <SwiperSlide>
        <CardSlide />
      </SwiperSlide>
      <SwiperSlide>
        <CardSlide />
      </SwiperSlide>
    </Swiper>
  </div>
);

export default SliderMap;
