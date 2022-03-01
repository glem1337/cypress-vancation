import React from 'react';

import MobileControls from './MobileControls';
import ToggleMap from './ToggleMap';
import GlampersOnly from './GlampersOnly';
import ClearFilters from './ClearFilters';
import Guests from './Guests';
import Price from './Price';
import Vehicle from './Vehicle';
import Delivery from './Delivery';
import MoreFilters from './MoreFilters';

import useOpenedState from './hooks/useOpenedState';
import useContainer from './hook';

const Filters = () => {
  useContainer();

  const {
    openedFilterName,
    toggleOpenedState,
  } = useOpenedState();

  return (
    <div className="search-page__filters-wrap">
      <div className="container-fluid">
        <div className="search-page__filters">
          <MobileControls />
          <div className="d-none d-lg-flex h-100 flex-1">
            <div className="d-flex align-items-center flex-1">
              <Guests
                openedFilterName={openedFilterName}
                toggleOpenedState={toggleOpenedState}
              />
              <Price
                openedFilterName={openedFilterName}
                toggleOpenedState={toggleOpenedState}
              />
              <Vehicle
                openedFilterName={openedFilterName}
                toggleOpenedState={toggleOpenedState}
              />
              <Delivery
                openedFilterName={openedFilterName}
                toggleOpenedState={toggleOpenedState}
              />
              <MoreFilters
                openedFilterName={openedFilterName}
                toggleOpenedState={toggleOpenedState}
              />
              <GlampersOnly />
              <ClearFilters
                toggleOpenedState={toggleOpenedState}
              />
              <ToggleMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
