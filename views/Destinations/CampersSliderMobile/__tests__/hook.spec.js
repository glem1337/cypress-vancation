import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';

import mockedCamper from 'views/__mocks__/camper';
import { activeCamperIdSelector } from 'state/concepts/search-destinations/selectors';
import { dispatch } from '__mocks__/react-redux';
import { setActiveCamperId } from 'state/concepts/search-destinations/actions';

import useContainer from '../hook';

jest.mock('state/concepts/campervan-rental/selectors', () => ({
  campersSelector: jest.fn(() => [mockedCamper]),
}));

jest.mock('state/concepts/search-destinations/selectors', () => ({
  activeCamperIdSelector: jest.fn(() => mockedCamper.id),
}));

const mockedSwiperRef = {
  current: {
    swiper: {
      slidePrev: jest.fn(),
      slideNext: jest.fn(),
      slideTo: jest.fn(),
    },
  },
};
const mockedInteraction = {
  current: null,
};

const mockedRef = jest.fn();
React.useRef = mockedRef;

describe('CampersSliderMobile useContainer hook', () => {
  let result = null;

  const props = {
    onVisibleChange: jest.fn(),
  };

  beforeEach(() => {
    mockedRef
      .mockReturnValueOnce(mockedSwiperRef)
      .mockReturnValueOnce(mockedInteraction);

    ({ result } = renderHook(() => useContainer(props)));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  describe('checks `detectActiveSlide` method', () => {
    it('success conditions', () => {
      act(() => {
        result.current.detectActiveSlide();
      });

      expect(mockedSwiperRef.current.swiper.slideTo).toHaveBeenCalledWith(0, 0, false);
    });

    it('when activeCamperId is not exist', () => {
      activeCamperIdSelector.mockReturnValueOnce('asjdnfjsa');

      mockedRef
        .mockReturnValueOnce(mockedSwiperRef)
        .mockReturnValueOnce(mockedInteraction);

      ({ result } = renderHook(() => useContainer(props)));

      act(() => {
        result.current.detectActiveSlide();
      });

      expect(mockedSwiperRef.current.swiper.slideTo).not.toHaveBeenCalled();
    });

    it('when swiperRef is not exist', () => {
      React.useRef.mockReturnValueOnce({});

      ({ result } = renderHook(() => useContainer(props)));

      let res = null;

      act(() => {
        res = result.current.detectActiveSlide();
      });

      expect(res).toBe(false);
    });
  });

  describe('checks `onSlideChange` method', () => {
    it('should return false', () => {
      let res = null;

      result.current.canInteract.current = false;

      act(() => {
        res = result.current.onSlideChange({ realIndex: 0 });
      });

      expect(res).toBe(false);
    });

    it('should return true', () => {
      let res = null;

      activeCamperIdSelector.mockReturnValueOnce('asjdnfjsa');

      mockedRef
       .mockReturnValueOnce(mockedSwiperRef)
       .mockReturnValueOnce({ current: true });

      ({ result } = renderHook(() => useContainer(props)));

      act(() => {
        res = result.current.onSlideChange({ realIndex: 0 });
      });

      expect(dispatch).toHaveBeenCalledWith(setActiveCamperId(mockedCamper.id));

      expect(res).toBe(true);
    });
  });
});
