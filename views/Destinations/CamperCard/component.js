import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button, Tag, Skeleton } from 'antd';
import { FormattedMessage } from 'react-intl';

import useContainer from './hook';

const CamperCard = (props) => {
  const {
    swiperRef,
    slidePrev,
    slideNext,
    camperData,
    onMouseEnter,
    camperPhotos,
    onClick,
    areCampersFetching,
    isLoading,
  } = useContainer(props);

  if (areCampersFetching || isLoading) {
    return (
      <div className="camper-card-preview">
        <div className="camper-card-preview__image-wrap">
          <div className="camper-card-preview__img camper-card-preview__img-skeleton">
            <Skeleton active />
          </div>
        </div>
        <div className="camper-card-preview__bottom">
          <div className="mb-8 text-subtitle font-700 text-truncate">
            {camperData.name}
          </div>
          <div className="mb-16">
            <p className="text-uppercase">{camperData.vehicleTypeName}</p>
            <p className="text-uppercase">{camperData.makeModel}</p>
          </div>
          <div className="d-flex align-items-center">
            <div>
              <i className="icon icon-bed in-gray-500 mr-12" />
              <span className="mr-4">
                <FormattedMessage id="addNewCamper.camperDetails.form.sleeps" />
              </span>
              <span className="in-black">{camperData.sleeps}</span>
            </div>
            <div className="mr-8 ml-8">
              •
            </div>
            <div>
              <i className="icon icon-seats in-gray-500 mr-12" />
              <span className="mr-4">
                <FormattedMessage id="addNewCamper.camperDetails.form.seats" />
              </span>
              <span className="in-black">{camperData.seats}</span>
            </div>
          </div>
          <div className="d-flex align-items-flex-end justify-content-space-between mt-auto">
            <div className="d-flex align-items-center">
              <img src="/images/listing/Like-Green.svg" alt="" />
              <span className="text-subheader font-700 in-green-300 mr-4">
                {camperData.rating}
              </span>
            </div>
            <div className="in-black">
              <span className="mr-4 text-title">{camperData.cost}</span>
              <span>{camperData.costPeriod}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="camper-card-preview"
      role="button"
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      <div className="camper-card-preview__image-wrap">
        <div className="camper-card-preview__img">
          <Swiper
            ref={swiperRef}
            pagination={{ type: 'bullets', clickable: true }}
            watchOverflow
            nested
            loop={camperPhotos.length > 1}
          >
            {camperPhotos.map(photo => (
              <SwiperSlide key={photo.id}>
                <img src={photo.photoUrl360} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
          {camperPhotos.length > 1 && (
            <>
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
            </>
          )}
        </div>
        {camperData.isBooked && (
          <div className="camper-card-preview__card-booked">
            <span className="camper-card-preview__card-booked-badge">
              <i className="icon icon-time font-18 mr-8" />
              <FormattedMessage id="shared.booked" />
            </span>
          </div>
        )}
        <div className="camper-card-preview__card-tags">
          {camperData.isNew && (
            <Tag icon={<i className="icon icon-star-f in-red-1000" />}>
              <FormattedMessage id="shared.new" />
              !
            </Tag>
          )}
          {camperData.isHighDemand && (
            <Tag icon={<i className="icon icon-long-up in-black" />}>
              <FormattedMessage id="shared.highDemand" />
            </Tag>
          )}
          {camperData.isInstantBook && !camperData.isHighDemand && (
            <Tag icon={<i className="icon icon-flash-f in-yellow-1000" />}>
              <FormattedMessage id="shared.instantBook" />
            </Tag>
          )}
        </div>
        {camperData.isGlamper && (
          <div className="camper-card-preview__card-tag-glamper tag-glamper">
            <img
              className="mr-4"
              src="/images/profile/Diamond-White.svg"
              alt=""
            />
            <FormattedMessage id="shared.glamper" />
          </div>
        )}
        <Tag
          className="camper-card-preview__card-tag-delivery"
          icon={<i className="icon icon-delivery-f in-black" />}
        >
          <FormattedMessage id="shared.delivery" />
        </Tag>
      </div>
      <div className="camper-card-preview__bottom">
        <div className="mb-8 text-subtitle font-700 text-truncate">
          {camperData.name}
        </div>
        <div className="mb-16">
          <p className="text-uppercase">{camperData.vehicleTypeName}</p>
          <p className="text-uppercase">{camperData.makeModel}</p>
        </div>
        <div className="d-flex align-items-center">
          <div>
            <i className="icon icon-bed in-gray-500 mr-12" />
            <span className="mr-4">
              <FormattedMessage id="addNewCamper.camperDetails.form.sleeps" />
            </span>
            <span className="in-black">{camperData.sleeps}</span>
          </div>
          <div className="mr-8 ml-8">
            •
          </div>
          <div>
            <i className="icon icon-seats in-gray-500 mr-12" />
            <span className="mr-4">
              <FormattedMessage id="addNewCamper.camperDetails.form.seats" />
            </span>
            <span className="in-black">{camperData.seats}</span>
          </div>
        </div>
        <div className="d-flex align-items-flex-end justify-content-space-between mt-auto">
          <div className="d-flex align-items-center">
            <img src="/images/listing/Like-Green.svg" alt="" />
            <span className="text-subheader font-700 in-green-300 mr-4">
              {camperData.rating}
            </span>
          </div>
          <div className="in-black">
            <span className="mr-4 text-title">{camperData.cost}</span>
            <span>{camperData.costPeriod}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CamperCard;
