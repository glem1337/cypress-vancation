import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd';
import classnames from 'classnames';

import HeaderUser from 'views/shared/UserHeader';
import UserFooter from 'views/shared/UserFooter';

import SeoInfo from '../SeoInfo';
import SearchSection from '../SearchSection';
import Filters from '../Filters';
import FiltersMobile from '../Filters/MobileView';

import DestinationsLandingPageDesktop from './component.desktop';
import DestinationsLandingPageTablet from './component.tablet';
import DestinationsLandingPageMobile from './component.mobile';

const DestinationsLandingPageComponent = (props) => {
  const { shouldShowSkeleton } = props;

  if (shouldShowSkeleton) {
    return (
      <div className="search-page_skeleton-container">
        <HeaderUser currentUser={null} />
        <div className="ml-20 mb-20 mt-20 d-flex flex-1">
          <Skeleton active />
        </div>
        <UserFooter />
      </div>
    );
  }

  const {
    isMobile,
    isTablet,
    isDesktop,
    currentUser,
    isTabletMapVisible,
    toggleTabletMap,
    createRef,
    onDragEnd,
    onZoomEnd,
    onTouchStart,
  } = props;

  return (
    <>
      <SeoInfo />
      <HeaderUser
        currentUser={currentUser}
        SearchSection={<SearchSection />}
        groupItems
        headerClassNames="main-account-header"
      />
      <Filters />
      <FiltersMobile />
      <div
        className={classnames(
          'search-page__wrap',
          isTabletMapVisible && 'scroll-hidden',
        )}
        id="search-page__wrap"
      >
        {isDesktop && (
          <DestinationsLandingPageDesktop
            {...props}
            onDragEnd={onDragEnd}
            onZoomEnd={onZoomEnd}
          />
        )}
        {isTablet && (
          <DestinationsLandingPageTablet
            {...props}
            toggleTabletMap={toggleTabletMap}
            isTabletMapVisible={isTabletMapVisible}
            createRef={createRef}
            onDragEnd={onDragEnd}
            onZoomEnd={onZoomEnd}
          />
        )}
        {isMobile && (
          <DestinationsLandingPageMobile
            {...props}
            createRef={createRef}
            onDragEnd={onDragEnd}
            onZoomEnd={onZoomEnd}
            onTouchStart={onTouchStart}
          />
        )}
      </div>
    </>
  );
};

DestinationsLandingPageComponent.propTypes = {
  pageData: PropTypes.shape(),
  isMobile: PropTypes.bool.isRequired,
  isTablet: PropTypes.bool.isRequired,
  isDesktop: PropTypes.bool.isRequired,
  isTabletMapVisible: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape(),
  createRef: PropTypes.func.isRequired,
  toggleTabletMap: PropTypes.func.isRequired,
  shouldShowSkeleton: PropTypes.bool.isRequired,
  onScrollHandler: PropTypes.func,
  onDragEnd: PropTypes.func.isRequired,
  onZoomEnd: PropTypes.func.isRequired,
  onTouchStart: PropTypes.func.isRequired,
};

DestinationsLandingPageComponent.defaultProps = {
  pageData: null,
  currentUser: null,
  onScrollHandler: undefined,
};

export default DestinationsLandingPageComponent;
