import React from 'react';
import SwiperCore, { Pagination } from 'swiper/core';
import { Button, Spin, Divider } from 'antd';
import classNames from 'classnames';
import Link from 'next/link';
import { LoadingOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FormattedMessage } from 'react-intl';

import isPresent from 'utils/isPresent';
import useNearbyDestinations from 'utils/hooks/useNearbyDestinations';

SwiperCore.use([Pagination]);

const NearbyDestinations = () => {
  const {
    destinations,
    swiperOptions,
    swiperLayoutKey,
    constructDestinationLink,
    constructDestinationName,
    moveLeft,
    moveRight,
    swiperRef,
    showPagination,
    isDestinationsLoading,
  } = useNearbyDestinations();

  if (isDestinationsLoading || !isPresent(destinations)) {
    return null;
  }

  return (
    <>
      <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
      <div className="main-slider-container">
        <h2 className="text-headline mb-24">
          <FormattedMessage id="campervan-rental.nearbyDestinations" />
        </h2>
        <div className="main-slider-wrap">
          <Swiper
            className="search-page__slider"
            key={swiperLayoutKey}
            ref={swiperRef}
            {...swiperOptions}
          >
            {destinations.map((destination) => (
              <SwiperSlide key={destination?.id}>
                <Spin
                  indicator={<LoadingOutlined spin />}
                  className="search-page__spin"
                />
                <Link href={constructDestinationLink(destination)}>
                  <a
                    className="search-page__card"
                    target="_blank"
                    rel="noreferrer"
                  >

                    <img src={destination?.mainPhotoUrl360} alt="" />
                    <h3 className="search-page__card-title">
                      {constructDestinationName(destination)}
                    </h3>
                  </a>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={classNames('search-page__slider-nav', { 'd-none': !showPagination })}>
            <Button
              icon={<i className="icon icon-left font-14" />}
              type="secondary"
              shape="circle"
              onClick={moveLeft}
            />
            <Button
              className="ml-16"
              icon={<i className="icon icon-right font-14" />}
              type="secondary"
              shape="circle"
              onClick={moveRight}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NearbyDestinations;
