import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Checkbox } from 'antd';
import { FormattedMessage } from 'react-intl';

import CampersSliderMobile from '../CampersSliderMobile';

const InteractiveMapMobile = ({
  mapContainerRef,
  isVisible,
  toggleMobileFiltersVisibility,
  additionalClassnames,
  toggleTabletMap,
  isDesktop,
  isMobile,
  searchAsMoveMapToggled,
}) => {
  const className = isDesktop
    ? classNames(
      'search-page__map',
      additionalClassnames && `${additionalClassnames}`,
    )
    : classNames(
      'search-page__map-mob',
      isVisible && 'search-page__map-mob--show',
      additionalClassnames && `${additionalClassnames}`,
    );

  return (
    <div
      className={className}
      ref={mapContainerRef}
      id="search-page__map-mob"
    >
      {!isDesktop && (
        <Button
          className="search-page__map-mob__close search-page__map-mob__control"
          icon={<i className="icon icon-cross in-gray-500" />}
          type="text"
          size="large"
          onClick={toggleTabletMap}
        />
      )}
      <div className="search-page__map-mob__toggle search-page__map-mob__control">
        <Checkbox
          defaultChecked
          onChange={searchAsMoveMapToggled}
        >
          <FormattedMessage id="campervan-rental.searchAsIMoveTheMap" />
        </Checkbox>
      </div>
      {!isDesktop && (
        <Button
          className="search-page__map-mob__filters search-page__map-mob__control"
          icon={<i className="icon icon-filter in-gray-500" />}
          type="text"
          size="large"
          onClick={toggleMobileFiltersVisibility}
        />
      )}
      {isMobile && <CampersSliderMobile />}
    </div>
  );
};

InteractiveMapMobile.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  toggleMobileFiltersVisibility: PropTypes.func.isRequired,
  additionalClassnames: PropTypes.string,
  mapContainerRef: PropTypes.shape().isRequired,
  toggleTabletMap: PropTypes.func,
  isDesktop: PropTypes.bool,
  isMobile: PropTypes.bool,
  searchAsMoveMapToggled: PropTypes.func.isRequired,
};

InteractiveMapMobile.defaultProps = {
  additionalClassnames: undefined,
  toggleTabletMap: undefined,
  isDesktop: false,
  isMobile: false,
};

export default InteractiveMapMobile;
