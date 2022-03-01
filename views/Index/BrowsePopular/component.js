import { Button, Col, Row } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';

import { BROWSER_POPULAR } from 'constants/home';
import BtnGradient from 'views/shared/BtnGradient';
import React from 'react';
import formatPhraseArrayGeneratorHelper from 'utils/formatPhraseArrayGeneratorHelper';
import ItemWithBlueColor from '../ItemWithBlueColor';

const BrowsePopular = ({
  swiperRef,
  handlerNext,
  handlerPrev,
  intl,
}) => (
  <div>
    <div className="container">
      <div className="d-flex  mb-40 mb-md-60">
        <h2 className="home-title-sec">
          <FormattedMessage id="homePage.browsePopular" />
        </h2>
      </div>
      <div className="main-slider-wrap main-slider-wrap--one home-popular-slider">
        <Swiper
          ref={swiperRef}
          className="home-slider-pos pb-0"
          pagination={{
            type: 'fraction',
          }}
          watchOverflow
          loop
          spaceBetween={24}
        >
          {BROWSER_POPULAR.map(({
            img,
            titleId,
            descriptionId,
            buttonId,
            link,
          }) => (
            <SwiperSlide key={descriptionId.id}>
              <Row className="h-100 pb-60 pb-md-80">
                <Col
                  span={24}
                  className="home-popular__item"
                >
                  <Row gutter={24} className="h-100">
                    <Col md={12} lg={{ span: 6, offset: 2 }}>
                      <div className="home-popular__item-img">
                        <img src="/images/home/Popular_rv_shape.svg" alt="" />
                        <img
                          className="home-popular__item-img-car"
                          src={img}
                          alt=""
                        />
                      </div>
                    </Col>
                    <Col md={12} lg={{ span: 12, offset: 2 }}>
                      <div className="d-flex align-items-flex-start flex-column h-100">
                        <p className="text-title-headline mb-8 mb-md-16">
                          {formatPhraseArrayGeneratorHelper({
                            tagName: 'color',
                            phrase: intl.formatMessage(titleId),
                          }).map(ItemWithBlueColor)}
                        </p>
                        <p className="font-16 mb-24">
                          <FormattedMessage {...descriptionId} />
                        </p>
                        <BtnGradient
                          className="main-btn--sm-100 min-w-180 mt-auto"
                          href={link}
                          text={<FormattedMessage {...buttonId} />}
                          size="large"
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="search-page__slider-nav">
          <Button
            icon={<i className="icon icon-left font-14" />}
            type="secondary"
            shape="circle"
            onClick={handlerPrev}
          />
          <Button
            className="ml-16"
            icon={<i className="icon icon-right font-14" />}
            type="secondary"
            shape="circle"
            onClick={handlerNext}
          />
        </div>
      </div>
    </div>
  </div>
);

BrowsePopular.defaultProps = {
  swiperRef: null,
};

BrowsePopular.propTypes = {
  breakpoints: PropTypes.shape().isRequired,
  swiperRef: PropTypes.shape(),
  handlerPrev: PropTypes.func.isRequired,
  handlerNext: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default BrowsePopular;
