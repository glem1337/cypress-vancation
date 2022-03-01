import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';

import useContainer from '../hook';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationParamsSelector: jest.fn(() => ({
    dateRange: null,
  })),
}));

jest.mock('state/concepts/calendar/selectors', () => ({
  camperBlockedPeriodsSelector: jest.fn(() => ({})),
}));

const mockedHTMLRef = {
  current: {
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      toggle: jest.fn(),
    },
    contains: jest.fn(),
  },
};

jest.mock('utils/hooks/useCalendarAvailability', () => jest.fn(() => ({
  formatShortWeekday: jest.fn(),
  tileContent: jest.fn(),
  tileDisabled: jest.fn(),
  onDateRangeChange: jest.fn(() => true),
  onActiveStartDateChange: jest.fn(),
  isCalendarFetching: false,
  clearDateRange: jest.fn(),
})));

describe('DepartureReturnWidget useContainer hook', () => {
  Object.defineProperty(
    document,
    'querySelector',
    { value: jest.fn() },
  );

  let result = null;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    ({ result } = renderHook(useContainer));

    expect(result.current).toMatchSnapshot();
  });

  describe('checks `onClickHandler` method', () => {
    it('should return false', () => {
      let res = null;

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.onClickHandler();
      });

      expect(res).toBe(false);
    });

    it('should return true', () => {
      jest
        .spyOn(React, 'useRef')
        .mockReturnValueOnce(mockedHTMLRef)
        .mockReturnValueOnce(mockedHTMLRef);

      ({ result } = renderHook(useContainer));

      let res = null;

      act(() => {
        res = result.current.onClickHandler();
      });

      expect(res).toBe(true);
    });
  });

  describe('checks `dateStrings` method', () => {
    it('should return empty values', () => {
      let res = null;

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.dateStrings;
      });

      expect(res).toEqual({
        departure: '',
        return: '',
      });
    });

    it('should return true', () => {
      searchDestinationParamsSelector.mockReturnValueOnce({
        dateRange: [new Date(), new Date()],
      });

      ({ result } = renderHook(useContainer));

      let res = null;

      act(() => {
        res = result.current.dateStrings;
      });

      expect(res).toEqual({
        departure: 'Sun, Feb 20',
        return: 'Sun, Feb 20',
      });
    });
  });

  describe('checks `onDateRangeChangeHandler` method', () => {
    const range = [new Date(), new Date()];

    it('should return false', async () => {
      let res = null;

      ({ result } = renderHook(useContainer));

      res = await result.current.onDateRangeChangeHandler(range);

      expect(res).toBe(false);
    });

    it('should return true', async () => {
      let res = null;

      jest
        .spyOn(React, 'useRef')
        .mockReturnValueOnce(mockedHTMLRef)
        .mockReturnValueOnce(mockedHTMLRef);

      ({ result } = renderHook(useContainer));

      res = await result.current.onDateRangeChangeHandler(range);

      expect(res).toBe(true);
    });
  });

  describe('checks `handleClickOutside` method', () => {
    const event = {
      target: {},
    };

    it('should return false', () => {
      let res = null;

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.handlers.current.handleClickOutside(event);
      });

      expect(res).toBe(false);
    });

    it('should return false', () => {
      let res = null;

      document.querySelector.mockReturnValueOnce({
        contains: jest.fn(() => false),
      });

      jest
        .spyOn(React, 'useRef')
        .mockReturnValueOnce({
          current: {
            contains: jest.fn(() => true),
          },
        })
        .mockReturnValueOnce(mockedHTMLRef);

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.handlers.current.handleClickOutside(event);
      });

      expect(res).toBe(false);
    });

    it('should return false', () => {
      let res = null;

      document.querySelector.mockReturnValueOnce({
        contains: jest.fn(() => false),
      });

      jest
        .spyOn(React, 'useRef')
        .mockReturnValueOnce({
          current: {
            contains: jest.fn(() => false),
          },
        })
        .mockReturnValueOnce(mockedHTMLRef);

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.handlers.current.handleClickOutside(event);
      });

      expect(res).toBe(false);
    });

    it('should return true', () => {
      let res = null;

      jest
        .spyOn(React, 'useRef')
        .mockReturnValueOnce({
          current: {
            contains: jest.fn(() => false),
          },
        })
        .mockReturnValueOnce({
          current: {
            contains: jest.fn(() => true),
          },
        });

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.handlers.current.handleClickOutside(event);
      });

      expect(res).toBe(true);
    });
  });

  describe('checks `scrollHandler` method', () => {
    it('should return false', () => {
      let res = null;

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.handlers.current.scrollHandler();
      });

      expect(res).toBe(false);
    });

    it('should return true', () => {
      let res = null;

      global.window.pageYOffset = 2000;

      jest
        .spyOn(React, 'useRef')
        .mockReturnValueOnce(mockedHTMLRef)
        .mockReturnValueOnce(mockedHTMLRef);

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.handlers.current.scrollHandler();
      });

      expect(res).toBe(true);
    });
  });
});
