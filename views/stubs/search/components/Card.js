/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Tag, Button } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper/core';

import CardDetailsPart from '../../shared/CardDetailsPart';

SwiperCore.use([Pagination]);

const Card = ({ isGlamper, isHighDemand, isBooked, mapVisible }) => {
  const [inFavourite, setInFavourite] = useState(false);
  const swiperRef = useRef(null);
  // Watch for mapVisibile changes to trigger sliders update
  useEffect(() => {
    swiperRef.current.swiper.update();
  }, [mapVisible]);

  return (
    <div className="camper-card-preview">
      <div className="camper-card-preview__image-wrap">
        <div className="camper-card-preview__img">
          <Swiper
            ref={swiperRef}
            pagination={{ type: 'bullets', clickable: true }}
            watchOverflow
            nested
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
        {isBooked && (
          <div className="camper-card-preview__card-booked">
            <span className="camper-card-preview__card-booked-badge">
              <i className="icon icon-time font-18 mr-8" />
              booked
            </span>
          </div>
        )}
        <div className="camper-card-preview__card-tags">
          <Tag icon={<i className="icon icon-star-f in-red-1000" />}>New!</Tag>
          {isHighDemand ? (
            <Tag icon={<i className="icon icon-long-up in-black" />}>
              High demand
            </Tag>
          ) : (
            <Tag icon={<i className="icon icon-flash-f in-yellow-1000" />}>
              Instant book
            </Tag>
          )}
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
            <img
              className="mr-4"
              src="/images/profile/Diamond-White.svg"
              alt=""
            />
            Glamper
          </div>
        )}
        <Tag
          className="camper-card-preview__card-tag-delivery"
          icon={<i className="icon icon-delivery-f in-black" />}
        >
          Delivery
        </Tag>
      </div>
      <a href="#" className="camper-card-preview__bottom">
        <CardDetailsPart />
        <div className="d-flex align-items-flex-end justify-content-space-between mt-auto">
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

export default Card;
