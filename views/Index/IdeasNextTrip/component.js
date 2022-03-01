import PropTypes from 'prop-types';
import { Button, Tabs } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Classnames from 'classnames';

import { NEXT_TRIP_DEFAULT_SHOW_ITEMS } from 'constants/home';
import Loader from 'views/shared/Loader';
import TabItem from './TabItem';

const IdeasNextTrip = ({
  epicenterLocationsItems,
  nearestDestinationsItems,
  homeStatesItems,
  isLoadingEpicenterLocations,
  isLoadingNearestDestinations,
  isLoadingHomeStates,
  showAllState,
  handlerShowAllStates,
  containerRef,
}) => (
  <div className="home-inner-wrap" ref={containerRef}>
    <div className="container">
      <h2 className="home-title-sec mb-16 mb-md-8">
        <FormattedMessage id="homePage.ideasNextTrip.title" />
      </h2>
      <p className="mb-32 mb-md-48 text-title font-400">
        <FormattedMessage id="homePage.ideasNextTrip.subtitle" />
      </p>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane
          key="epicenters"
          disabled={isLoadingEpicenterLocations}
          className="home__campervan-epicenters"
          tab={(
            <>
              {isLoadingEpicenterLocations && <Loader fontSize={24} />}
              <FormattedMessage id="homePage.ideasNextTrip.tab.campervanEpicenters.title" />
            </>
          )}
        >
          {isLoadingEpicenterLocations ? (
            <Loader fontSize={24} />
          ) : (
            <TabItem items={epicenterLocationsItems} />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane
          key="nearest-destinations"
          disabled={isLoadingNearestDestinations}
          className="home__campervan-nearest-destinations"
          tab={(
            <>
              {isLoadingNearestDestinations && <Loader fontSize={24} />}
              <FormattedMessage id="homePage.ideasNextTrip.tab.roadtripDestinations.title" />
            </>
          )}
        >
          {isLoadingNearestDestinations ? (
            <Loader fontSize={24} />
          ) : (
            <TabItem items={nearestDestinationsItems} />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane
          key="state"
          disabled={isLoadingHomeStates}
          tab={(
            <>
              {isLoadingHomeStates && <Loader fontSize={24} />}
              <FormattedMessage id="homePage.ideasNextTrip.tab.campervanRentals.title" />
            </>
          )}
          className={Classnames(
            'home__campervan-state',
            { 'home__campervan-state_hide-items': !showAllState },
          )}
        >
          {isLoadingHomeStates ? (
            <Loader fontSize={24} />
          ) : (
            <>
              <TabItem items={homeStatesItems} />
              <Button size="small" type="secondary" onClick={handlerShowAllStates}>
                <FormattedMessage
                  id={`shared.${showAllState ? 'hideCities' : 'showMoreCities'}`}
                  values={{
                    amount: homeStatesItems.length - NEXT_TRIP_DEFAULT_SHOW_ITEMS,
                  }}
                />
              </Button>
            </>
          )}
        </Tabs.TabPane>
      </Tabs>
    </div>
  </div>
);

IdeasNextTrip.defaultProps = {
  epicenterLocationsItems: null,
  homeStatesItems: null,
  nearestDestinationsItems: null,
  isLoadingEpicenterLocations: undefined,
  isLoadingNearestDestinations: undefined,
  isLoadingHomeStates: undefined,
};

IdeasNextTrip.propTypes = {
  handlerShowAllStates: PropTypes.func.isRequired,
  epicenterLocationsItems: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ),
  homeStatesItems: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ),
  nearestDestinationsItems: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ),
  isLoadingEpicenterLocations: PropTypes.bool,
  isLoadingNearestDestinations: PropTypes.bool,
  isLoadingHomeStates: PropTypes.bool,
  showAllState: PropTypes.bool.isRequired,
  containerRef: PropTypes.shape().isRequired,
};

export default IdeasNextTrip;
