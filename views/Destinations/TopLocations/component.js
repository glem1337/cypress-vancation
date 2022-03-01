import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Button } from 'antd';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper/core';
import Link from 'next/link';

import isPresent from 'utils/isPresent';
import { createCampervanRentalRoute } from 'utils/createRouteHelper';

import InnerHtmlField from '../InnerHtmlField';

SwiperCore.use([Pagination]);

const TopLocations = ({
  swiperRef,
  swiperLayoutKey,
  swiperOptions,
  showPagination,
  moveLeft,
  moveRight,
  componentData,
}) => {
  if (!isPresent(componentData.title) || !isPresent(componentData.locations)) {
    return null;
  }

  return (
    <>
      <Divider className="mt-16 mb-16" />
      <div className="main-slider-container">
        <h2 className="text-subheader mr-32 mr-lg-148 mb-16">
          <InnerHtmlField html={componentData.title} />
        </h2>
        <div className="main-slider-wrap">
          <Swiper
            className="search-page__results-slider"
            key={swiperLayoutKey}
            ref={swiperRef}
            {...swiperOptions}
          >
            {componentData.locations.map((item) => (
              <SwiperSlide key={item.id}>
                <Link href={createCampervanRentalRoute({
                  state: componentData.stateSlug,
                  location: item.slug,
                })}
                >
                  <a className="search-page__card" target="_blank">
                    <img src={item.mainPhotoUrl360} alt="" />
                    <h3 className="search-page__card-title">
                      {item.locationName}
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

TopLocations.propTypes = {
  title: PropTypes.string,
  locations: PropTypes.arrayOf(PropTypes.shape()),
  swiperOptions: PropTypes.shape().isRequired,
  moveLeft: PropTypes.func.isRequired,
  moveRight: PropTypes.func.isRequired,
  swiperRef: PropTypes.shape().isRequired,
  swiperLayoutKey: PropTypes.string.isRequired,
  showPagination: PropTypes.bool.isRequired,
  componentData: PropTypes.shape().isRequired,
};

TopLocations.defaultProps = {
  title: undefined,
  locations: [],
};

export default TopLocations;
