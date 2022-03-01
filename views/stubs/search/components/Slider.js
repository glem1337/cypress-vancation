/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper/core';
import { Button } from 'antd';

import CustomMatcher from 'views/stubs/shared/CustomMatcher';

SwiperCore.use([Pagination]);

const titles = [
  'Ely, Nevada',
  'Pueblo, Colorado',
  'Hawaii',
  'Phoenix, Arizona',
];

const SliderMob = ({ className, slidesCount }) => (
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
      {new Array(slidesCount).fill(null).map((_slide, i) => (
        <SwiperSlide>
          <a href="#" className="search-page__card">
            <img src="http://placeimg.com/340/200/nature" alt="" />
            <h3 className="search-page__card-title">
              {titles[i % titles.length]}
            </h3>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

const SliderDesk = ({ className, slidesPerView = 4, slidesCount }) => {
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
        {new Array(slidesCount).fill(null).map((_slide, i) => (
          <SwiperSlide>
            <a href="#" className="search-page__card">
              <img src="http://placeimg.com/340/200/nature" alt="" />
              <h3 className="search-page__card-title">
                {titles[i % titles.length]}
              </h3>
            </a>
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
      mobile={<SliderMob {...props} />}
      desktop={<SliderDesk {...props} />}
    />
  </CustomMatcher.Provider>
);

export default Slider;
