import React from 'react';
import { Button, Col, Divider, Row } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';

import isPresent from 'utils/isPresent';

import Slide from './Slide';
import SlideSkeleton from './SlideSkeleton';

const FavoriteDestinations = ({
  isLoading,
  swiperRef,
  currentSlide,
  slides,
  amountSlides,
  isFetchingAllLocations,
  amountLocationOnSlide,
  handlerNext,
  handlerPrev,
  handlerSlide,
  swiperProps,
  swiperLayoutKey,
}) => {
  if (!isPresent(slides)) {
    return null;
  }

  return (
    <div className="home__favorite">
      <div className="container">
        <div className="home__favorite-inner">
          <Row>
            <Col md={20} xl={16}>
              <h2 className="home-title-sec mb-16">
                <FormattedMessage id="homePage.favoriteDestinations.title" />
              </h2>
            </Col>
            <Col span={22} md={20} xl={14}>
              <p className="text-subheader text-color-gray font-400">
                <FormattedMessage id="homePage.favoriteDestinations.subtitle" />
              </p>
            </Col>
          </Row>
          <div className="main-slider-wrap main-slider-wrap--one">
            <Swiper
              className="home-slider-pos"
              ref={swiperRef}
              onSlideChange={handlerSlide}
              key={swiperLayoutKey}
              {...swiperProps}
            >
              {slides.map((elem) => (
                <SwiperSlide key={elem[0].parentId}>
                  <Slide slide={elem} />
                </SwiperSlide>
              ))}
              {(isFetchingAllLocations || isLoading) && (
                <SwiperSlide>
                  <SlideSkeleton
                    amountLocationOnSlide={amountLocationOnSlide}
                  />
                </SwiperSlide>
              )}
            </Swiper>
            <div className="swiper-pagination swiper-pagination-fraction">
              {currentSlide}
              {' / '}
              {amountSlides}
            </div>
            <div className="search-page__slider-nav">
              <Button
                className="button-prev"
                icon={<i className="icon icon-left font-14" />}
                type="secondary"
                shape="circle"
                onClick={handlerPrev}
              />
              <Button
                className="ml-16 button-next"
                icon={<i className="icon icon-right font-14" />}
                type="secondary"
                shape="circle"
                onClick={handlerNext}
                loading={isLoading || false}
              />
            </div>
          </div>
          <Divider className="mt-0 mb-0" />
        </div>
      </div>
    </div>
  );
};

FavoriteDestinations.defaultProps = {
  swiperRef: null,
  isLoading: false,
  slides: null,
};

FavoriteDestinations.propTypes = {
  isLoading: PropTypes.bool,
  swiperRef: PropTypes.shape(),
  currentSlide: PropTypes.number.isRequired,
  slides: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape().isRequired,
    ).isRequired,
  ),
  amountSlides: PropTypes.number.isRequired,
  isFetchingAllLocations: PropTypes.bool.isRequired,
  amountLocationOnSlide: PropTypes.number.isRequired,
  handlerPrev: PropTypes.func.isRequired,
  handlerNext: PropTypes.func.isRequired,
  handlerSlide: PropTypes.func.isRequired,
  swiperProps: PropTypes.shape().isRequired,
  swiperLayoutKey: PropTypes.string.isRequired,
};

export default FavoriteDestinations;
