import { useState } from 'react';
import classNames from 'classnames';
import { Divider } from 'antd';

import HeaderSearch from './components/HeaderSearch';
import Filters from './components/Filters';
import FiltersMob from './components/FiltersMob';
import { Footer } from '../layout/Footer';
import ResultsSearchEmpty from './components/ResultsSearchEmpty';
import Map from './components/Map';
import MapMob from './components/MapMob';
import MainBtnGradient from '../shared/buttons/MainBtnGradient';

const SearchResultsEmptyNoFilters = () => {
  const [filtersMobVisible, setFiltersMobVisible] = useState(false);
  const filtersMobToggle = () => setFiltersMobVisible((prev) => !prev);

  const [mapVisible, setMapVisible] = useState(true);
  const mapToggle = () => setMapVisible((prev) => !prev);

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
      <HeaderSearch filtersMobToggle={filtersMobToggle} />
      <Filters filtersMobToggle={filtersMobToggle} mapToggle={mapToggle} />
      <FiltersMob
        visible={filtersMobVisible}
        filtersMobToggle={filtersMobToggle}
      />
      <MapMob
        active={mapMobActive}
        mapMobToggle={mapMobToggle}
        filtersMobToggle={filtersMobToggle}
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
      <div
        className={classNames(
          'search-page__content search-page__content--search-results',
          !mapVisible && 'search-page__content--map-hidden',
        )}
      >
        <div
          className="search-page__drag-control"
          role="button"
          onClick={mapMobToggle}
        >
          <span className="font-600 in-black">California</span>
          {' '}
          - Lake Tahoe
        </div>
        <div className="container-fluid background-white d-lg-flex">
          <ResultsSearchEmpty noFilters mapVisible={mapVisible} />
          {mapVisible && <Map />}
        </div>
        <div className="container-fluid background-white pt-24 pt-md-40">
          <Divider className="mt-0 mb-24 mb-md-40" />
          <h2 className="text-headline mb-24 mb-md-40">
            Explore camper rentals nearby
          </h2>
          <ul className="search-page__column-list">
            <li>
              <a href="#">Kasivnuc</a>
            </li>
            <li>
              <a href="#">Bovfekir</a>
            </li>
            <li>
              <a href="#">Pirosvuf</a>
            </li>
            <li>
              <a href="#">Genowum</a>
            </li>
            <li>
              <a href="#">Laitad</a>
            </li>
            <li>
              <a href="#">Nakobat</a>
            </li>
            <li>
              <a href="#">Bilarejen</a>
            </li>
            <li>
              <a href="#">Ruladufoh</a>
            </li>
            <li>
              <a href="#">Godmucal</a>
            </li>
            <li>
              <a href="#">Natnapup</a>
            </li>
            <li>
              <a href="#">Zorufiva</a>
            </li>
            <li>
              <a href="#">Kuhosim</a>
            </li>
          </ul>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SearchResultsEmptyNoFilters;
