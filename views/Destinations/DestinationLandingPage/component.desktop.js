import React from 'react';
import PropTypes from 'prop-types';

import UserFooter from 'views/shared/UserFooter';

import EmptyResult from '../EmptyResults';
import TopLocations from '../TopLocations';
import FanFacts from '../FanFacts';
import InteractiveMap from '../InteractiveMap';
import NearbyDestinations from '../NearbyDestinations';
import Description from '../Description';
import MainPhoto from '../MainPhoto';
import MainInfo from '../MainInfo';
import ContentContainer from '../ContentContainer';
import Campers from '../Campers';
import SearchResultsInfo from '../SearchResultsInfo';

const DestinationsLandingPageDesktop = ({
  onDragEnd,
  onZoomEnd,
  createRef,
}) => (
  <>
    <ContentContainer
      ResultsSection={(
        <div className="search-page__results">
          <div className="search-page__results-info">
            <SearchResultsInfo />
            <EmptyResult />
            <MainPhoto />
            <MainInfo />
            <TopLocations />
          </div>
          <div className="search-page__results-campers">
            <div className="search-page__results-text mt-24 mb-24">
              <Description />
              <FanFacts />
            </div>
            <Campers />
          </div>
        </div>
      )}
      MapSection={(
        <InteractiveMap
          additionalClassnames="search-page__map-extended"
          createMapOnMount
          isVisible
          isDesktop
          onDragEnd={onDragEnd}
          onZoomEnd={onZoomEnd}
          ref={createRef('mapComponentRef')}
        />
      )}
      NearbyDestinationsSection={(
        <NearbyDestinations />
      )}
    />
    <UserFooter />
  </>
);

DestinationsLandingPageDesktop.propTypes = {
  onDragEnd: PropTypes.func.isRequired,
  onZoomEnd: PropTypes.func.isRequired,
  createRef: PropTypes.func.isRequired,
};

export default DestinationsLandingPageDesktop;
