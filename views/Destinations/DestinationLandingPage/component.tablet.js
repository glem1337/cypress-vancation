import React from 'react';
import PropTypes from 'prop-types';

import EmptyResult from '../EmptyResults';
import TopLocations from '../TopLocations';
import FanFacts from '../FanFacts';
import InteractiveMap from '../InteractiveMap';
import ViewMapButton from '../ViewMapButton';
import NearbyDestinations from '../NearbyDestinations';
import Description from '../Description';
import MainPhoto from '../MainPhoto';
import MainInfo from '../MainInfo';
import ContentContainer from '../ContentContainer';
import Footer from '../Footer';
import Campers from '../Campers';
import SearchResultsInfo from '../SearchResultsInfo';

const DestinationsLandingPageTablet = ({
  isTabletMapVisible,
  toggleTabletMap,
  createRef,
  onDragEnd,
  onZoomEnd,
}) => (
  <>
    <InteractiveMap
      isVisible={isTabletMapVisible}
      toggleTabletMap={toggleTabletMap}
      createMapOnMount
      onDragEnd={onDragEnd}
      onZoomEnd={onZoomEnd}
      ref={createRef('mapComponentRef')}
    />
    <ViewMapButton
      isVisible={!isTabletMapVisible}
      onClick={toggleTabletMap}
    />
    <ContentContainer
      isDesktopMapVisible
      ResultsSection={(
        <div className="search-page__results">
          <div className="search-page__results-info">
            <SearchResultsInfo additionalClassNames="mt-10" />
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
      NearbyDestinationsSection={(
        <NearbyDestinations />
      )}
    />
    <Footer innerRef={createRef('footerComponentRef')} />
  </>
);

DestinationsLandingPageTablet.propTypes = {
  isTabletMapVisible: PropTypes.bool.isRequired,
  toggleTabletMap: PropTypes.func.isRequired,
  createRef: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onZoomEnd: PropTypes.func.isRequired,
};

export default DestinationsLandingPageTablet;
