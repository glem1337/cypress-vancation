import { act, renderHook, cleanup } from '@testing-library/react-hooks';
import React from 'react';

import useContainer from '../hook';

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

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationParamsSelector: jest.fn(() => ({
    dateRange: null,
  })),
}));

jest.mock('state/concepts/calendar/selectors', () => ({
  camperBlockedPeriodsSelector: jest.fn(() => ({})),
}));

const mockObserve = jest.fn();
const mockUnobserve = jest.fn();
jest.mock('react', () => {
  const originReact = jest.requireActual('react');

  return {
    ...originReact,
    useRef: jest.fn(() => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
    })),
  };
});
describe('CalendarAvailability useContainer hook', () => {
  window.IntersectionObserver = jest.fn(() => ({
    observe: mockObserve,
    unobserve: mockUnobserve,
  }));

  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useContainer));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('should observe position', () => {
    jest
      .spyOn(React, 'useRef')
      .mockReturnValueOnce({ current: {} });

    ({ result } = renderHook(useContainer));

    expect(mockObserve).toHaveBeenCalled();
  });

  it('should unobserve position', () => {
    jest
      .spyOn(React, 'useRef')
      .mockReturnValueOnce({ current: {} });

    ({ result } = renderHook(useContainer));

    cleanup();

    expect(mockUnobserve).toHaveBeenCalled();
  });

  describe('checks `handleIntersect` method', () => {
    it('should return false', () => {
      let res = null;

      act(() => {
        res = result.current.handleIntersect([{ isIntersecting: false }]);
      });

      expect(res).toBe(false);
    });

    it('should return true', () => {
      let res = null;

      jest
        .spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: true })
        .mockReturnValueOnce({ current: true })
        .mockReturnValueOnce({ current: true });

      act(() => {
        res = result.current.handleIntersect([{ isIntersecting: true }]);
      });

      expect(res).toBe(true);
    });
  });

  describe('checks unmounting', () => {
    it('should return true', () => {
      let res = null;

      jest
        .spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: true })
        .mockReturnValueOnce({ current: true })
        .mockReturnValueOnce({ current: true });

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.unmount();
      });

      expect(res).toBe(true);
    });

    it('should return false', () => {
      let res = null;

      React.useRef = jest.fn(() => null);

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.unmount();
      });

      expect(res).toBe(false);
    });
  });
});
