import React from 'react';
import Link from 'next/link';

import { createCampervanRentalRoute } from 'utils/createRouteHelper';
import isPresent from 'utils/isPresent';
import useResultsInfo from 'views/Destinations/SearchResultsInfo/hook';

const DragControl = () => {
  const {
    slug,
    state,
    location,
  } = useResultsInfo();

  if (!state) {
    return (
      <div
        className="search-page__drag-control"
        role="button"
      >
        <span className="font-600 in-black">
          {location}
        </span>
      </div>
    );
  }

  const Wrapper = isPresent(slug)
    ? Link
    : React.Fragment;

  const wrapperProps = isPresent(slug)
    ? { href: createCampervanRentalRoute({ state: slug }) }
    : {};

  return (
    <div
      className="search-page__drag-control"
      role="button"
    >
      <Wrapper {...wrapperProps}>
        <a>
          <span className="font-600 in-black">
            {state}
          </span>
        </a>
      </Wrapper>
      {isPresent(location) && ` -  ${location}`}
    </div>
  );
};

export default DragControl;
