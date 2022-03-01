import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { FETCH_USER_TYPE } from 'constants/booking';
import { dispatch } from '__mocks__/react-redux';
import { setFiltersVisibility, fetchCamperInquiries } from 'state/concepts/booking/actions';

import useContainer from '../hook';

jest.mock('state/concepts/booking/selectors', () => ({
  camperInquiriesSelector: jest.fn(() => [{ id: 1 }]),
  camperInquiresTotalSelector: jest.fn(() => 22),
  camperInquiresPageSelector: jest.fn(() => 1),
}));

jest.mock('react', () => {
  const originReact = jest.requireActual('react');

  return {
    ...originReact,
    useRef: jest.fn(() => ({ current: null })),
  };
});

describe('BookingsList useContainer hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useContainer));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `toggleSearchExpandCondition` method', () => {
    act(() => {
      result.current.toggleSearchExpandCondition();
    });

    expect(result.current.isSearchExpanded).toBe(true);
  });

  it('checks `setFiltersMenuVisibility` method', () => {
    act(() => {
      result.current.setFiltersMenuVisibility(true)();
    });

    expect(dispatch).toHaveBeenCalledWith(setFiltersVisibility(true));
  });

  it('checks `onPaginationChange` method', () => {
    act(() => {
      result.current.onPaginationChange(22);
    });

    expect(dispatch).toHaveBeenCalledWith(fetchCamperInquiries({
      page: 22,
      userType: FETCH_USER_TYPE.RENTER,
    }));
  });

  describe('checks `scrollHandler` method', () => {
    it('should return false ', () => {
      let res = null;

      act(() => {
        res = result.current.scrollHandler();
      });

      expect(res).toBe(false);
    });

    it('should return true ', () => {
      let res = null;

      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: { scrollTop: 22 } })
        .mockReturnValueOnce({ current: null });

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.scrollHandler();
      });

      expect(res).toBe(true);
    });
  });

  describe('checks `setScrollListeners` method', () => {
    it('should return false ', () => {
      let res = null;

      act(() => {
        res = result.current.setScrollListeners();
      });

      expect(res).toBe(false);
    });

    it('should return true ', () => {
      let res = null;

      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: { addEventListener: jest.fn() } });

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.setScrollListeners();
      });

      expect(res).toBe(true);
    });
  });

  describe('checks `removeScrollListeners` method', () => {
    it('should return false ', () => {
      let res = null;

      act(() => {
        res = result.current.removeScrollListeners();
      });

      expect(res).toBe(false);
    });

    it('should return true ', () => {
      let res = null;

      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: { removeEventListener: jest.fn() } });

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.removeScrollListeners();
      });

      expect(res).toBe(true);
    });
  });
});
