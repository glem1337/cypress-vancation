import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper/core';
import {
  Button, Col, Row,
} from 'antd';
import MainBtnGradient from '../../shared/buttons/MainBtnGradient';

const popularRV = [
  {
  image: '/images/listing/Modern-Van.svg',
  title: (
    <>
      Amazing
      {' '}
      <span className="in-blue-1000">Sprinter</span>
      ,
      {' '}
      <span className="in-blue-1000">Transit</span>
      {' '}
      and
      {' '}
      <span className="in-blue-1000">ProMaster</span>
      {' '}
      campervan rentals
    </>
  ),
  text: 'Campervan rentals are all the rave these days. Choose a high top glamper van for a luxury experience, or check out our 4x4 Sprinters to take on winter roads.',
  link: '',
  buttonTxt: 'Browse Campervans',
},
  {
    image: '/images/listing/VW-Bus.svg',
    title: (
      <>
        Rent your dream
        {' '}
        <span className="in-blue-1000">Volkswagen</span>
        ,
        {' '}
        <span className="in-blue-1000">Vanagon</span>
        {' '}
        or
        {' '}
        <span className="in-blue-1000">Westfalia</span>
      </>
    ),
    text: 'Westfalias, Eurovans and Vanagons never go out of style. Rent a Volkswagen for an iconic and classic campervan trip.',
    link: '',
    buttonTxt: 'Browse VW Buses',
  },
  {
    image: '/images/listing/Unique-Camper.svg',
    title: (
      <>
        Maybe you want a unique adventure? Check out
        {' '}
        <span className="in-blue-1000">Skoolies</span>
        ,
        {' '}
        Ambulance conversions & more
      </>
    ),
    text: 'If you’re looking for something harder to find but completely memorable then look no further! A skoolie or other unique conversion camper will fit the bill just right.',
    link: '',
    buttonTxt: 'Browse Unique Campers',
  },
  {
    image: '/images/listing/Vehicle-Camper.svg',
    title: (
      <>
        Find the perfect
        {' '}
        <span className="in-blue-1000">Vehicle Camper</span>
        {' '}
        and save a few dollars on your trip
      </>
    ),
    text: 'Don’t need a luxury camping trip? You’ll love our vehicle camper set-ups in everything from Jeeps with roof top tents to Tacomas with beds in the back.',
    link: '',
    buttonTxt: 'Browse VehicleCampers\n',
  },
];

SwiperCore.use([Pagination]);

const SliderPopular = () => {
  const swiperRef = useRef(null);

  return (
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
        {popularRV.map(item => (
          <SwiperSlide>
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
                        src={item.image}
                        alt=""
                      />
                    </div>
                  </Col>
                  <Col md={12} lg={{ span: 12, offset: 2 }}>
                    <div className="d-flex align-items-flex-start flex-column h-100">
                      <p className="text-title-headline mb-8 mb-md-16">
                        {item.title}
                      </p>
                      <p className="font-16 mb-24">
                        {item.text}
                      </p>
                      <MainBtnGradient
                        className="main-btn--sm-100 min-w-180 mt-auto"
                        href={item.link}
                        text={item.buttonTxt}
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
          onClick={() => swiperRef.current.swiper.slidePrev()}
        />
        <Button
          className="ml-16"
          icon={<i className="icon icon-right font-14" />}
          type="secondary"
          shape="circle"
          onClick={() => swiperRef.current.swiper.slideNext()}
        />
      </div>
    </div>
  );
};

export default SliderPopular;
