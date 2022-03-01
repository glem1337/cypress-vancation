/* eslint-disable react/prop-types */
import { Divider, Pagination } from 'antd';
import Card from './Card';
import CollapsibleText from './CollapsibleText';
import Fact from './Fact';
import Slider from './Slider';

const Results = () => (
  <div className="search-page__results">
    <div className="search-page__results-info">
      <div className="d-flex d-md-none d-lg-flex justify-content-space-between mt-16 mt-lg-0 mb-16">
        <div className="d-none d-md-block">
          <span className="font-600 in-black">California</span>
          {' '}
          - Lake Tahoe
        </div>
        <span className="ml-auto mr-auto mr-lg-0">41 Campers Found</span>
      </div>
      <div className="search-page__results-img">
        <img src="https://placeimg.com/800/200/nature" alt="" />
      </div>
      <h1 className="text-headline">
        The best campers near Lake Tahoe, California
      </h1>
      <p>
        California to the west, Nevada to the east, and miles of outdoor fun in
        between.
      </p>
      <Divider className="mt-16 mb-16" />
      <div className="main-slider-container">
        <h2 className="text-subheader mr-32 mr-lg-148 mb-16">
          Top 8 Campervan &#38; RV Rentals Cities in California
        </h2>
        <Slider
          className="search-page__results-slider"
          slidesPerView={3}
          slidesCount={9}
        />
      </div>
    </div>
    <Divider className="mt-24 mb-24" />
    <div className="search-page__results-campers">
      <div className="search-page__results-campers__grid">
        <Card isGlamper />
        <Card />
      </div>
      <CollapsibleText className="mt-24 mb-24">
        Wake up to a view of shockingly clear water and snow-capped mountains at
        Lake Tahoe. Here, picturesque rocky outcroppings peek out of deep green
        forests, and stretches of sandy beaches beckon to swimmers. Straddling
        the California/Nevada border, this huge alpine lake offers plenty of
        space for camping and outdoor adventure.
      </CollapsibleText>
      <div className="search-page__results-campers__grid">
        <Card />
        <Card />
      </div>
      <Fact className="mt-24 mb-24">
        Lake Tahoe is the second deepest lake in the United States. At 1,645
        feet in Crystal Bay it could easily submerge the Willis (Sears) Tower.
      </Fact>
      <div className="search-page__results-campers__grid">
        <Card />
        <Card />
      </div>
      <Fact className="mt-24 mb-24">
        The lake&apos;s water is 99.994% pure, earning it the accolade of the
        nation&apos;s best drinking water.
      </Fact>
      <div className="search-page__results-campers__grid">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
    <div className="d-flex flex-column align-items-center mt-24 mt-md-40">
      <Pagination defaultCurrent={1} total={40} />
      <div className="mt-24">1 – 20 of 1,000 results</div>
    </div>
  </div>
);

export default Results;
