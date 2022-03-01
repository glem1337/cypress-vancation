/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Col, Tag, Button } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper/core';
import CardDetailsPart from '../../shared/CardDetailsPart';

SwiperCore.use([Pagination]);

const CamperCard = ({ isGlamper, fullWidth, initiated }) => {
  const [inFavourite, setInFavourite] = useState(false);
  const swiperRef = useRef(null);
  useEffect(() => swiperRef.current.swiper.update(), [initiated]);

  return (
    <Col md={fullWidth ? 24 : 12} lg={fullWidth ? 24 : 8}>
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
          <div className="camper-card-preview__card-tags">
            <div>
              <Tag icon={<i className="icon icon-star-f in-red-1000" />}>
                New!
              </Tag>
              <Tag icon={<i className="icon icon-flash-f in-yellow-1000" />}>
                Instant book
              </Tag>
            </div>
            <button
              type="button"
              className="camper-card-preview__favorite"
              onClick={() => setInFavourite((prev) => !prev)}
            >
              <i
                className={classNames(
                  'icon',
                  inFavourite
                    ? 'icon-heart-f in-red-1000'
                    : 'icon-heart in-white',
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
        <a href="" className="camper-card-preview__bottom">
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
              <span>/night</span>
              <div className="text-color-gray text-align-right">
                $2,565 total
              </div>
            </div>
          </div>
        </a>
      </div>
    </Col>
  );
};

CamperCard.defaultProps = {
  fullWidth: false,
};

CamperCard.propTypes = {
  fullWidth: PropTypes.bool,
};

export default CamperCard;
