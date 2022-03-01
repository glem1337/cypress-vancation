/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper/core';
import { Button } from 'antd';

import CustomMatcher from 'views/stubs/shared/CustomMatcher';
import CamperCard from '../../ownerProfile/components/CamperCard';

SwiperCore.use([Pagination]);

const SliderFavoriteMob = ({ className }) => {
  const [initiated, setInitiated] = useState(false);

  return (
    <div className="main-slider-wrap">
      <Swiper
        className={className}
        pagination={{
          type: 'fraction',
        }}
        slidesPerView="auto"
        freeMode
        freeModeSticky
        loop
        onInit={() => setInitiated(true)}
      >
        {new Array(8).fill('').map(() => (
          <SwiperSlide>
            <CamperCard isGlamper fullWidth initiated={initiated} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const SliderFavoriteDesk = ({ className }) => {
  const [initiated, setInitiated] = useState(false);
  const swiperRef = useRef(null);

  return (
    <div className="main-slider-wrap">
      <Swiper
        ref={swiperRef}
        className={className}
        pagination={{
          type: 'fraction',
        }}
        watchOverflow
        loop
        loopFillGroupWithBlank
        slidesPerView={4}
        slidesPerGroup={4}
        spaceBetween={24}
        onInit={() => setInitiated(true)}
      >
        {new Array(8).fill('').map(() => (
          <SwiperSlide>
            <CamperCard isGlamper fullWidth initiated={initiated} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="search-page__slider-nav">
        <Button
          icon={<i className="icon icon-left font-14" />}
          type="secondary"
          shape="circle"
          onClick={() => swiperRef.current.swiper.slidePrev()}
        />
        <Button
          className="ml-16"
          icon={<i className="icon icon-right font-14" />}
          type="secondary"
          shape="circle"
          onClick={() => swiperRef.current.swiper.slideNext()}
        />
      </div>
    </div>
  );
};

const SliderFavorite = (props) => (
  <CustomMatcher.Provider>
    <CustomMatcher.Matcher
      mobile={<SliderFavoriteMob {...props} />}
      desktop={<SliderFavoriteDesk {...props} />}
    />
  </CustomMatcher.Provider>
);

export default SliderFavorite;
