import React from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

import isPresent from 'utils/isPresent';
import { createCampervanRentalRoute } from 'utils/createRouteHelper';
import useResultsInfo from 'views/Destinations/SearchResultsInfo/hook';
import useDestinationPageStats from 'utils/hooks/useDestinationPageStats';
import GradientButton from 'views/shared/GradientButton';

const EmptyResult = () => {
  const {
    isSearchResultsPage,
    isAnyFilterApplied,
    clearAllFilters,
  } = useDestinationPageStats();

  const {
    areExisted,
    slug,
    state,
    location,
  } = useResultsInfo();

  if (areExisted) {
    return null;
  }

  if (isSearchResultsPage) {
    return (
      <>
        <div className="search-page__results-info pt-0">
          <div className="d-flex d-md-none d-lg-flex justify-content-space-between">
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
              <FormattedMessage id="campervan-rental.campersFound" values={{ count: 0 }} />
            </span>
          </div>
        </div>
        {!isAnyFilterApplied && (
          <div className="search-page__results-empty">
            <div className="text-headline mb-16">
              <FormattedMessage id="search-destination.empty.title" />
            </div>
            <div>
              <FormattedMessage id="search-destination.empty.description" />
            </div>
          </div>
        )}
        {isAnyFilterApplied && (
          <div className="search-page__results-empty">
            <div className="text-headline mb-16">
              <FormattedMessage id="search-destination.empty.filter.title" />
            </div>
            <div>
              <FormattedMessage id="search-destination.empty.filter.description" />
            </div>
            <GradientButton
              size="large"
              text={{ id: 'shared.clearFilters' }}
              className="min-w-140 mt-24"
              onClick={clearAllFilters}
            />
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="d-flex d-md-none d-lg-flex justify-content-space-between mt-16 mt-lg-0 mb-16">
        <div className="d-none d-md-block">
          <Link href={createCampervanRentalRoute({ state: slug })}>
            <a>
              <span className="font-600 in-black">{state}</span>
            </a>
          </Link>
          {isPresent(location) && ` - ${location}`}
        </div>
        <span className="ml-auto mr-auto mr-lg-0">
          <FormattedMessage id="campervan-rental.campersFound" values={{ count: 0 }} />
        </span>
      </div>
      <div className="search-page__results-empty">
        <div className="text-headline mb-16">
          <FormattedMessage id="campervan-rental.empty.title" />
        </div>
        <div>
          <FormattedMessage
            id="campervan-rental.empty.subTitle"
            values={{ location: isPresent(location) ? location : state }}
          />
        </div>
      </div>
    </>
  );
};

export default EmptyResult;
