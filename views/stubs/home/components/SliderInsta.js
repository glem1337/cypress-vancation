import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper/core';
import { Button } from 'antd';

import CustomMatcher from 'views/stubs/shared/CustomMatcher';

SwiperCore.use([Pagination]);

const SliderInstaMob = () => (
  <div className="main-slider-wrap">
    <Swiper
      className="home-slider-pos"
      pagination={{
        type: 'fraction',
      }}
      slidesPerView="auto"
      watchOverflow
      freeMode
      freeModeSticky
      loop
    >
      {new Array(8).fill('').map(() => (
        <SwiperSlide>
          <div className="home-insta__img">
            <img src="http://placeimg.com/340/340/nature" alt="" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

const SliderInstaDesk = () => {
  const swiperRef = useRef(null);

  return (
    <div className="main-slider-wrap">
      <Swiper
        ref={swiperRef}
        className="home-slider-pos"
        pagination={{
          type: 'fraction',
        }}
        watchOverflow
        loop
        loopFillGroupWithBlank
        slidesPerView={4}
        slidesPerGroup={4}
        spaceBetween={24}
      >
        {new Array(8).fill('').map(() => (
          <SwiperSlide>
            <div className="home-insta__img">
              <img src="http://placeimg.com/340/340/nature" alt="" />
            </div>
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

const SliderInsta = (props) => (
  <CustomMatcher.Provider>
    <CustomMatcher.Matcher
      mobile={<SliderInstaMob {...props} />}
      desktop={<SliderInstaDesk {...props} />}
    />
  </CustomMatcher.Provider>
);

export default SliderInsta;
