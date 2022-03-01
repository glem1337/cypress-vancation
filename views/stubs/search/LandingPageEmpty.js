import React, { useState } from 'react';
import classNames from 'classnames';
import { Row, Col, Divider } from 'antd';

import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';
import Header from './components/Header';
import Filters from './components/Filters';
import FiltersMob from './components/FiltersMob';
import { Footer } from '../layout/Footer';
import ResultsEmpty from './components/ResultsEmpty';
import Map from './components/Map';
import MapMob from './components/MapMob';
import Slider from './components/Slider';

const LandingPageEmpty = () => {
  const [filtersMobVisible, setFiltersMobVisible] = useState(false);
  const filtersMobToggle = () => setFiltersMobVisible((prev) => !prev);

  const [mapMobActive, setMapMobActive] = useState(false);
  const mapMobToggle = () => {
    if (window.innerWidth < 768) {
      const wrap = document.querySelector('.search-page__wrap');
      const el = document.querySelector('.search-page__content');
      if (!mapMobActive) {
        wrap.scrollTop = 0;
        const { top } = el.getBoundingClientRect();
        const target = window.innerHeight - 124;
        el.style.transform = `translateY(${target - top}px)`;
      } else {
        el.style.transform = 'translateY(0)';
      }
    }
    setMapMobActive((prev) => !prev);
  };

  return (
    <div
      className={classNames(
        'search-page__wrap',
        mapMobActive && 'scroll-hidden',
      )}
    >
      <Header filtersMobToggle={filtersMobToggle} />
      <Filters filtersMobToggle={filtersMobToggle} isEmpty />
      <FiltersMob
        visible={filtersMobVisible}
        filtersMobToggle={filtersMobToggle}
      />
      <MapMob
        active={mapMobActive}
        mapMobToggle={mapMobToggle}
        filtersMobToggle={filtersMobToggle}
        isEmpty
      />
      <MainBtnGradient
        className={classNames(
          'search-page__map-btn',
          !mapMobActive && 'search-page__map-btn--show',
        )}
        text="View Map"
        icon={<i className="icon icon-map" />}
        onClick={mapMobToggle}
      />
      <div className="search-page__indent" />
      <div className="search-page__content">
        <div
          className="search-page__drag-control"
          role="button"
          onClick={mapMobToggle}
        >
          <span className="font-600 in-black">California</span>
          {' '}
          - Lake Tahoe
        </div>
        <div className="container background-white pb-40 pb-md-60">
          <Row gutter={24}>
            <Col span={24} lg={12}>
              <ResultsEmpty />
            </Col>
            <Col span={24} lg={12}>
              <Map isEmpty />
            </Col>
            <Col span={24}>
              <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
              <div className="main-slider-container">
                <h2 className="text-headline mr-32 mr-lg-148 mb-24">
                  Nearby Destinations
                </h2>
                <Slider className="search-page__slider" slidesCount={12} />
              </div>
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPageEmpty;
