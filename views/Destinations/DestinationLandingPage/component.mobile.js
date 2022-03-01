import React from 'react';
import PropTypes from 'prop-types';

import EmptyResult from '../EmptyResults';
import TopLocations from '../TopLocations';
import FanFacts from '../FanFacts';
import InteractiveMap from '../InteractiveMap';
import ViewMapButton from '../ViewMapButton';
import NearbyDestinations from '../NearbyDestinations';
import Description from '../Description';
import DragControl from '../DragControl';
import MainPhoto from '../MainPhoto';
import MainInfo from '../MainInfo';
import Footer from '../Footer';
import ContentContainer from '../ContentContainer';
import Campers from '../Campers';
import SearchResultsInfo from '../SearchResultsInfo';

const DestinationsLandingPageMobile = ({
  createRef,
  showMobileMap,
  onDragEnd,
  onZoomEnd,
  onTouchStart,
}) => (
  <>
    <InteractiveMap
      isVisible
      isMobile
      ref={createRef('mapComponentRef')}
      onDragEnd={onDragEnd}
      onZoomEnd={onZoomEnd}
      onTouchStart={onTouchStart}
    />
    <ViewMapButton
      isVisible
      onClick={showMobileMap}
      additionalClassnames="d-none"
    />
    <div
      className="search-page__indent"
      id="search-page__indent"
      ref={createRef('intentComponentRef')}
    />
    <div
      className="search-page__content"
    >
      <DragControl />
      <ContentContainer
        isDesktopMapVisible
        ResultsSection={(
          <div className="search-page__results">
            <div
              className="search-page__results-info"
              id="search-page__results-info"
            >
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
    </div>
  </>
);

DestinationsLandingPageMobile.propTypes = {
  createRef: PropTypes.func.isRequired,
  showMobileMap: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onZoomEnd: PropTypes.func.isRequired,
  onTouchStart: PropTypes.func.isRequired,
};

export default DestinationsLandingPageMobile;
