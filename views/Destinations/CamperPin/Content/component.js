import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tag, Skeleton } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper/core';

SwiperCore.use([Pagination]);

const Content = ({
  swiperRef,
  isGlamper,
  isNew,
  isInstantBook,
  name,
  vehicleTypeName,
  makeModel,
  rating,
  cost,
  costPeriod,
  slidePrev,
  slideNext,
  showDetails,
  camperPhotos,
  onDoubleClick,
  isLoading,
}) => (
  <div
    className="camper-card-preview camper-card-preview--map-pin"
    role="button"
    onClick={showDetails}
    onDoubleClick={onDoubleClick}
  >
    <div className="camper-card-preview__image-wrap">
      <div className="camper-card-preview__img">
        {!isLoading && (
          <Swiper
            ref={swiperRef}
            pagination={{ type: 'bullets', clickable: true }}
            watchOverflow
            loop
          >
            {camperPhotos.map(photo => (
              <SwiperSlide key={photo.id}>
                <img src={photo.photoUrl274} alt="" />
              </SwiperSlide>
          ))}
          </Swiper>
        )}
        {isLoading && (
          <div className="camper-card-preview__skeleton-wrapper">
            <Skeleton active />
          </div>
        )}
        <Button
          className="swiper-nav-btn swiper-nav-btn-prev"
          shape="circle"
          icon={<i className="icon icon-left font-12" />}
          size="small"
          onClick={slidePrev}
        />
        <Button
          className="swiper-nav-btn swiper-nav-btn-next"
          shape="circle"
          icon={<i className="icon icon-right font-12" />}
          size="small"
          onClick={slideNext}
        />
      </div>
      <div className="camper-card-preview__card-tags">
        <div>
          {isNew && (
            <Tag icon={<i className="icon icon-star-f in-red-1000" />} />
          )}
          {isInstantBook && (
            <Tag icon={<i className="icon icon-flash-f in-yellow-1000" />} />
          )}
        </div>
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
        {name}
      </div>
      <div>
        <p className="text-uppercase">{vehicleTypeName}</p>
        <p className="text-uppercase">{makeModel}</p>
      </div>
      <div className="d-flex justify-content-space-between mt-auto">
        <div className="d-flex align-items-center">
          <img src="/images/listing/Like-Green.svg" alt="" />
          <span className="text-subheader font-700 in-green-300 mr-4">
            {rating}
          </span>
        </div>
        <div className="in-black">
          <span className="mr-4 text-title">{cost}</span>
          <span>{costPeriod}</span>
        </div>
      </div>
    </a>
  </div>
);

Content.propTypes = {
  swiperRef: PropTypes.shape().isRequired,
  isGlamper: PropTypes.bool.isRequired,
  isNew: PropTypes.bool.isRequired,
  isInstantBook: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  vehicleTypeName: PropTypes.string.isRequired,
  makeModel: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  costPeriod: PropTypes.string.isRequired,
  slidePrev: PropTypes.func.isRequired,
  slideNext: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
  camperPhotos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

Content.defaultProps = {
  isLoading: false,
};

export default Content;
