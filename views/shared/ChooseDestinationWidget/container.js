import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import * as R from 'ramda';
import debounce from 'lodash/debounce';
import moment from 'moment';
import { withRouter } from 'next/router';

import ROUTES from 'constants/routes';
import { BREAK_POINTS } from 'constants/breakpoints';
import { SEARCH_DESTINATIONS_BY_QUERY_DEBOUNCE, MAPBOX_FEATURE_TYPE, SEARCH_RESULTS_RADIUS } from 'constants/searchDestinations';
import { currentCoordinatesSelector, currentLocationSelector } from 'state/app/selectors';
import {
  searchDestinationsByQuery as searchDestinationsByQueryAction,
  searchDestinationsByCoordinates as searchDestinationsByCoordinatesAction,
  setSearchDestinationDates as setSearchDestinationDatesAction,
  setDestinationsMapBoxIds as setDestinationsMapBoxIdsAction,
  setSearchDestinationLocationIntent as setSearchDestinationLocationIntentAction,
  searchDestination as searchDestinationAction,
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
import isPresent from 'utils/isPresent';
import { loadingSelector } from 'state/data/selectors';
import isMobileView from 'utils/breakpoints/isMobileView';
import sleep from 'utils/sleep';
import withGeolocationRequest from 'utils/hocs/withGeolocationRequest';

import ChooseDestinationWidgetComponent from './component';

class ChooseDestinationWidget extends React.Component {
  static propTypes = {
    searchDestinationsByQuery: PropTypes.func.isRequired,
    searchDestinationsByCoordinates: PropTypes.func.isRequired,
    currentCoordinates: PropTypes.shape().isRequired,
    destinationsByCoords: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    destinationsByQuery: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    destinationsFromMapBox: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    isFetchingByCoords: PropTypes.bool,
    isFetchingByQuery: PropTypes.bool,
    setSearchDestinationDates: PropTypes.func.isRequired,
    searchDestinationParams: PropTypes.shape().isRequired,
    intl: PropTypes.shape().isRequired,
    setDestinationsMapBoxIds: PropTypes.func.isRequired,
    focusOnMount: PropTypes.bool,
    router: PropTypes.shape().isRequired,
    setSearchDestinationLocationIntent: PropTypes.func.isRequired,
    searchDestination: PropTypes.func.isRequired,
    currentLocation: PropTypes.shape(),
  }

  static defaultProps = {
    isFetchingByCoords: false,
    isFetchingByQuery: false,
    focusOnMount: false,
    currentLocation: null,
  }

  /**
   * Lifecycle method.
   */
  constructor(props) {
    super(props);

    this.chooseDestinationRef = React.createRef();
    this.chooseRangeRef = React.createRef();

    this.onDestinationsSearchDebounced = debounce(
      this.onDestinationsSearch,
      SEARCH_DESTINATIONS_BY_QUERY_DEBOUNCE,
    );

    props.searchDestinationsByCoordinates({
      latitude: props.currentCoordinates.latitude,
      longitude: props.currentCoordinates.longitude,
    });

    this.state = {
      isRangePickerVisible: false,
      isPairMonthVisible: true,
      isMobile: false,
    };

    this.destinationInputValue = null;
  }

  /**
   * Lifecycle method.
   */
  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
    document.addEventListener('mousedown', this.handleClickOutside);
    this.setState({ isMobile: isMobileView() });
    this.focusDestinationInputOnMount();
  }

  /**
   * Lifecycle method.
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Lifecycle method.
   */
  componentDidUpdate(prevProps) {
    const { currentCoordinates, searchDestinationsByCoordinates } = this.props;

    if (
      currentCoordinates?.isLocationRequested
      && !prevProps?.currentCoordinates?.isLocationRequested
    ) {
      searchDestinationsByCoordinates({
        latitude: currentCoordinates.latitude,
        longitude: currentCoordinates.longitude,
      });
    }
  }

  /**
   * Focus destination input on mount.
   */
  focusDestinationInputOnMount = () => {
    const { isMobile } = this.state;

    const { focusOnMount, searchDestinationParams } = this.props;

    if (!focusOnMount || isPresent(searchDestinationParams?.locationIntent) || isMobile) {
      return false;
    }

    this.chooseDestinationRef.current.focus();

    return true;
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
   * Getter - list height.
   */
  get listHeight() {
    const {
      destinationsByCoords,
      destinationsByQuery,
      destinationsFromMapBox,
    } = this.props;

    const ITEM_HEIGHT = 66;
    const FIRST_PORTION = ITEM_HEIGHT * 2;

    if (isPresent(destinationsFromMapBox)) {
      return (destinationsFromMapBox.length + destinationsByQuery.length) * ITEM_HEIGHT;
    }

    return destinationsByCoords.length * ITEM_HEIGHT + FIRST_PORTION;
  }

  /**
   * Getter - range input value.
   */
  get rangeInputValue() {
    const { searchDestinationParams } = this.props;

    if (!isPresent(searchDestinationParams.dateRange)) {
      return undefined;
    }

    const first = moment(R.head(searchDestinationParams.dateRange)).format('MMM D');
    const last = moment(R.last(searchDestinationParams.dateRange)).format('MMM D');

    return `${first} - ${last}`;
  }

  /**
   * Getter - destination value.
   */
  get destinationValue() {
    const { searchDestinationParams } = this.props;

    if (searchDestinationParams?.locationIntent?.landingName) {
      return searchDestinationParams.locationIntent.landingName;
    }

    if (searchDestinationParams?.locationIntent?.placeName) {
      return searchDestinationParams.locationIntent.placeName;
    }

    if (this.destinationInputValue) {
      return this.destinationInputValue;
    }

    return null;
  }

  /**
   * Resize handler.
   */
  resizeHandler = () => {
    const { isPairMonthVisible, isRangePickerVisible, isMobile } = this.state;

    const isMobileViewDetected = isMobileView();

    if (window.innerWidth > BREAK_POINTS.WEB && isPairMonthVisible === false) {
      this.setState({ isPairMonthVisible: true });
    }

    if (window.innerWidth <= BREAK_POINTS.WEB && isPairMonthVisible === true) {
      this.setState({ isPairMonthVisible: false });
    }

    if (window.innerWidth <= BREAK_POINTS.TABLET && isRangePickerVisible === true) {
      this.setState({ isRangePickerVisible: false });
    }

    if (isMobileViewDetected && !isMobile) {
      this.setState({ isMobile: true });
    }

    if (!isMobileViewDetected && isMobile) {
      this.setState({ isMobile: false });
    }
  }

  /**
   * Handle click outside.
   */
  handleClickOutside = (event) => {
    const calendarWrapper = document.getElementById('choose-destination__calendar-wrapper');

    if (!calendarWrapper) {
      return false;
    }

    if (event?.target?.id === 'choose-destination__calendar-input') {
      return false;
    }

    if (!calendarWrapper.contains(event?.target)) {
      this.setState({ isRangePickerVisible: false });

      this.chooseRangeRef.current.blur();
    }

    return true;
  }

  /**
   * On destination change.
   */
  onDestinationsChange = (destination) => async () => {
    const {
      router,
      searchDestinationParams,
      setSearchDestinationLocationIntent,
    } = this.props;

    // Redirect to popular destination.
    if (destination.id === 'shared.explorePopularDestinations') {
      router.push(ROUTES.CAMPERVAN_RENTALS.PATH);
      return null;
    }

    // Set location intent.
    setSearchDestinationLocationIntent(destination);

    await sleep();

    this.chooseDestinationRef.current.blur();

    if (R.isNil(searchDestinationParams.dateRange)) {
      this.chooseRangeRef.current.focus();
    }

    return destination;
  }

  /**
   * On destination search.
   */
  onDestinationsSearch = (value) => {
    const { searchDestinationsByQuery } = this.props;

    this.destinationInputValue = value;

    searchDestinationsByQuery(value);
  }

  /**
   * On date range changed.
   */
  onDateRangeChanged = async (range) => {
    const { setSearchDestinationDates } = this.props;

    const now = moment().startOf('month');

    const editedRange = [
      moment(range[0]) < now ? now.clone().toDate() : range[0],
      moment(range[1]) < now ? now.clone().toDate() : range[1],
    ];

    if (moment(range[0]).format('YYYY-MM-DD') === moment(range[1]).format('YYYY-MM-DD')) {
      setSearchDestinationDates(null);

      return false;
    }

    setSearchDestinationDates(editedRange);

    await sleep();

    this.setState({ isRangePickerVisible: false });

    return true;
  }

  /**
   * Clear date range.
   */
  clearDateRange = () => {
    const { setSearchDestinationDates } = this.props;

    setSearchDestinationDates(null);
  }

  /**
   * Clear destinations.
   */
  clearDestinations = () => {
    const {
      setDestinationsMapBoxIds,
      setSearchDestinationLocationIntent,
    } = this.props;

    setDestinationsMapBoxIds([]);
    setSearchDestinationLocationIntent(null);
    this.destinationInputValue = null;
  }

  /**
   * On destination focus handler.
   */
  onDestinationsFocus = () => {
    this.setState({ isRangePickerVisible: false });
    this.chooseRangeRef.current.blur();
  }

  /**
   * On date range focused.
   */
  onRangeFocus = () => {
    this.setState({ isRangePickerVisible: true });
    this.chooseDestinationRef.current.blur();
  }

  /**
   * On mobile focus select.
   */
  onMobileSelectFocus = () => {
    const { router } = this.props;

    router.push(ROUTES.SEARCH_DESTINATIONS.DESTINATIONS.PATH);
  }

  /**
   * Calendar - format short week day.
   */
  formatShortWeekday = (_, date) => moment(date).format('dd')

  /**
   * Calendar - detect tile content.
   */
  tileContent = ({ date }) => (
    <div className="choose-destination__calendar-cell">
      <div className="choose-destination__calendar-inner-cell">
        {moment(date).format('D')}
      </div>
    </div>
  )

  /**
   * Calendar - detect disabled tile.
   */
  tileDisabled = ({ date }) => {
    const now = moment().startOf('day');

    return moment(date) < now;
  }

  /**
   * On range input change.
   */
  onRangeInputChange = () => this.rangeInputValue

  /**
   * Search destination.
   */
  searchDestination = () => {
    const { searchDestination, searchDestinationParams, router } = this.props;

    // Focus input
    if (
      !isPresent(searchDestinationParams?.locationIntent)
      && !isPresent(this.destinationInputValue)
    ) {
      this.chooseDestinationRef.current.focus();

      return false;
    }

    // Redirect to favorite destination
    if (
      !isPresent(searchDestinationParams?.locationIntent)
      && isPresent(this.destinationInputValue)
    ) {
      router.push(ROUTES.CAMPERVAN_RENTALS.PATH);

      return false;
    }

    searchDestination();

    return true;
  }

  /**
   * Close all pickers.
   */
  closeAllPickers = () => {
    this.setState({ isRangePickerVisible: false });

    this.chooseRangeRef.current.blur();
    this.chooseDestinationRef.current.blur();
  }

  /**
   * Lifecycle method.
   */
  render() {
    const {
      searchDestinationParams,
    } = this.props;

    return (
      <ChooseDestinationWidgetComponent
        {...this.props}
        {...this.state}
        listHeight={this.listHeight}
        rangeInputValue={this.rangeInputValue}
        destinationValue={this.destinationValue}
        dateRange={searchDestinationParams.dateRange}
        onDestinationsChange={this.onDestinationsChange}
        onDestinationsSearch={this.onDestinationsSearchDebounced}
        destinations={this.destinations}
        onRangeFocus={this.onRangeFocus}
        onDateRangeChanged={this.onDateRangeChanged}
        clearDateRange={this.clearDateRange}
        clearDestinations={this.clearDestinations}
        chooseRangeRef={this.chooseRangeRef}
        chooseDestinationRef={this.chooseDestinationRef}
        onMobileSelectFocus={this.onMobileSelectFocus}
        formatShortWeekday={this.formatShortWeekday}
        tileContent={this.tileContent}
        onRangeInputChange={this.onRangeInputChange}
        tileDisabled={this.tileDisabled}
        searchDestinations={this.searchDestination}
        onDestinationsFocus={this.onDestinationsFocus}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  currentCoordinates: currentCoordinatesSelector(state),
  currentLocation: currentLocationSelector(state),
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
  setSearchDestinationDates: setSearchDestinationDatesAction,
  setDestinationsMapBoxIds: setDestinationsMapBoxIdsAction,
  setSearchDestinationLocationIntent: setSearchDestinationLocationIntentAction,
  searchDestination: searchDestinationAction,
};

export { ChooseDestinationWidget as ChooseDestinationWidgetContainer };
export default R.compose(
  withGeolocationRequest,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
  withRouter,
)(ChooseDestinationWidget);
