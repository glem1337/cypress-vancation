import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import moment from 'moment';
import { Navigate } from 'react-big-calendar';

import mockedCamper from 'views/__mocks__/camper';
import { FETCH_CAMPER_CALENDAR_BOUNDARIES } from 'constants/calendar';
import { isUserLoggedInSelector } from 'state/concepts/session/selectors';
import { fetchSelf } from 'state/concepts/users/actions';
import {
  setCurrentDate,
  setSelectedSlots,
  setAvailabilityVisibility,
} from 'state/concepts/calendar/actions';
import { fetchCamperCalendar } from 'state/concepts/camper/actions';
import { dispatch } from '__mocks__/react-redux';
import redirect from 'utils/redirect';

import usePricingAndAvailability, { getInitialProps } from '../usePricingAndAvailability';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('state/concepts/session/selectors', () => ({
  currentUserSelector: jest.fn(() => ({
    session: {
      currentUser: {
        email: 'test@gmail.com',
        user: {
          lastName: 'lastName_test',
          firstName: 'firstName_test',
          avatarUrl: 'test_url',
        },
      },
    },
  })),
  isUserLoggedInSelector: jest.fn(() => true),
}));

const mockedMoment = moment();
jest.mock('state/concepts/calendar/selectors', () => ({
  currentDateSelector: jest.fn(() => mockedMoment),
  isAvailabilityVisibleSelector: jest.fn(() => true),
  isSettingsVisibleSelector: jest.fn(() => true),
  isFooterVisibleSelector: jest.fn(() => false),
  camperBlockedEventsSelector: jest.fn(() => []),
  camperBlockedExternalCalendarSelector: jest.fn(() => []),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => mockedCamper),
  camperExternalCalendarsSelector: jest.fn(),
}));

const router = {
  query: { camper: 'camperId' },
  pathname: '/calendar',
};
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => router),
}));

jest.mock('utils/redirect', () => jest.fn());

const mockedQuerySelector = jest.fn(() => [
  {
    scrollHeight: 123,
    clientHeight: 12,
    parentElement: {
      style: {},
      parentElement: {
        style: {},
      },
    },
  },
]);
describe('usePricingAndAvailability hook', () => {
  Object.defineProperty(
    document,
    'querySelectorAll',
    { value: mockedQuerySelector },
  );

  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(usePricingAndAvailability));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  describe('tests "getInitialProps" static method', () => {
    const ctx = {
      store: {
        dispatch: jest.fn(),
        getState: jest.fn(),
      },
      query: {
        camper: 'test id',
      },
    };

    it('should fetch specifications', async () => {
      await getInitialProps(ctx);

      expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
        1,
        fetchCamperCalendar({ camperId: ctx.query.camper }),
      );
    });

    it('should not fetch specifications', async () => {
      isUserLoggedInSelector.mockReturnValueOnce(false);

      await getInitialProps(ctx);

      expect(ctx.store.dispatch).not.toHaveBeenCalledWith(fetchSelf());
    });
  });

  describe('checks `checkScrollContainers` instance method', () => {
    it('should return true', async () => {
      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: true });

      const res = await result.current.checkScrollContainers();

      expect(res).toBe(true);
    });

    it('should return false', async () => {
      const res = await result.current.checkScrollContainers();

      expect(res).toBe(false);
    });

    it('should return false as error', async () => {
      mockedQuerySelector.mockReturnValueOnce([{
        scrollHeight: 111,
        clientHeight: 11,
      }]);

      const res = await result.current.checkScrollContainers();

      expect(res).toBe(false);
    });
  });

  it('checks `updateCalendarByCamperId` instance method', async () => {
    jest.spyOn(React, 'useRef')
      .mockReturnValueOnce({ current: true });

    await result.current.updateCalendarByCamperId();

    const destination = {
      pathname: router.pathname,
      query: {
        camper: router.query.camper,
      },
    };

    expect(dispatch).toHaveBeenCalledWith(setCurrentDate(moment()));
    expect(redirect).toHaveBeenCalledWith(destination);
  });

  it('checks `formats` method', () => {
    let res = null;

    act(() => {
      res = result.current.formats();
    });

    expect(res).toMatchSnapshot();
  });

  it('checks `weekdayFormat` method', () => {
    const formatter = { format: jest.fn(() => 'format') };

    act(() => {
      result.current.weekdayFormat('date', null, formatter);
    });

    expect(formatter.format).toHaveBeenCalledWith('date', 'dddd', null);
  });

  describe('checks `onNavigate` method', () => {
    it('when prev step is disabled', async () => {
      const date = moment(new Date('2/20/2000')).subtract(20, 'month').startOf('month');

      act(() => {
        result.current.onNavigate(date, null, Navigate.PREVIOUS);
      });

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('when next step is disabled', async () => {
      const date = moment(new Date('2/20/2000')).add(40, 'month').startOf('month');

      act(() => {
        result.current.onNavigate(date, null, Navigate.NEXT);
      });

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('with correct date', async () => {
      const date = moment(new Date('2/20/2000')).add(4, 'month');

      act(() => {
        result.current.onNavigate(date, null, Navigate.NEXT);
      });

      expect(dispatch).toHaveBeenCalledWith(setCurrentDate(moment(date)));
      expect(dispatch).toHaveBeenCalledWith(
        fetchCamperCalendar({
          camperId: 'camperId',
          startDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(date).startDate,
          endDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(date).endDate,
        }),
      );
    });
  });

  describe('checks `onSelectSlot` method', () => {
    it('for actual dates', () => {
      const data = {
        start: new Date(),
        end: new Date(),
        slots: [new Date()],
      };

      act(() => {
        result.current.onSelectSlot(data);
      });

      expect(dispatch).toHaveBeenNthCalledWith(1, setSelectedSlots(data));
      expect(dispatch).toHaveBeenNthCalledWith(2, setAvailabilityVisibility(true));
    });

    it('for not actual dates', () => {
      const data = {
        start: new Date(),
        end: new Date(),
        slots: [
          moment().subtract(1, 'days').toDate(),
          moment().subtract(2, 'days').toDate(),
        ],
      };

      act(() => {
        result.current.onSelectSlot(data);
      });

      expect(dispatch).not.toHaveBeenCalled();
    });
  });
});
