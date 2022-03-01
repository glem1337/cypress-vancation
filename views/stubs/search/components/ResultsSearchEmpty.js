/* eslint-disable react/prop-types */
import { Divider, Pagination } from 'antd';

import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';
import Slider from './Slider';
import SliderCards from './SliderCards';
import Card from './Card';

const ResultsSearchEmpty = ({ noFilters, mapVisible }) => (
  <div className="search-page__results">
    <div className="search-page__results-info">
      <div className="d-flex d-md-none d-lg-flex justify-content-space-between">
        <div className="d-none d-md-block">
          <span className="font-600 in-black">
            Campers Near Los Angeles, CA
          </span>
        </div>
        <span className="ml-auto mr-auto mr-lg-0">0 Campers Found</span>
      </div>
    </div>
    <div className="search-page__results-empty">
      {noFilters ? (
        <>
          <div className="text-headline mb-16">Hmmm!</div>
          <div>
            We couldn&apos;t find any listings that match your search criteria.
          </div>
        </>
      ) : (
        <>
          <div className="text-headline mb-16">
            There are no campervans or RVs available.
          </div>
          <div>Try another search criteria or clear your filters.</div>
          <MainBtnGradient
            size="large"
            text="Clear filters"
            className="min-w-140 mt-24"
          />
        </>
      )}
    </div>
    <div className="search-page__results-campers">
      {noFilters ? (
        <>
          <div className="main-slider-container">
            <h2 className="text-headline mr-32 mr-lg-148 mb-24">
              Other Popular Destinations
            </h2>
            <Slider
              className="search-page__slider"
              slidesPerView={mapVisible ? 2 : 4}
              slidesCount={8}
            />
          </div>
          <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
          <div className="main-slider-container">
            <h2 className="text-headline mr-32 mr-lg-148 mb-24">
              Already booked campers
            </h2>
            <SliderCards
              className="search-page__slider"
              slidesPerView={mapVisible ? 2 : 4}
              slidesCount={12}
              mapVisible={mapVisible}
            />
          </div>
        </>
      ) : (
        <>
          <h2 className="text-headline mb-24">Already booked campers</h2>
          <div className="search-page__results-campers__grid">
            <Card mapVisible={mapVisible} isGlamper isBooked />
            <Card mapVisible={mapVisible} isBooked />
            <Card mapVisible={mapVisible} isHighDemand isBooked />
            <Card mapVisible={mapVisible} isBooked />
            <Card mapVisible={mapVisible} isBooked />
            <Card mapVisible={mapVisible} isHighDemand isBooked />
            <Card mapVisible={mapVisible} isBooked />
            <Card mapVisible={mapVisible} isBooked />
          </div>
        </>
      )}
    </div>
    {!noFilters && (
      <>
        <div className="d-flex flex-column flex-md-row align-items-center mt-24 mt-md-40">
          <Pagination defaultCurrent={1} total={40} />
          <div className="mt-24 mt-md-0 ml-md-auto">
            1 – 20 of 1,000 results
          </div>
        </div>
      </>
    )}
  </div>
);

export default ResultsSearchEmpty;
