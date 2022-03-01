import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

import isPresent from 'utils/isPresent';
import { createCampervanRentalRoute } from 'utils/createRouteHelper';
import useDestinationPageStats from 'utils/hooks/useDestinationPageStats';

import useContainer from './hook';

const SearchResultsInfo = ({ additionalClassNames }) => {
  const { isSearchResultsPage } = useDestinationPageStats();

  const {
    areExisted,
    areFetched,
    total,
    location,
    state,
    slug,
  } = useContainer();

  if (!areExisted || !areFetched) {
    return null;
  }

  if (isSearchResultsPage) {
    return (
      <div className={`d-flex d-md-none d-lg-flex justify-content-space-between ${additionalClassNames}`}>
        <div className="d-none d-md-block">
          <span className="font-600 in-black">
            <FormattedMessage
              id="search-destination.campersNear"
            />
            {isPresent(location) && ` ${location}`}
            {isPresent(state) && `, ${state}`}
          </span>
        </div>
        <span className="ml-auto mr-auto mr-lg-0">
          <FormattedMessage id="campervan-rental.campersFound" values={{ count: total }} />
        </span>
      </div>
    );
  }

  return (
    <div className={`d-flex d-md-none d-lg-flex justify-content-space-between mt-16 mt-lg-0 mb-16 ${additionalClassNames}`}>
      <div className="d-none d-md-block">
        <Link href={createCampervanRentalRoute({ state: slug })}>
          <a>
            <span className="font-600 in-black">{state}</span>
          </a>
        </Link>
        {isPresent(location) && ` - ${location}`}
      </div>
      <span className="ml-auto mr-auto mr-lg-0">
        <FormattedMessage id="campervan-rental.campersFound" values={{ count: total }} />
      </span>
    </div>
  );
};

SearchResultsInfo.propTypes = {
  additionalClassNames: PropTypes.string,
};

SearchResultsInfo.defaultProps = {
  additionalClassNames: '',
};

export default SearchResultsInfo;
