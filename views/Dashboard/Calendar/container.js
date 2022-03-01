import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Navigate } from 'react-big-calendar';
import * as R from 'ramda';
import { withRouter } from 'next/router';

import { BREAK_POINTS } from 'constants/breakpoints';
import { FETCH_CAMPER_CALENDAR_BOUNDARIES, CALENDAR_BOUNDARIES } from 'constants/calendar';
import { isUserLoggedInSelector, currentUserSelector } from 'state/concepts/session/selectors';
import {
  currentDateSelector,
  isAvailabilityVisibleSelector,
  isSettingsVisibleSelector,
  isFooterVisibleSelector,
  camperBlockedEventsSelector,
  camperBlockedExternalCalendarSelector,
} from 'state/concepts/calendar/selectors';
import {
  setCurrentDate as setCurrentDateAction,
  setSelectedSlots as setSelectedSlotsAction,
  setAvailabilityVisibility as setAvailabilityVisibilityAction,
} from 'state/concepts/calendar/actions';
import { fetchCamperCalendar as fetchCamperCalendarAction } from 'state/concepts/camper/actions';
import { camperSelector } from 'state/concepts/camper/selectors';
import isPresent from 'utils/isPresent';
import redirect from 'utils/redirect';

import DashboardCalendarComponent from './component';

class DashboardCalendar extends React.Component {
  static propTypes = {
    currentUser: PropTypes.shape(),
    setCurrentDate: PropTypes.func.isRequired,
    events: PropTypes.arrayOf(PropTypes.shape()),
    setSelectedSlots: PropTypes.func.isRequired,
    setAvailabilityVisibility: PropTypes.func.isRequired,
    fetchCamperCalendar: PropTypes.func.isRequired,
    pricingInfo: PropTypes.shape(),
    camperId: PropTypes.string.isRequired,
    router: PropTypes.shape().isRequired,
    currentDate: PropTypes.instanceOf(moment).isRequired,
  }

  static defaultProps = {
    pricingInfo: null,
    currentUser: null,
    events: [],
  };

  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper;

    const state = ctx.store.getState();

    const isUserLoggedIn = isUserLoggedInSelector(state);

    if (isUserLoggedIn) {
      ctx.store.dispatch(fetchCamperCalendarAction({ camperId }));
    }

    return {
      isUserLoggedIn,
      camperId,
    };
  }

  calendarMeasures = {
    minHeight: '100vh',
    width: '100%',
  }

  /**
   * Lifecycle method.
   */
  componentDidUpdate(prevProps) {
    const { router, setCurrentDate } = this.props;

    if (router.query.camper !== prevProps.router.query.camper) {
      const destination = {
        pathname: router.pathname,
      };

      if (isPresent(router.query.camper)) {
        setCurrentDate(moment());

        destination.query = {
          camper: router.query.camper,
        };
      }

      redirect(destination);
    }

    this.checkScrollContainers();
  }

  /**
   * Check scroll containers.
   */
  checkScrollContainers = async () => {
    try {
      const scrollContainers = document.querySelectorAll('.rbc-row-content-scroll-container');

      if (this.isAdjustingHeight) {
        return false;
      }

      for (let i = 0; i < scrollContainers.length; i += 1) {
        this.isAdjustingHeight = true;

        const element = scrollContainers[i];

        if (
          element.scrollHeight !== 0
          && element.clientHeight !== 0
          && element.scrollHeight !== element.clientHeight
        ) {
          element.parentElement.style.minHeight = `${element.scrollHeight + 44}px`;
          element.parentElement.parentElement.style.minHeight = `${element.scrollHeight + 44}px`;
        }
      }

      this.isAdjustingHeight = false;
    } catch (err) {
      return false;
    }

    return true;
  }

  formats = () => ({
    weekdayFormat: this.weekdayFormat,
  })

  weekdayFormat = (date, culture, selectedLocalizer) => (
    window.innerWidth < BREAK_POINTS.TABLET
      ? selectedLocalizer.format(date, 'ddd', culture).toUpperCase()
      : selectedLocalizer.format(date, 'dddd', culture).toUpperCase()
    )

  onNavigate = (date, _, action) => {
    const { setCurrentDate, fetchCamperCalendar, camperId } = this.props;

    const momentValue = moment(date);

    if (action === Navigate.NEXT && momentValue >= CALENDAR_BOUNDARIES.MAX) {
      return;
    }

    if (action === Navigate.PREVIOUS && momentValue <= CALENDAR_BOUNDARIES.MIN) {
      return;
    }

    setCurrentDate(moment(date));
    fetchCamperCalendar({
      camperId,
      startDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(date).startDate,
      endDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(date).endDate,
    });
  }

  onSelectSlot = (data) => {
    const { setSelectedSlots, setAvailabilityVisibility } = this.props;

    const prevDay = moment().subtract(1, 'days').endOf('day').toDate();
    const filtered = data.slots.filter(item => item.getTime() > prevDay.getTime());

    if (!isPresent(filtered)) {
      return;
    }

    setSelectedSlots({
      start: data.start,
      end: data.end,
      slots: filtered,
    });

    setAvailabilityVisibility(true);
  }

  render() {
    return (
      <DashboardCalendarComponent
        {...this.props}
        formats={this.formats}
        calendarMeasures={this.calendarMeasures}
        calendarRef={this.calendarRef}
        calendarBoundaries={this.calendarBoundaries}
        onNavigate={this.onNavigate}
        onSelectSlot={this.onSelectSlot}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  camper: camperSelector(state, ownProps?.camperId),
  currentUser: currentUserSelector(state),
  currentDate: currentDateSelector(state),
  isAvailabilityVisible: isAvailabilityVisibleSelector(state),
  isSettingsVisible: isSettingsVisibleSelector(state),
  footerVisible: isFooterVisibleSelector(state),
  events: [
    ...camperBlockedEventsSelector(state),
    ...camperBlockedExternalCalendarSelector(state),
  ],
});

const mapDispatchToProps = {
  setCurrentDate: setCurrentDateAction,
  setSelectedSlots: setSelectedSlotsAction,
  setAvailabilityVisibility: setAvailabilityVisibilityAction,
  fetchCamperCalendar: fetchCamperCalendarAction,
};

export { DashboardCalendar as DashboardCalendarContainer };
export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(DashboardCalendar);
