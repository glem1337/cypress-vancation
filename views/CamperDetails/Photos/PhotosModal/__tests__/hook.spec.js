import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { dispatch } from '__mocks__/react-redux';
import { hideModal as hideModalAction } from 'state/modal/actions';
import isMobileView from 'utils/breakpoints/isMobileView';
import isTabletView from 'utils/breakpoints/isTabletView';

import useContainer from '../hook';

const mockedSwiperRef = {
  current: {
    swiper: {
      slidePrev: jest.fn(),
      slideNext: jest.fn(),
      update: jest.fn(),
      slideTo: jest.fn(),
    },
  },
};
jest.mock('react', () => {
  const originReact = jest.requireActual('react');

  return {
    ...originReact,
    useRef: jest.fn(() => mockedSwiperRef),
  };
});

jest.mock('utils/breakpoints/isMobileView', () => jest.fn(() => true));
jest.mock('utils/breakpoints/isTabletView', () => jest.fn(() => true));

describe('PhotosModal useContainer hook', () => {
  Object.defineProperty(
    document,
    'querySelector',
    { value: jest.fn() },
  );

  let result = null;

  const props = {
    activeIndex: 1,
  };

  beforeEach(() => {
    ({ result } = renderHook(() => useContainer(props)));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `hideModal` method', () => {
    act(() => {
      result.current.hideModal();
    });

    expect(dispatch).toHaveBeenCalledWith(hideModalAction());
  });

  describe('checks `moveLeft` method', () => {
    it('should move', () => {
      let res = null;

      act(() => {
        res = result.current.moveLeft();
      });

      expect(mockedSwiperRef.current.swiper.slidePrev).toHaveBeenCalled();
      expect(res).toBe(true);
    });

    it('should not move', () => {
      React.useRef
        .mockReturnValueOnce({});

      ({ result } = renderHook(() => useContainer(props)));

      let res = null;

      act(() => {
        res = result.current.moveLeft();
      });

      expect(res).toBe(false);
    });
  });

  describe('checks `moveRight` method', () => {
    it('should move', () => {
      let res = null;

      act(() => {
        res = result.current.moveRight();
      });

      expect(mockedSwiperRef.current.swiper.slideNext).toHaveBeenCalled();
      expect(res).toBe(true);
    });

    it('should not move', () => {
      React.useRef.mockReturnValueOnce({});

      ({ result } = renderHook(() => useContainer(props)));

      let res = null;

      act(() => {
        res = result.current.moveRight();
      });

      expect(res).toBe(false);
    });
  });

  describe('checks `scrollToActiveIndex` method', () => {
    it('should not move', async () => {
      const res = await result.current.scrollToActiveIndex();

      expect(res).toBe(false);
    });

    it('should move', async () => {
      document.querySelector
        .mockReturnValue({
          scrollIntoView: jest.fn(),
        });

      ({ result } = renderHook(() => useContainer(props)));

      const res = await result.current.scrollToActiveIndex();

      expect(res).toBe(true);
    });
  });

  describe('checks `slideToActiveIndex` method', () => {
    it('should not move as not desktop', () => {
      let res = null;

      act(() => {
        res = result.current.slideToActiveIndex();
      });

      expect(res).toBe(false);
    });

    it('should not move as swiper does not exist', () => {
      let res = null;

      isTabletView.mockReturnValue(false);
      isMobileView.mockReturnValue(false);

      React.useRef.mockReturnValueOnce({});

      ({ result } = renderHook(() => useContainer(props)));

      act(() => {
        res = result.current.slideToActiveIndex();
      });

      expect(res).toBe(false);
    });

    it('should slide', () => {
      let res = null;

      isTabletView.mockReturnValue(false);
      isMobileView.mockReturnValue(false);

      act(() => {
        res = result.current.slideToActiveIndex();
      });

      expect(mockedSwiperRef.current.swiper.slideTo).toHaveBeenCalledWith(props.activeIndex + 1, 0);
      expect(res).toBe(true);
    });
  });
});
