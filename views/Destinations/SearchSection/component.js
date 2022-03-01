import React from 'react';
import classnames from 'classnames';

import { CHOOSE_DESTINATION_WIDGET_SIZE } from 'constants/searchDestinations';
import ChooseDestinationWidget from 'views/shared/ChooseDestinationWidget';
import useMobileHeaderInfo from 'utils/hooks/useMobileHeaderInfo';

import useContainer from './hook';

const SearchSection = () => {
  const {
    expandMobileHeader,
    onClickHandler,
  } = useContainer();

  const {
    locationString,
    datesString,
    areDateExisting,
    isLocationExisting,
  } = useMobileHeaderInfo();

  return (
    <div className="choose-destination__search-section">
      <div
        className="search-page__search-section-mobile"
        role="button"
        onClick={expandMobileHeader}
      >
        <div className="search-page__search-control">
          <div className="search-page__search-control-location-wrapper">
            <p
              className={classnames('search-page__search-control-location', {
              'search-page__search-control-location--inactive': !isLocationExisting,
            })}
            >
              {locationString}
            </p>
          </div>
          <div className="search-page__search-control-dates-wrapper">
            <p
              className={classnames('search-page__search-control-dates', {
              'search-page__search-control-location--inactive': !areDateExisting,
            })}
            >
              {datesString}
            </p>
          </div>
          <div className="search-page__search-control-hr" />
          <div className="search-page__search-control-button">
            <button
              className="main-input--right"
              type="button"
              onClick={onClickHandler}
            >
              <i className="icon icon-filter in-gray-500" />
            </button>
          </div>
        </div>
      </div>
      <div className="search-page__search-section-not-mobile">
        <ChooseDestinationWidget
          size={CHOOSE_DESTINATION_WIDGET_SIZE.SMALL}
        />
      </div>
    </div>
  );
};

export default SearchSection;
