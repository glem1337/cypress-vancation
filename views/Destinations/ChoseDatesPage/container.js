import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import ROUTES from 'constants/routes';
import isPresent from 'utils/isPresent';
import isMobileView from 'utils/breakpoints/isMobileView';

import {
  setSearchDestinationDates as setSearchDestinationDatesAction,
  searchDestination as searchDestinationAction,
} from 'state/concepts/search-destinations/actions';
import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';

import SearchDatesComponent from './component';

class SearchDates extends React.Component {
  static propTypes = {
    router: PropTypes.shape().isRequired,
    setSearchDestinationDates: PropTypes.func.isRequired,
    searchDestinationParams: PropTypes.shape().isRequired,
    shouldGoBack: PropTypes.string,
    searchDestination: PropTypes.func.isRequired,
  }

  static defaultProps = {
    shouldGoBack: undefined,
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

    this.state = {
      activeStartDate: this.createMinMonth().toDate(),
    };
  }

  /**
   * Lifecycle method.
   */
  componentDidMount() {
    this.injectMonths();

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
   * Inject months.
   */
  injectMonths = () => {
    const { activeStartDate } = this.state;

    const days = document.querySelectorAll('.react-calendar__month-view__days');

    if (!isPresent(days)) {
      return false;
    }

    const first = R.head(days);
    const second = R.last(days);
    const firstParent = first.parentNode;
    const secondParent = second.parentNode;

    const div = document.createElement('span');
    div.id = 'search-destinations__first-month';
    div.classList.add('search-destinations__month');
    div.textContent = moment(activeStartDate).format('MMMM YYYY');

    firstParent.insertBefore(div, first);

    const clone = div.cloneNode();
    clone.id = 'search-destinations__second-month';
    clone.textContent = moment(activeStartDate).clone().add(1, 'months').format('MMMM YYYY');
    secondParent.insertBefore(clone, second);

    return true;
  }

  /**
   * On close.
   */
  onClose = () => {
    const { router } = this.props;

    router.back();
  }

  /**
   * On date range was changed.
   */
  onDateRangeChanged = (range) => {
    const { setSearchDestinationDates } = this.props;

    const now = moment().startOf('month');

    const editedRange = [
      moment(range[0]) < now ? now.clone().toDate() : range[0],
      moment(range[1]) < now ? now.clone().toDate() : range[1],
    ];

    setSearchDestinationDates(editedRange);
  }

  /**
   * Calendar - format short week day.
   */
  formatShortWeekday = (_, date) => moment(date).format('dd')

  /**
   * Calendar - tile content.
   */
  tileContent = ({ date }) => (
    <div className="choose-destination__calendar-cell">
      <div className="choose-destination__calendar-inner-cell">
        {moment(date).format('D')}
      </div>
    </div>
  )

  /**
   * Clear date range.
   */
  clearDateRange = () => {
    const { setSearchDestinationDates } = this.props;

    setSearchDestinationDates(null);
  }

  /**
   * Create min month.
   */
  createMinMonth = () => {
    const min = moment().startOf('month');

    return min;
  }

  /**
   * Load prev month.
   */
  loadPrevMonth = () => {
    const { activeStartDate } = this.state;

    const min = this.createMinMonth();

    const prev = moment(activeStartDate).subtract(1, 'month');

    if (prev < min) {
      return false;
    }

    this.setState(
      { activeStartDate: prev.toDate() },
      this.updateMonthNames,
    );

    return true;
  }

  /**
   * Load next month.
   */
  loadNextMonth = () => {
    const { activeStartDate } = this.state;

    const next = moment(activeStartDate).add(1, 'month');

    this.setState(
      { activeStartDate: next.toDate() },
      this.updateMonthNames,
    );

    return next;
  }

  /**
   * Update month names.
   */
  updateMonthNames = () => {
    const { activeStartDate } = this.state;

    const firstMonth = document.getElementById('search-destinations__first-month');
    const secondMonth = document.getElementById('search-destinations__second-month');

    firstMonth.innerHTML = moment(activeStartDate).format('MMMM YYYY');
    secondMonth.innerHTML = moment(activeStartDate).clone().add(1, 'months').format('MMMM YYYY');

    const scrollingElement = document.getElementById('search-destinations');
    scrollingElement.scrollTop = scrollingElement.scrollHeight;

    return true;
  }

  /**
   * Calendar - is tile disabled.
   */
  tileDisabled = ({ date }) => {
    const now = moment().startOf('day');

    return moment(date) < now;
  }

  /**
   * On press on Search button.
   */
  search = () => {
    const { searchDestination, shouldGoBack, router } = this.props;

    if (isPresent(shouldGoBack)) {
      router.back();
    } else {
      searchDestination();
    }
  }

  render() {
    const { searchDestinationParams } = this.props;

    return (
      <SearchDatesComponent
        {...this.props}
        {...this.state}
        onClose={this.onClose}
        onDateRangeChanged={this.onDateRangeChanged}
        dateRange={searchDestinationParams.dateRange}
        formatShortWeekday={this.formatShortWeekday}
        tileContent={this.tileContent}
        tileDisabled={this.tileDisabled}
        clearDateRange={this.clearDateRange}
        loadPrevMonth={this.loadPrevMonth}
        loadNextMonth={this.loadNextMonth}
        skip={this.skip}
        search={this.search}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  searchDestinationParams: searchDestinationParamsSelector(state),
});

const mapDispatchToProps = {
  setSearchDestinationDates: setSearchDestinationDatesAction,
  searchDestination: searchDestinationAction,
};

export { SearchDates as SearchDatesContainer };
export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(SearchDates);
