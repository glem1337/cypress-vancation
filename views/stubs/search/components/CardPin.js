/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import classNames from 'classnames';
import { Button, Tag } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper/core';

SwiperCore.use([Pagination]);

const CardPin = ({ isGlamper }) => {
  const [inFavourite, setInFavourite] = useState(false);
  const swiperRef = useRef(null);

  return (
    <div className="camper-card-preview camper-card-preview--map-pin">
      <div className="camper-card-preview__image-wrap">
        <div className="camper-card-preview__img">
          <Swiper
            ref={swiperRef}
            pagination={{ type: 'bullets', clickable: true }}
            watchOverflow
            loop
          >
            <SwiperSlide>
              <img src="https://bit.ly/3hO1hK9" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://bit.ly/2Soy3Xx" alt="" />
            </SwiperSlide>
          </Swiper>
          <Button
            className="swiper-nav-btn swiper-nav-btn-prev"
            shape="circle"
            icon={<i className="icon icon-left font-12" />}
            size="small"
            onClick={() => swiperRef.current.swiper.slidePrev()}
          />
          <Button
            className="swiper-nav-btn swiper-nav-btn-next"
            shape="circle"
            icon={<i className="icon icon-right font-12" />}
            size="small"
            onClick={() => swiperRef.current.swiper.slideNext()}
          />
        </div>
        <div className="camper-card-preview__card-tags">
          <div>
            <Tag icon={<i className="icon icon-star-f in-red-1000" />} />
            <Tag icon={<i className="icon icon-flash-f in-yellow-1000" />} />
          </div>
          <button
            type="button"
            className="camper-card-preview__favorite"
            onClick={() => setInFavourite((prev) => !prev)}
          >
            <i
              className={classNames(
                'icon',
                inFavourite ? 'icon-heart-f in-red-1000' : 'icon-heart in-white',
              )}
            />
          </button>
        </div>
        {isGlamper && (
          <div className="camper-card-preview__card-tag-glamper tag-glamper">
            <img src="/images/profile/Diamond-White.svg" alt="" />
          </div>
        )}
        <Tag
          className="camper-card-preview__card-tag-delivery"
          icon={<i className="icon icon-delivery-f in-black" />}
        />
      </div>
      <a href="#" className="camper-card-preview__bottom">
        <div className="mb-8 text-subtitle font-700 text-truncate">
          Forest River Grey Wolf 2020 Lake Park
        </div>
        <div>
          <p className="text-uppercase">Unique camper</p>
          <p className="text-uppercase">Ford Econoline 150</p>
        </div>
        <div className="d-flex justify-content-space-between mt-auto">
          <div className="d-flex align-items-center">
            <img src="/images/listing/Like-Green.svg" alt="" />
            <span className="text-subheader font-700 in-green-300 mr-4">
              95%
            </span>
            <span>(26)</span>
          </div>
          <div className="in-black">
            <span className="mr-4 text-title">$130</span>
            <span>/ night</span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default CardPin;
