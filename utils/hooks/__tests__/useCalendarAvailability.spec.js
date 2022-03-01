import { act, renderHook } from '@testing-library/react-hooks';
import moment from 'moment';
import { dispatch } from '__mocks__/react-redux';

import { FETCH_CAMPER_CALENDAR_BOUNDARIES } from 'constants/calendar';
import { fetchCamperCalendar } from 'state/concepts/camper/actions';
import { camperBlockedPeriodsSelector } from 'state/concepts/calendar/selectors';
import { setSearchDestinationDates } from 'state/concepts/search-destinations/actions';

import useCalendarAvailability from '../useCalendarAvailability';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    query: {
      camper_id: 'camperId',
    },
  })),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('state/concepts/calendar/selectors', () => ({
  camperBlockedPeriodsSelector: jest.fn(() => ({})),
}));

describe('useCalendarAvailability hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useCalendarAvailability));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `formatShortWeekday` method', () => {
    let res = null;

    act(() => {
      res = result.current.formatShortWeekday(null, new Date());
    });

    expect(res).toMatchSnapshot();
  });

  it('checks `tileContent` method', () => {
    let res = null;

    act(() => {
      res = result.current.tileContent({ date: new Date() });
    });

    expect(res).toMatchSnapshot();
  });

  describe('checks `tileDisabled` method', () => {
    it('should return true', () => {
      let res = null;

      act(() => {
        res = result.current.tileDisabled({ date: moment().subtract(1, 'days') });
      });

      expect(res).toBe(true);
    });

    it('should return true as in blocked periods', () => {
      let res = null;

      camperBlockedPeriodsSelector.mockReturnValueOnce({
        [moment().add(1, 'days').format('YYYY-MM-DD')]: true,
      });

      ({ result } = renderHook(useCalendarAvailability));

      act(() => {
        res = result.current.tileDisabled({ date: moment().add(1, 'days') });
      });

      expect(res).toBe(true);
    });

    it('should return false', () => {
      let res = null;

      act(() => {
        res = result.current.tileDisabled({ date: moment().add(1, 'days') });
      });

      expect(res).toBe(false);
    });
  });

  describe('checks `onDateRangeChange` method', () => {
    it('with blocked periods', () => {
      camperBlockedPeriodsSelector.mockReturnValueOnce({
        [moment().format('YYYY-MM-DD')]: true,
        [moment().add(1, 'days').format('YYYY-MM-DD')]: true,
        [moment().add(2, 'days').format('YYYY-MM-DD')]: true,
        [moment().add(3, 'days').format('YYYY-MM-DD')]: true,
      });

      ({ result } = renderHook(useCalendarAvailability));

      act(() => {
        result.current.onDateRangeChange([
          moment().add(1, 'days').toDate(),
          moment().add(4, 'days').toDate(),
        ]);
      });

      expect(dispatch).toHaveBeenCalledWith(setSearchDestinationDates(null));
    });

    it('with the same days', () => {
      act(() => {
        result.current.onDateRangeChange([
          moment().add(1, 'days').toDate(),
          moment().add(1, 'days').toDate(),
        ]);
      });

      expect(dispatch).toHaveBeenCalledWith(setSearchDestinationDates(null));
    });

    it('with different days', () => {
      act(() => {
        result.current.onDateRangeChange([
          moment().add(1, 'days').toDate(),
          moment().add(4, 'days').toDate(),
        ]);
      });

      expect(dispatch).toHaveBeenCalledWith(setSearchDestinationDates([
        moment().add(1, 'days').toDate(),
        moment().add(4, 'days').toDate(),
      ]));
    });

    it('end date less than start date', () => {
      act(() => {
        result.current.onDateRangeChange([
          moment().add(10, 'days').toDate(),
          moment().add(4, 'days').toDate(),
        ]);
      });

      expect(dispatch).toHaveBeenCalledWith(setSearchDestinationDates([
        moment().add(4, 'days').toDate(),
        moment().add(10, 'days').toDate(),
      ]));
    });
  });

  it('checks `onActiveStartDateChange` method', () => {
    const activeStartDate = new Date();

    act(() => {
      result.current.onActiveStartDateChange({ activeStartDate });
    });

    expect(dispatch).toHaveBeenCalledWith(fetchCamperCalendar({
      camperId: 'camperId',
      startDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(activeStartDate).startDate,
      endDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(activeStartDate).endDate,
    }));
  });

  it('checks `clearDateRange` method', () => {
    act(() => {
      result.current.clearDateRange();
    });

    expect(dispatch).toHaveBeenCalledWith(setSearchDestinationDates(null));
  });
});
