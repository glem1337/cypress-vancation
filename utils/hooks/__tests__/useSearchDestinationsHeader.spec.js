import { act, renderHook } from '@testing-library/react-hooks';
import { useRef } from 'react';

import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';

import useSearchDestinationsHeader from '../useSearchDestinationsHeader';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationParamsSelector: jest.fn(() => ({
    dateRange: null,
    location: null,
    locationIntent: null,
  })),
}));

jest.mock('react', () => {
  const originReact = jest.requireActual('react');

  const mUseRef = jest.fn(() => ({
    current: null,
  }));

  return {
    ...originReact,
    useRef: mUseRef,
  };
});

describe('useSearchDestinationsHeader hook', () => {
  Object.defineProperty(
    window,
    'addEventListener',
    { value: jest.fn() },
  );

  Object.defineProperty(
    window,
    'removeEventListener',
    { value: jest.fn() },
  );

  let result = null;

  const props = {};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    ({ result } = renderHook(() => useSearchDestinationsHeader(props)));

    expect(window.addEventListener).toHaveBeenCalledWith('scroll', result.current.scrollHandler);

    expect(result.current).toMatchSnapshot();
  });

  describe('checks `showHeaderSmallInputs` method', () => {
    it('without search params', () => {
      let res = null;

      ({ result } = renderHook(() => useSearchDestinationsHeader(props)));

      act(() => {
        res = result.current.showHeaderSmallInputs();
      });

      expect(res).toMatchSnapshot();
    });

    it('with search params', () => {
      let res = null;

      searchDestinationParamsSelector.mockReturnValueOnce({
        dateRange: { id: 1 },
        location: { id: 1 },
        locationIntent: { id: 1 },
      });

      useRef.mockReturnValueOnce({
        current: {
          setMenuGroupVisibility: jest.fn(),
        },
      });

      ({ result } = renderHook(() => useSearchDestinationsHeader(props)));

      act(() => {
        res = result.current.showHeaderSmallInputs();
      });

      expect(res).toMatchSnapshot();
    });
  });

  it('checks `hideHeaderSmallInputs` method', () => {
    let res = null;

    useRef.mockReturnValueOnce({
      current: {
        setMenuGroupVisibility: jest.fn(),
      },
    });

    ({ result } = renderHook(() => useSearchDestinationsHeader(props)));

    act(() => {
      res = result.current.hideHeaderSmallInputs();
    });

    expect(res).toMatchSnapshot();
  });

  describe('checks `scrollHandler` method', () => {
    it('with show small inputs condition', () => {
      window.pageYOffset = 300;

      useRef
        .mockReturnValueOnce({
          current: {
            setMenuGroupVisibility: jest.fn(),
          },
        })
        .mockReturnValueOnce({
          current: {
            isChooseDestinationBigVisible: true,
          },
        });

      ({ result } = renderHook(() => useSearchDestinationsHeader(props)));

      let res = null;

      act(() => {
        res = result.current.scrollHandler();
      });

      expect(res).toMatchSnapshot();
    });

    it('with hide small inputs condition', () => {
      window.pageYOffset = 250;

      useRef
        .mockReturnValueOnce({
          current: {
            setMenuGroupVisibility: jest.fn(),
          },
        })
        .mockReturnValueOnce({
          current: {
            isChooseDestinationSmallVisible: true,
          },
        });

      ({ result } = renderHook(() => useSearchDestinationsHeader(props)));

      let res = null;

      act(() => {
        res = result.current.scrollHandler();
      });

      expect(res).toMatchSnapshot();
    });
  });

  it('checks `onStartInputFocus` method', () => {
    ({ result } = renderHook(() => useSearchDestinationsHeader(props)));

    act(() => {
      result.current.onStartInputFocus();
    });

    expect(result.current.state).toMatchSnapshot();
  });

  describe('checks `detectStartInputVisibility` method', () => {
    it('without search params', () => {
      let res = null;

      ({ result } = renderHook(() => useSearchDestinationsHeader(props)));

      act(() => {
        res = result.current.detectStartInputVisibility();
      });

      expect(res).toBe(true);
    });

    it('with search params', () => {
      let res = null;

      searchDestinationParamsSelector.mockReturnValueOnce({
        dateRange: { id: 1 },
        location: { id: 1 },
        locationIntent: { id: 1 },
      });

      ({ result } = renderHook(() => useSearchDestinationsHeader(props)));

      act(() => {
        res = result.current.detectStartInputVisibility();
      });

      expect(res).toBe(false);
    });
  });

  it('checks `unmount` method', () => {
    ({ result } = renderHook(() => useSearchDestinationsHeader(props)));

    act(() => {
      result.current.unmount();
    });

    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', result.current.scrollHandler);
  });
});
