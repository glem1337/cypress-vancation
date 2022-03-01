import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as R from 'ramda';

import { camperBlockedPeriodsSelector } from 'state/concepts/calendar/selectors';
import { setSearchDestinationDates } from 'state/concepts/search-destinations/actions';
import { loadingSelector } from 'state/data/selectors';
import { fetchCamperCalendarEndpoint } from 'state/concepts/camper/endpoints';
import { FETCH_CAMPER_CALENDAR_BOUNDARIES } from 'constants/calendar';
import { fetchCamperCalendar } from 'state/concepts/camper/actions';

const useCalendarAvailability = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const camperId = R.path(['query', 'camper_id'], router);

  const MIN_SELECTABLE_DATE = moment().startOf('day');

  const blockedPeriods = useSelector(camperBlockedPeriodsSelector);

  const isCalendarFetching = useSelector(
    state => loadingSelector(state, fetchCamperCalendarEndpoint(camperId).endpoint),
  );

  /**
   * Calendar - format short week day.
   */
  const formatShortWeekday = (_, date) => moment(date).format('dd');

  /**
  * Calendar - detect tile content.
  */
  const tileContent = ({ date }) => (
    <div className="campervan-availability__calendar-cell">
      <div className="campervan-availability__calendar-inner-cell">
        {moment(date).format('D')}
      </div>
    </div>
  );

  /**
  * Calendar - detect disabled tile.
  */
  const tileDisabled = ({ date }) => {
    if (moment(date) < MIN_SELECTABLE_DATE) {
      return true;
    }

    const dateString = moment(date).format('YYYY-MM-DD');

    if (blockedPeriods[dateString]) {
      return true;
    }

    return false;
  };

  /**
   * On date range change.
   */
  const onDateRangeChange = (range) => {
    let startDate = moment.utc(range[0]) < MIN_SELECTABLE_DATE
      ? MIN_SELECTABLE_DATE.clone()
      : moment(range[0]);

    let endDate = moment.utc(range[1]) < MIN_SELECTABLE_DATE
      ? MIN_SELECTABLE_DATE.clone()
      : moment(range[1]);

    const keys = Object.keys(blockedPeriods);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];

      const date = moment(key, 'YYYY-MM-DD');

      // If date is blocked by owner.
      if (date > startDate && date <= endDate) {
        endDate = date.clone().subtract(1, 'day');
      }
    }

    if (endDate < startDate) {
      const temp = startDate;
      startDate = endDate;
      endDate = temp;
    }

    if (startDate.clone().format('YYYY-MM-DD') === endDate.clone().format('YYYY-MM-DD')) {
      dispatch(setSearchDestinationDates(null));

      return false;
    }

    dispatch(setSearchDestinationDates([
      startDate.toDate(),
      endDate.toDate(),
    ]));

    return true;
  };

  /**
   * On active start data change
   */
  const onActiveStartDateChange = ({ activeStartDate }) => {
    // Fetch new calendar data
    dispatch(fetchCamperCalendar({
      camperId,
      startDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(activeStartDate).startDate,
      endDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(activeStartDate).endDate,
    }));
  };

  /**
   * Clear date range
   */
  const clearDateRange = () => {
    dispatch(setSearchDestinationDates(null));
  };

  return {
    formatShortWeekday,
    tileContent,
    tileDisabled,
    onDateRangeChange,
    isCalendarFetching,
    onActiveStartDateChange,
    clearDateRange,
  };
};

export default useCalendarAvailability;
