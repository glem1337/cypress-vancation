import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Row, Col } from 'antd';

import useDestinationPageStats from 'utils/hooks/useDestinationPageStats';

import ExploreCamperRentalsNearby from '../ExploreCamperRentalsNearby';

const ContentContainer = ({
  ResultsSection,
  MapSection,
  NearbyDestinationsSection,
}) => {
  const {
    isSearchResultsPage,
    isDesktopMapVisible,
  } = useDestinationPageStats();

  const contentClassName = isSearchResultsPage
    ? classnames(
      'search-page__content search-page__content--search-results',
      !isDesktopMapVisible && 'search-page__content--map-hidden',
    )
    : 'search-page__content';

  const containerClassName = isSearchResultsPage
    ? 'container-fluid background-white d-lg-flex pb-40 pb-md-60'
    : 'container background-white pb-40 pb-md-60';

  return (
    <div className={contentClassName}>
      <div className={containerClassName}>
        {isSearchResultsPage && (
          <>
            {ResultsSection}
            {MapSection}
          </>
        )}
        {!isSearchResultsPage && (
          <Row gutter={24}>
            <Col span={24} lg={12}>
              {ResultsSection}
            </Col>
            <Col span={24} lg={12}>
              {MapSection}
            </Col>
            <Col span={24}>
              {NearbyDestinationsSection}
            </Col>
          </Row>
        )}
      </div>
      <ExploreCamperRentalsNearby />
    </div>
  );
};

ContentContainer.propTypes = {
  ResultsSection: PropTypes.node,
  MapSection: PropTypes.node,
  NearbyDestinationsSection: PropTypes.node,
};

ContentContainer.defaultProps = {
  ResultsSection: null,
  MapSection: null,
  NearbyDestinationsSection: null,
};

export default ContentContainer;
