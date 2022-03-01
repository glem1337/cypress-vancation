import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withIsVisible } from 'react-is-visible';

import { currentCoordinatesSelector } from 'state/app/selectors';
import {
  fetchEpicenterLocationsAction,
  fetchHomeStatesAction,
  fetchNearbyDestinations,
  setShowAllStatesAction,
} from 'state/concepts/campervan-rental/actions';
import { dataDeleteEntity as dataDeleteEntityAction } from 'state/data/actions';
import {
  epicenterLocationsSelector,
  homeStatesSelector,
  nearestDestinationsSelector,
  showAllStateSelector,
} from 'state/concepts/campervan-rental/selectors';
import { loadingSelector } from 'state/data/selectors';
import {
  fetchHomeStateLandingsEndpoint,
  fetchEpicenterLocationLandingsEndpoint,
  fetchNearbyDestinationsEndpoint,
} from 'state/concepts/campervan-rental/endpoints';
import { createCampervanRentalRoute } from 'utils/createRouteHelper';
import { NEXT_TRIP_DEFAULT_SHOW_ITEMS } from 'constants/home';
import { LANDING_TYPE } from 'constants/campervanRentals';
import IdeasNextTripComponent from './component';

const INTERSECTION_OFFSET = 700;
class IdeasNextTrip extends React.Component {
  constructor(props) {
    super(props);

    this.containerRef = React.createRef();

    this.isAllDataRequested = {
      isLoadingHomeStates: false,
      isLoadingNearestDestinations: false,
      isLoadingEpicenterLocations: false,
    };

    const {
      dataDeleteEntity,
      homeStates,
      epicenterLocations,
    } = props;

    if (epicenterLocations && epicenterLocations.length) {
      dataDeleteEntity({ kind: 'epicenterLocationLanding' });
    }
    if (homeStates && homeStates.length) {
      dataDeleteEntity({ kind: 'homeStateLanding' });
    }
  }

  /**
   * Lifecycle method.
   */
  componentDidMount() {
    this.observer = new IntersectionObserver(this.handleIntersect, {
      rootMargin: `${INTERSECTION_OFFSET}px`,
    });
    this.observer.observe(this.containerRef.current);
  }

  /**
   * Lifecycle method.
   */
  componentWillUnmount() {
    this.observer.unobserve(this.containerRef.current);
  }

  /**
   * Lifecycle method.
   */
  componentDidUpdate(prevProps) {
    const {
      currentLocation,
      isLoadingHomeStates,
      isLoadingNearestDestinations,
      isLoadingEpicenterLocations,
    } = this.props;

    if (currentLocation?.isLocationRequested && !prevProps?.currentLocation?.isLocationRequested) {
      this.fetchData();
    }

    if (!isLoadingHomeStates && prevProps.isLoadingHomeStates) {
      this.isAllDataRequested.isLoadingHomeStates = true;
    }

    if (!isLoadingNearestDestinations && prevProps.isLoadingNearestDestinations) {
      this.isAllDataRequested.isLoadingNearestDestinations = true;
    }

    if (!isLoadingEpicenterLocations && prevProps.isLoadingEpicenterLocations) {
      this.isAllDataRequested.isLoadingEpicenterLocations = true;
    }
  }

  /**
   * Handle intersect.
   */
  handleIntersect = (entries) => {
    const isIntersecting = R.path(['0', 'isIntersecting'], entries);

    const isDataRequested = R.compose(
      R.all(R.equals(true)),
      R.values,
    )(this.isAllDataRequested);

    if (isIntersecting && !isDataRequested) {
      this.fetchData();
    }
  }

  get epicenterLocationsItems() {
    const { epicenterLocations } = this.props;

    if (!Array.isArray(epicenterLocations)) {
      return [];
    }

    return epicenterLocations.map(({
      id,
      stateLandingSlug,
      stateLandingName,
      slug,
      locationName,
    }) => ({
      id,
      title: locationName,
      subtitle: stateLandingName,
      link: createCampervanRentalRoute({
        state: stateLandingSlug,
        location: slug,
      }),
    }));
  }

  get homeStatesItems() {
    const { homeStates } = this.props;

    if (!Array.isArray(homeStates)) {
      return [];
    }

    return homeStates.map(({
      id,
      state,
      slug,
    }) => ({
      id,
      title: state,
      link: createCampervanRentalRoute({
        state: slug,
      }),
    }));
  }

  get nearestDestinationsItems() {
    const { nearestDestinations } = this.props;

    if (!Array.isArray(nearestDestinations)) {
      return [];
    }

    return nearestDestinations.map(({
      id,
      landingType,
      landingName,
      landingSlug,
      stateName,
      stateSlug,
    }) => {
      const prepareItem = {
        id,
        title: landingName,
      };

      if (landingType === LANDING_TYPE.LOCATION_LANDING) {
        prepareItem.subtitle = stateName;

        prepareItem.link = createCampervanRentalRoute({
          state: stateSlug,
          location: landingSlug,
        });
      }

      if (landingType === LANDING_TYPE.STATE_LANDING) {
        prepareItem.link = createCampervanRentalRoute({
          state: landingSlug,
        });
      }

      return prepareItem;
    });
  }

  handlerShowAllStates = () => {
    const { setShowAllStates, showAllState } = this.props;

    setShowAllStates(!showAllState);
  }

  fetchData = () => {
    const {
      fetchEpicenterLocations,
      fetchNearestDestinations,
      fetchHomeStates,
      currentLocation,
    } = this.props;

    fetchEpicenterLocations();
    fetchHomeStates();
    fetchNearestDestinations({
      longitude: currentLocation?.longitude,
      latitude: currentLocation?.latitude,
      count: NEXT_TRIP_DEFAULT_SHOW_ITEMS,
    });
  }

  render = () => (
    <IdeasNextTripComponent
      {...this.props}
      containerRef={this.containerRef}
      epicenterLocationsItems={this.epicenterLocationsItems}
      homeStatesItems={this.homeStatesItems}
      nearestDestinationsItems={this.nearestDestinationsItems}
      handlerShowAllStates={this.handlerShowAllStates}
    />
  );
}

IdeasNextTrip.defaultProps = {
  epicenterLocations: null,
  homeStates: null,
  nearestDestinations: null,
  isLoadingHomeStates: undefined,
  isLoadingNearestDestinations: undefined,
  isLoadingEpicenterLocations: undefined,
  currentLocation: null,
};

IdeasNextTrip.propTypes = {
  dataDeleteEntity: PropTypes.func.isRequired,
  fetchEpicenterLocations: PropTypes.func.isRequired,
  fetchHomeStates: PropTypes.func.isRequired,
  fetchNearestDestinations: PropTypes.func.isRequired,
  setShowAllStates: PropTypes.func.isRequired,
  epicenterLocations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      locationName: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      stateLandingName: PropTypes.string.isRequired,
      stateLandingSlug: PropTypes.string.isRequired,
    }).isRequired,
  ),
  homeStates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
    }).isRequired,
  ),
  nearestDestinations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      landingType: PropTypes.string.isRequired,
      landingName: PropTypes.string.isRequired,
      landingSlug: PropTypes.string.isRequired,
      stateName: PropTypes.string,
      stateSlug: PropTypes.string,
    }).isRequired,
  ),
  currentLocation: PropTypes.shape(),
  showAllState: PropTypes.bool.isRequired,
  isLoadingEpicenterLocations: PropTypes.bool,
  isLoadingHomeStates: PropTypes.bool,
  isLoadingNearestDestinations: PropTypes.bool,
  isVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currentLocation: currentCoordinatesSelector(state),
  showAllState: showAllStateSelector(state),
  epicenterLocations: epicenterLocationsSelector(state),
  homeStates: homeStatesSelector(state),
  nearestDestinations: nearestDestinationsSelector(state),
  isLoadingHomeStates: loadingSelector(
    state,
    fetchHomeStateLandingsEndpoint.endpoint,
  ),
  isLoadingNearestDestinations: loadingSelector(
    state,
    fetchNearbyDestinationsEndpoint.endpoint,
  ),
  isLoadingEpicenterLocations: loadingSelector(
    state,
    fetchEpicenterLocationLandingsEndpoint.endpoint,
  ),
});

const mapDispatchToProps = {
  dataDeleteEntity: dataDeleteEntityAction,
  fetchEpicenterLocations: fetchEpicenterLocationsAction,
  fetchHomeStates: fetchHomeStatesAction,
  fetchNearestDestinations: fetchNearbyDestinations,
  setShowAllStates: setShowAllStatesAction,
};

export { IdeasNextTrip as IdeasNextTripContainer };
export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withIsVisible,
)(IdeasNextTrip);
