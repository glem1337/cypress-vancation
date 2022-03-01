/* eslint-disable react/prop-types */
import { Pagination } from 'antd';
import Card from './Card';

const ResultsSearch = ({ mapVisible }) => (
  <div className="search-page__results">
    <div className="search-page__results-info">
      <div className="d-flex d-md-none d-lg-flex justify-content-space-between">
        <div className="d-none d-md-block">
          <span className="font-600 in-black">
            Campers Near Los Angeles, CA
          </span>
        </div>
        <span className="ml-auto mr-auto mr-lg-0">41 Campers Found</span>
      </div>
    </div>
    <div className="search-page__results-campers">
      <div className="search-page__results-campers__grid">
        <Card mapVisible={mapVisible} isGlamper />
        <Card mapVisible={mapVisible} />
        <Card mapVisible={mapVisible} isHighDemand />
        <Card mapVisible={mapVisible} />
        <Card mapVisible={mapVisible} />
        <Card mapVisible={mapVisible} isHighDemand />
        <Card mapVisible={mapVisible} />
        <Card mapVisible={mapVisible} />
      </div>
    </div>
    <div className="d-flex flex-column align-items-center mt-24 mt-md-40">
      <Pagination defaultCurrent={1} total={40} />
      <div className="mt-24">1 – 20 of 1,000 results</div>
    </div>
  </div>
);

export default ResultsSearch;
