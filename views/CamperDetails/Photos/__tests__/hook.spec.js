import { act, renderHook } from '@testing-library/react-hooks';
import { dispatch } from '__mocks__/react-redux';
import React from 'react';

import { CAMPER_PHOTO_DEFAULT } from 'constants/camper';
import { showModal } from 'state/modal/actions';
import isMobileView from 'utils/breakpoints/isMobileView';
import isTabletView from 'utils/breakpoints/isTabletView';

import useContainer from '../hook';

const mockedPhotos = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];
jest.mock('state/concepts/camper/selectors', () => ({
  camperPhotosSelector: jest.fn(() => mockedPhotos),
}));

jest.mock('utils/breakpoints/isMobileView', () => jest.fn(() => true));
jest.mock('utils/breakpoints/isTabletView', () => jest.fn(() => true));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

const mockedObserver = {
  observe: jest.fn(),
  unobserve: jest.fn(),
};
global.ResizeObserver = jest.fn(() => mockedObserver);

describe('Photos useContainer hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useContainer));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  describe('checks `onImageClick` method', () => {
    it('should show modal', () => {
      const index = 2;

      act(() => {
        result.current.onImageClick(index)();
      });

      expect(dispatch).toHaveBeenCalledWith(showModal({
        modalType: 'CAMPER_DETAILS_PHOTOS_MODAL',
        modalProps: {
          photos: mockedPhotos,
          activeIndex: index,
        },
      }));
    });

    it('should not show modal', () => {
      const index = 2;

      act(() => {
        result.current.onImageClick(index, CAMPER_PHOTO_DEFAULT)();
      });

      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe('checks `handleResize` method', () => {
    it('should update state', () => {
      let res = null;

      isTabletView.mockReturnValue(false);
      isMobileView.mockReturnValue(false);

      act(() => {
        res = result.current.handleResize();
      });

      expect(res).toBe(true);
    });

    it('should not update state', () => {
      let res = null;

      act(() => {
        res = result.current.handleResize();
      });

      expect(res).toBe(false);
    });
  });

  describe('checks `addResizeObserver` method', () => {
    it('should observe', () => {
      let res = null;

      jest.spyOn(React, 'useRef').mockReturnValue({ current: {} });

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.addResizeObserver();
      });

      expect(res).toBe(true);
    });

    it('should not observe', () => {
      let res = null;

      jest.spyOn(React, 'useRef').mockReturnValue({ current: null });

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.addResizeObserver();
      });

      expect(res).toBe(false);
    });
  });

  describe('checks `removeResizeObserver` method', () => {
    it('should unobserve', () => {
      jest.spyOn(React, 'useRef').mockReturnValue({ current: {} });

      ({ result } = renderHook(useContainer));

      let res = null;

      act(() => {
        res = result.current.removeResizeObserver();
      });

      expect(res).toBe(true);
    });

    it('should not unobserve', () => {
      let res = null;

      jest.spyOn(React, 'useRef').mockReturnValue({ current: null });

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.removeResizeObserver();
      });

      expect(res).toBe(false);
    });
  });
});
