import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { path } from 'ramda';

import getCamperDataForSearch from 'utils/destinations/getCamperDataForSearch';
import isPresent from 'utils/isPresent';
import { createCamperDetailsRoute } from 'utils/createRouteHelper';
import getCamperPhotos from 'utils/destinations/getCamperPhotos';

import useContainer from './hook';

const CampersSliderMobile = () => {
  const {
    campers,
    activeCamperId,
    swiperRef,
    onSlideChange,
  } = useContainer();

  if (!isPresent(campers) || !activeCamperId) {
    return null;
  }

  return (
    <div className="search-page__map-slider search-page__map-slider-extended">
      <Swiper
        slidesPerView="auto"
        watchOverflow
        freeMode
        freeModeSticky
        loop
        ref={swiperRef}
        onSlideChange={onSlideChange}
      >
        {campers.map(camper => {
          const camperData = getCamperDataForSearch(camper);
          const camperPhotos = getCamperPhotos(camper);

          const camperPhotoSrc = path(['0', 'photoUrl274'], camperPhotos);

          const model = camperData.model
            .toLowerCase()
            .split(' ')
            .join('-');

          const href = createCamperDetailsRoute({
            model,
            id: camper.id,
          });

          return (
            <SwiperSlide className="swiper-slide" key={camperData.id}>
              <Link href={href}>
                <div className="camper-card-preview camper-card-preview--small" data-camper-id={camperData.id}>
                  <div className="camper-card-preview__image-wrap">
                    <div className="camper-card-preview__img">
                      <img
                        src={camperPhotoSrc}
                        alt=""
                      />
                    </div>
                    <div className="camper-card-preview__card-tags">
                      <div>
                        {camperData.isNew && (
                          <span className="ant-tag">
                            <i className="icon icon-star-f in-red-1000" />
                          </span>
                        )}
                        {camperData.isInstantBook && (
                          <span className="ant-tag">
                            <i className="icon icon-flash-f in-yellow-1000" />
                          </span>
                        )}
                      </div>
                    </div>
                    {camperData.isGlamper && (
                      <div className="camper-card-preview__card-tag-glamper tag-glamper">
                        <img src="/images/profile/Diamond-White.svg" alt="" />
                      </div>
                    )}
                    <span className="ant-tag camper-card-preview__card-tag-delivery">
                      <i className="icon icon-delivery-f in-black" />
                    </span>
                  </div>
                  <a href="#" className="camper-card-preview__bottom">
                    <div className="camper-card-preview__bottom-title">
                      {camperData.name}
                    </div>
                    <div>
                      <p className="text-caption text-uppercase">{camperData.vehicleTypeName}</p>
                      <p className="text-caption text-uppercase">{camperData.makeModel}</p>
                    </div>
                    <div className="d-flex justify-content-space-between mt-auto">
                      <div className="d-flex align-items-center">
                        <img className="w-20" src="/images/listing/Like-Green.svg" alt="" />
                        <span className="font-600 in-green-300 mr-2">{camperData.rating}</span>
                      </div>
                      <div className="in-black">
                        <span className="text-subheader font-700 mr-4">{camperData.cost}</span>
                        <span className="text-caption">{camperData.costPeriod}</span>
                      </div>
                    </div>
                  </a>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CampersSliderMobile;
