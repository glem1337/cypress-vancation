import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as R from 'ramda';
import moment from 'moment';
import { useRouter } from 'next/router';

import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';
import isPresent from 'utils/isPresent';
import useCalendarAvailability from 'utils/hooks/useCalendarAvailability';
import sleep from 'utils/sleep';
import { fetchCamperEndpoint } from 'state/concepts/camper/endpoints';
import { loadingSelector } from 'state/data/selectors';

function useContainer() {
  const wrapperRef = useRef();

  const calendarRef = useRef();

  const router = useRouter();

  const searchParams = useSelector(searchDestinationParamsSelector);

  const {
    formatShortWeekday,
    tileContent,
    tileDisabled,
    onDateRangeChange,
    onActiveStartDateChange,
    isCalendarFetching,
    clearDateRange,
  } = useCalendarAvailability();

  const isCamperFetching = useSelector(
    state => loadingSelector(
      state,
      fetchCamperEndpoint(router.query?.camper_id).endpoint,
    ),
  );

  /**
   * Event handlers.
   */
  const handlers = useRef({
    /**
     * Handle click outside
     */
    handleClickOutside: (event) => {
      if (!calendarRef.current || !wrapperRef.current) {
        return false;
      }

      if (wrapperRef.current.contains(event?.target)) {
        return false;
      }

      if (!calendarRef.current.contains(event?.target)) {
        calendarRef.current.classList.add('departure-return__calendar-wrapper--invisible');

        return false;
      }

      return true;
    },

    /**
     * Scroll handler.
     */
    scrollHandler: () => {
      const DELTA = 1000;

      if (window.pageYOffset > DELTA && calendarRef.current) {
        calendarRef.current.classList.add('departure-return__calendar-wrapper--invisible');

        return true;
      }

      return false;
    },
  });

  /**
   * On click handler.
   */
  const onClickHandler = () => {
    if (!calendarRef?.current) {
      return false;
    }

    calendarRef.current.classList.toggle('departure-return__calendar-wrapper--invisible');

    return true;
  };

  /**
   * Create date strings.
   */
  const dateStrings = () => {
    const dates = {
      departure: '',
      return: '',
    };

    const start = R.path(['dateRange', '0'], searchParams);
    const end = R.path(['dateRange', '1'], searchParams);

    if (isPresent(start)) {
      dates.departure = moment(start).format('ddd, MMM D');
    }

    if (isPresent(start)) {
      dates.return = moment(end).format('ddd, MMM D');
    }

    return dates;
  };

  /**
   * Create date strings.
   */
  const onDateRangeChangeHandler = async (range) => {
    const isChanged = onDateRangeChange(range);

    if (calendarRef?.current && isChanged) {
      await sleep();

      calendarRef.current.classList.add('departure-return__calendar-wrapper--invisible');

      return true;
    }

    return false;
  };

  /**
   * Mounting.
   */
  useEffect(() => {
    document.addEventListener('mousedown', handlers?.current?.handleClickOutside);
    window.addEventListener('scroll', handlers?.current?.scrollHandler);

    return () => {
      document.removeEventListener('mousedown', handlers?.current?.handleClickOutside);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      window.removeEventListener('scroll', handlers?.current?.scrollHandler);
    };
  }, []);

  return {
    wrapperRef,
    calendarRef,
    onClickHandler,
    dateStrings: dateStrings(),
    formatShortWeekday,
    tileContent,
    tileDisabled,
    onDateRangeChangeHandler,
    onActiveStartDateChange,
    isCalendarFetching,
    searchParams,
    isCamperFetching,
    handlers,
    clearDateRange,
  };
}

export default useContainer;
