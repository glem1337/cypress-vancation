/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper/core';
import { Button } from 'antd';

import CustomMatcher from 'views/stubs/shared/CustomMatcher';
import Card from './Card';

SwiperCore.use([Pagination]);

const SliderCardsMob = ({ className, slidesCount, mapVisible }) => (
  <div className="main-slider-wrap">
    <Swiper
      className={className}
      pagination={{
        type: 'fraction',
      }}
      slidesPerView="auto"
      watchOverflow
      freeMode
      freeModeSticky
      loop
    >
      {new Array(slidesCount).fill(null).map(() => (
        <SwiperSlide>
          <Card isBooked mapVisible={mapVisible} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

const SliderCardsDesk = ({
  className,
  slidesPerView = 4,
  slidesCount,
  mapVisible,
}) => {
  const swiperRef = useRef(null);
  useEffect(() => {
    swiperRef.current.swiper.params.slidesPerView = slidesPerView;
    swiperRef.current.swiper.params.slidesPerGroup = slidesPerView;
    swiperRef.current.swiper.update();
  }, [slidesPerView]);

  return (
    <div className="main-slider-wrap">
      <Swiper
        ref={swiperRef}
        className={className}
        pagination={{
          type: 'fraction',
        }}
        watchOverflow
        loop={slidesCount > slidesPerView}
        loopFillGroupWithBlank
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerView}
        spaceBetween={24}
      >
        {new Array(slidesCount).fill(null).map(() => (
          <SwiperSlide>
            <Card isBooked mapVisible={mapVisible} />
          </SwiperSlide>
        ))}
      </Swiper>
      {slidesCount > slidesPerView && (
        <div className="search-page__slider-nav">
          <Button
            icon={<i className="icon icon-left font-14" />}
            type="secondary"
            shape="circle"
            onClick={() => {
              swiperRef.current.swiper.slidePrev();
            }}
          />
          <Button
            className="ml-16"
            icon={<i className="icon icon-right font-14" />}
            type="secondary"
            shape="circle"
            onClick={() => {
              swiperRef.current.swiper.slideNext();
            }}
          />
        </div>
      )}
    </div>
  );
};

const Slider = (props) => (
  <CustomMatcher.Provider>
    <CustomMatcher.Matcher
      mobile={<SliderCardsMob {...props} />}
      desktop={<SliderCardsDesk {...props} />}
    />
  </CustomMatcher.Provider>
);

export default Slider;
