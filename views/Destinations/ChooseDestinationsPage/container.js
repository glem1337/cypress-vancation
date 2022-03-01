import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { withRouter } from 'next/router';
import debounce from 'lodash/debounce';

import ROUTES from 'constants/routes';
import isPresent from 'utils/isPresent';
import { SEARCH_DESTINATIONS_BY_QUERY_DEBOUNCE, MAPBOX_FEATURE_TYPE, SEARCH_RESULTS_RADIUS } from 'constants/searchDestinations';
import { currentCoordinatesSelector, currentLocationSelector } from 'state/app/selectors';
import {
  searchDestinationsByQuery as searchDestinationsByQueryAction,
  searchDestinationsByCoordinates as searchDestinationsByCoordinatesAction,
  setSearchDestinationLocationIntent as setSearchDestinationLocationIntentAction,
  searchDestination as searchDestinationAction,
  setDestinationsMapBoxIds as setDestinationsMapBoxIdsAction,
} from 'state/concepts/search-destinations/actions';
import {
  destinationsByCoordsSelector,
  destinationsByQuerySelector,
  destinationsFromMapBoxSelector,
  searchDestinationParamsSelector,
} from 'state/concepts/search-destinations/selectors';
import {
  searchDestinationsByQueryEndpoint,
  searchDestinationsByCoordinatesEndpoint,
} from 'state/concepts/search-destinations/endpoints';
import { loadingSelector } from 'state/data/selectors';
import isMobileView from 'utils/breakpoints/isMobileView';

import SearchDestinationsComponent from './component';

class SearchDestinations extends React.Component {
  static propTypes = {
    searchDestinationsByQuery: PropTypes.func.isRequired,
    searchDestinationsByCoordinates: PropTypes.func.isRequired,
    currentCoordinates: PropTypes.shape().isRequired,
    destinationsByCoords: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    destinationsByQuery: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    destinationsFromMapBox: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    isFetchingByCoords: PropTypes.bool,
    isFetchingByQuery: PropTypes.bool,
    setSearchDestinationLocationIntent: PropTypes.func.isRequired,
    searchDestination: PropTypes.func.isRequired,
    searchDestinationParams: PropTypes.shape().isRequired,
    intl: PropTypes.shape().isRequired,
    setDestinationsMapBoxIds: PropTypes.func.isRequired,
    focusOnMount: PropTypes.bool,
    destinationsInputRef: PropTypes.shape(),
    router: PropTypes.shape().isRequired,
    shouldGoBack: PropTypes.string,
    currentLocation: PropTypes.shape(),
  }

  static defaultProps = {
    isFetchingByCoords: false,
    isFetchingByQuery: false,
    focusOnMount: false,
    destinationsInputRef: undefined,
    shouldGoBack: undefined,
    currentLocation: null,
  }

  /**
   * Lifecycle method.
   */
  static getInitialProps = async (ctx) => ctx.query;

  /**
   * Lifecycle method.
   */
  constructor(props) {
    super(props);

    if (!isPresent(props.destinationsByCoords)) {
      props.searchDestinationsByCoordinates({
        latitude: props.currentCoordinates.latitude,
        longitude: props.currentCoordinates.longitude,
      });
    }

    this.onDestinationsSearchDebounced = debounce(
      this.onDestinationsSearch,
      SEARCH_DESTINATIONS_BY_QUERY_DEBOUNCE,
    );
  }

  /**
   * Lifecycle method.
   */
  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener('resize', this.resizeHandler);
  }

  /**
   * Lifecycle method.
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  /**
   * Resize handler.
   */
  resizeHandler = () => {
    const { router } = this.props;

    const isMobileViewDetected = isMobileView();

    if (!isMobileViewDetected) {
      router.replace(ROUTES.INDEX.PATH);
    }
  }

  /**
   * On close.
   */
  onClose = () => {
    const { router } = this.props;

    router.back();
  }

  /**
   * On destination search.
   */
  onDestinationsSearch = (value) => {
    const { searchDestinationsByQuery } = this.props;

    if (!isPresent(value)) {
      return false;
    }

    searchDestinationsByQuery(value);

    return true;
  }

  /**
   * On destination select.
   */
  onDestinationSelect = (destination) => () => {
    const {
      setSearchDestinationLocationIntent,
      router,
      shouldGoBack,
      searchDestination,
    } = this.props;

    if (destination.id === 'shared.explorePopularDestinations') {
      router.push(ROUTES.CAMPERVAN_RENTALS.PATH);
      return null;
    }

    setSearchDestinationLocationIntent(destination);

    if (isPresent(shouldGoBack)) {
      searchDestination();
    } else {
      router.push(ROUTES.SEARCH_DESTINATIONS.DATES.PATH);
    }

    return destination;
  }

  /**
   * On destination location.
   */
  onDestinationsClear = () => {
    const { setSearchDestinationLocationIntent, setDestinationsMapBoxIds } = this.props;

    setDestinationsMapBoxIds([]);
    setSearchDestinationLocationIntent(null);
  }

  /**
   * Getter - destinations.
   */
  get destinations() {
    const {
      destinationsByCoords,
      destinationsByQuery,
      destinationsFromMapBox,
      isFetchingByCoords,
      isFetchingByQuery,
      intl,
      currentLocation,
    } = this.props;

    if (isFetchingByCoords || isFetchingByQuery) {
      return [{ id: 'loader', type: 'loader' }];
    }

    if (isPresent(destinationsFromMapBox)) {
      return [
        ...destinationsByQuery,
        ...destinationsFromMapBox,
      ];
    }

    return [
      ...isPresent(currentLocation)
        ? [{
          id: 'shared.exploreCampervansNearYour',
          type: MAPBOX_FEATURE_TYPE,
          placeName: intl.formatMessage({ id: 'shared.exploreCampervansNearYour' }),
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          placeId: currentLocation.placeId,
          searchRadius: SEARCH_RESULTS_RADIUS,
        }]
        : [],
      {
        id: 'shared.explorePopularDestinations',
        type: 'shared.explorePopularDestinations',
      },
      ...destinationsByCoords,
    ];
  }

  /**
   * Getter - destination name.
   */
  get destinationName() {
    const { searchDestinationParams } = this.props;

    if (!searchDestinationParams?.locationIntent) {
      return null;
    }

    return searchDestinationParams?.locationIntent?.landingName
      || searchDestinationParams?.locationIntent?.placeName;
  }

  render() {
    return (
      <SearchDestinationsComponent
        {...this.props}
        onClose={this.onClose}
        onDestinationsSearch={this.onDestinationsSearchDebounced}
        onDestinationSelect={this.onDestinationSelect}
        onDestinationsClear={this.onDestinationsClear}
        destinations={this.destinations}
        destinationName={this.destinationName}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  currentLocation: currentLocationSelector(state),
  currentCoordinates: currentCoordinatesSelector(state),
  destinationsByCoords: destinationsByCoordsSelector(state),
  destinationsByQuery: destinationsByQuerySelector(state),
  destinationsFromMapBox: destinationsFromMapBoxSelector(state),
  isFetchingByCoords: loadingSelector(state, searchDestinationsByCoordinatesEndpoint.endpoint),
  isFetchingByQuery: loadingSelector(state, searchDestinationsByQueryEndpoint.endpoint),
  searchDestinationParams: searchDestinationParamsSelector(state),
});

const mapDispatchToProps = {
  searchDestinationsByQuery: searchDestinationsByQueryAction,
  searchDestinationsByCoordinates: searchDestinationsByCoordinatesAction,
  setSearchDestinationLocationIntent: setSearchDestinationLocationIntentAction,
  setDestinationsMapBoxIds: setDestinationsMapBoxIdsAction,
  searchDestination: searchDestinationAction,
};

export { SearchDestinations as SearchDestinationsContainer };
export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
  withRouter,
)(SearchDestinations);
