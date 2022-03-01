/* eslint-disable react/prop-types */
import { Divider } from 'antd';
import Fact from './Fact';
import Slider from './Slider';

const ResultsEmpty = () => (
  <div className="search-page__results">
    <div className="search-page__results-info">
      <div className="d-flex d-md-none d-lg-flex justify-content-space-between mt-16 mt-lg-0 mb-16">
        <div className="d-none d-md-block">
          <span className="font-600 in-black">California</span>
          {' '}
          - Lake Tahoe
        </div>
        <span className="ml-auto mr-auto mr-lg-0">0 Campers Found</span>
      </div>
      <div className="search-page__results-empty">
        <div className="text-headline mb-16">
          There are no campervans or RVs found.
        </div>
        <div>
          We&apos;re working on bringing new campervan rentals to Lake Tahoe
          soon.
        </div>
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
      <div className="search-page__results-text mt-24 mb-24">
        <p>
          Wake up to a view of shockingly clear water and snow-capped mountains
          at Lake Tahoe. Here, picturesque rocky outcroppings peek out of deep
          green forests, and stretches of sandy beaches beckon to swimmers.
          Straddling the California/Nevada border, this huge alpine lake offers
          plenty of space for camping and outdoor adventure.
        </p>
        <p>
          Here, picturesque rocky outcroppings peek out of deep green forests,
          and stretches of sandy beaches beckon to swimmers. Straddling the
          California/Nevada border, this huge alpine lake offers plenty of space
          for camping and outdoor adventure.
        </p>
      </div>
      <Divider className="mt-24 mb-24" />
      <h2 className="text-headline mb-24">Fun Facts</h2>
      <Fact className="mb-24">
        Lake Tahoe is the second deepest lake in the United States. At 1,645
        feet in Crystal Bay it could easily submerge the Willis (Sears) Tower.
      </Fact>
      <Fact className="mb-24">
        The lake&apos;s water is 99.994% pure, earning it the accolade of the
        nation&apos;s best drinking water.
      </Fact>
      <Fact className="mb-24">
        Lake Tahoe is the second deepest lake in the United States. At 1,645
        feet in Crystal Bay it could easily submerge the Willis (Sears) Tower.
        <ul>
          <li>List 1</li>
          <li>List 2</li>
          <li>List 3</li>
        </ul>
      </Fact>
      <Fact>
        <blockquote>
          The lake&apos;s water is 99.994% pure, earning it the accolade of the
          nation&apos;s best drinking water.
        </blockquote>
      </Fact>
    </div>
  </div>
);

export default ResultsEmpty;
