import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Spin } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import SwiperCore, { Pagination } from 'swiper';
import { LoadingOutlined } from '@ant-design/icons';

import { INSTAGRAM, INSTAGRAM_USER_NAME } from 'constants/social-links';
import isPresent from 'utils/isPresent';

SwiperCore.use([Pagination]);

const InstagramSectionComponent = ({
  photos,
  swiperProps,
  swiperLayoutKey,
  moveLeft,
  moveRight,
  swiperRef,
  showPagination,
  onSwiperInit,
  canMoveLeft,
  onReachEnd,
  sliderWrapperRef,
  containerRef,
}) => (
  <div className="home-inner-wrap" ref={containerRef}>
    {isPresent(photos) && (
      <div className="container">
        <h2 className="home-title-sec mb-8">
          <FormattedMessage id="homePage.instagram.title" />
        </h2>
        <p className="text-title mb-16 font-400">
          <FormattedMessage id="homePage.instagram.subTitle" />
        </p>
        <div className="mb-40 mb-md-60">
          <Row>
            <Col span={16}>
              <a
                rel="noreferrer"
                className="d-inline-flex align-items-center"
                href={INSTAGRAM}
                target="_blank"
              >
                <div className="home-insta-link">
                  <i className="icon icon-instagram in-white font-20" />
                </div>
                <p className="text-title font-400">
                  {INSTAGRAM_USER_NAME}
                </p>
              </a>
            </Col>
          </Row>
        </div>
        <div className="main-slider-wrap" ref={sliderWrapperRef}>
          <Swiper
            className="home-slider-pos"
            key={swiperLayoutKey}
            ref={swiperRef}
            {...swiperProps}
              // onSlideChange={onSlideChangeHandler}
            onInit={onSwiperInit}
            watchSlidesProgress
            onReachEnd={onReachEnd}
          >
            {photos.map((photo) => (
              <SwiperSlide key={photo.id}>
                <a
                  rel="noreferrer"
                  href={photo.postUrl}
                  target="_blank"
                >
                  <div className="home-insta__img">
                    <Spin
                      indicator={<LoadingOutlined spin />}
                      className="search-page__spin"
                    />
                    <img src={photo.imageUrl} alt="" />
                  </div>
                </a>
              </SwiperSlide>
              ))}
          </Swiper>
          <div className={classNames('search-page__slider-nav', { 'd-none': !showPagination })}>
            <Button
              icon={<i className="icon icon-left font-14" />}
              type="secondary"
              shape="circle"
              onClick={moveLeft}
              disabled={!canMoveLeft}
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
    )}
  </div>
  );

InstagramSectionComponent.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape()),
  swiperProps: PropTypes.shape().isRequired,
  moveLeft: PropTypes.func.isRequired,
  moveRight: PropTypes.func.isRequired,
  swiperRef: PropTypes.shape().isRequired,
  swiperLayoutKey: PropTypes.string.isRequired,
  showPagination: PropTypes.bool.isRequired,
  onReachEnd: PropTypes.func.isRequired,
  onSwiperInit: PropTypes.func.isRequired,
  canMoveLeft: PropTypes.bool.isRequired,
  sliderWrapperRef: PropTypes.shape().isRequired,
  containerRef: PropTypes.shape().isRequired,
};

InstagramSectionComponent.defaultProps = {
  photos: [],
};

export default InstagramSectionComponent;
