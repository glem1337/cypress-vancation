import { useEffect, useRef } from 'react';
import moment from 'moment';
import { Navigate } from 'react-big-calendar';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { isUserLoggedInSelector } from 'state/concepts/session/selectors';

import { BREAK_POINTS } from 'constants/breakpoints';
import { FETCH_CAMPER_CALENDAR_BOUNDARIES, CALENDAR_BOUNDARIES } from 'constants/calendar';
import {
  currentDateSelector,
  isAvailabilityVisibleSelector,
  isSettingsVisibleSelector,
  isFooterVisibleSelector,
  camperBlockedEventsSelector,
  camperBlockedExternalCalendarSelector,
} from 'state/concepts/calendar/selectors';
import { camperSelector } from 'state/concepts/camper/selectors';
import isPresent from 'utils/isPresent';
import redirect from 'utils/redirect';
import { fetchCamperCalendar as fetchCamperCalendarAction } from 'state/concepts/camper/actions';
import {
  setCurrentDate as setCurrentDateAction,
  setSelectedSlots as setSelectedSlotsAction,
  setAvailabilityVisibility as setAvailabilityVisibilityAction,
} from 'state/concepts/calendar/actions';

function usePricingAndAvailability() {
  const isAdjustingHeight = useRef(false);

  const dispatch = useDispatch();

  const router = useRouter();

  const camperId = router.query.camper;

  const camper = useSelector(state => camperSelector(state, camperId));
  const currentDate = useSelector(currentDateSelector);
  const isAvailabilityVisible = useSelector(isAvailabilityVisibleSelector);
  const isSettingsVisible = useSelector(isSettingsVisibleSelector);
  const footerVisible = useSelector(isFooterVisibleSelector);
  const blockedEvents = useSelector(camperBlockedEventsSelector);
  const blockedExternalCalendars = useSelector(camperBlockedExternalCalendarSelector);

  const events = [
    ...blockedEvents,
    ...blockedExternalCalendars,
  ];

  /**
   * Check scroll containers.
   */
  const checkScrollContainers = async () => {
    try {
      const scrollContainers = document.querySelectorAll('.rbc-row-content-scroll-container');

      if (isAdjustingHeight.current) {
        return false;
      }

      for (let i = 0; i < scrollContainers.length; i += 1) {
        isAdjustingHeight.current = true;

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

      isAdjustingHeight.current = false;
    } catch (err) {
      return false;
    }

    return true;
  };

  /**
   * Calendar - weekday format.
   */
  const weekdayFormat = (date, culture, selectedLocalizer) => (
    window.innerWidth < BREAK_POINTS.TABLET
      ? selectedLocalizer.format(date, 'ddd', culture).toUpperCase()
      : selectedLocalizer.format(date, 'dddd', culture).toUpperCase()
    );

  /**
   * Calendar - formats.
   */
  const formats = () => ({
    weekdayFormat,
  });

  /**
   * Calendar - on navigate.
   */
  const onNavigate = (date, _, action) => {
    const momentValue = moment(date);

    if (action === Navigate.NEXT && momentValue >= CALENDAR_BOUNDARIES.MAX) {
      return;
    }

    if (action === Navigate.PREVIOUS && momentValue <= CALENDAR_BOUNDARIES.MIN) {
      return;
    }

    dispatch(setCurrentDateAction(moment(date)));
    dispatch(fetchCamperCalendarAction({
      camperId,
      startDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(date).startDate,
      endDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(date).endDate,
    }));
  };

  /**
   * On select slot.
   */
  const onSelectSlot = (data) => {
    const prevDay = moment().subtract(1, 'days').endOf('day').toDate();
    const filtered = data.slots.filter(item => item.getTime() > prevDay.getTime());

    if (!isPresent(filtered)) {
      return;
    }

    dispatch(setSelectedSlotsAction({
      start: data.start,
      end: data.end,
      slots: filtered,
    }));

    dispatch(setAvailabilityVisibilityAction(true));
  };

  const updateCalendarByCamperId = () => {
    const destination = {
      pathname: router.pathname,
    };

    if (isPresent(router.query.camper)) {
      dispatch(setCurrentDateAction(moment()));

      destination.query = {
        camper: router.query.camper,
      };
    }

    redirect(destination);
  };

  useEffect(() => {
    checkScrollContainers();
  });

  useEffect(() => {
    updateCalendarByCamperId();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.camper]);

  return {
    events,
    formats,
    calendarMeasures: {
      width: '100%',
    },
    currentDate,
    onNavigate,
    onSelectSlot,
    isAvailabilityVisible,
    isSettingsVisible,
    camperId: router.query.camperId,
    footerVisible,
    checkScrollContainers,
    weekdayFormat,
    camper,
    updateCalendarByCamperId,
  };
}

export const getInitialProps = async (ctx) => {
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
};

export default usePricingAndAvailability;
