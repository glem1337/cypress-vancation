import React from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import classnames from 'classnames';

import ROUTES from 'constants/routes';
import useMobileHeaderInfo from 'utils/hooks/useMobileHeaderInfo';
import useMobileFilterVisibility from 'utils/hooks/useMobileFilterVisibility';

import useContainer from './hook';

const MobileHeaderExpanded = () => {
  const { toggleMobileFiltersVisibility } = useMobileFilterVisibility();

  const {
    collapseMobileHeader,
    query,
  } = useContainer();

  const {
    locationString,
    datesString,
    areDateExisting,
    isLocationExisting,
  } = useMobileHeaderInfo();

  return (
    <header className="main-home-header main-home-header--expanded">
      <div className="d-flex flex-1 align-items-center w-100">
        <button
          type="button"
          onClick={collapseMobileHeader}
        >
          <i className="icon icon-cross search-destinations__close-icon" />
        </button>
        <div className="d-flex flex-1 justify-content-center align-items-center main-home-header-edit-search">
          <FormattedMessage id="shared.editYourSearch" />
        </div>
        <button
          className="main-input--right"
          type="button"
          onClick={toggleMobileFiltersVisibility}
        >
          <i className="icon icon-filter in-gray-500" />
        </button>
      </div>
      <div className="main-home-header-search-items mb-20">
        <Link
          href={{
            pathname: ROUTES.SEARCH_DESTINATIONS.DESTINATIONS.PATH,
            query,
          }}
        >
          <div className={classnames('main-home-header-search-item', {
            'main-home-header-search-item--inactive': !isLocationExisting,
          })}
          >
            <i className="icon icon-search in-gray-500 font-20 mr-10" />
            {locationString}
          </div>
        </Link>
        <Link
          href={{
            pathname: ROUTES.SEARCH_DESTINATIONS.DATES.PATH,
            query,
          }}
        >
          <div className={classnames('main-home-header-search-item', {
            'main-home-header-search-item--inactive': !areDateExisting,
          })}
          >
            <i className="icon icon-calendar in-gray-500 font-20 mr-10" />
            {datesString}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default MobileHeaderExpanded;
