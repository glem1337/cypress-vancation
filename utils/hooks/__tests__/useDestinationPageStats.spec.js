import { act, renderHook } from '@testing-library/react-hooks';
import { dispatch } from '__mocks__/react-redux';

import { searchDestinationFiltersSelector } from 'state/concepts/search-destinations/selectors';
import {
  clearAllFilter as clearAllFilterAction,
  toggleDesktopMapVisibility as toggleDesktopMapVisibilityAction,
} from 'state/concepts/search-destinations/actions';

import useDestinationPageStats from '../useDestinationPageStats';

jest.mock('state/concepts/campervan-rental/selectors', () => ({
  campersSelector: jest.fn(() => [{ id: 1 }]),
}));

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationParamsSelector: jest.fn(() => ({
    dateRange: null,
    location: null,
    locationIntent: null,
  })),
  searchDestinationFiltersSelector: jest.fn(() => ({
    key1: null,
    key2: null,
    uuid: 'uuid',
    isMobileVisible: true,
  })),
  desktopMapVisibilitySelector: jest.fn(() => true),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

describe('useDestinationPageStats hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useDestinationPageStats));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  describe('checks `isAnyFilterApplied` method', () => {
    it('should return false', () => {
      let res = null;

      act(() => {
        res = result.current.isAnyFilterApplied;
      });

      expect(res).toBe(false);
    });

    it('should return true', () => {
      let res = null;

      searchDestinationFiltersSelector.mockReturnValueOnce({ key: true });

      ({ result } = renderHook(useDestinationPageStats));

      act(() => {
        res = result.current.isAnyFilterApplied;
      });

      expect(res).toBe(true);
    });
  });

  it('checks `clearAllFilters` method', () => {
    act(() => {
      result.current.clearAllFilters();
    });

    expect(dispatch).toHaveBeenCalledWith(clearAllFilterAction());
  });

  it('checks `toggleDesktopMapVisibility` method', () => {
    act(() => {
      result.current.toggleDesktopMapVisibility();
    });

    expect(dispatch).toHaveBeenCalledWith(toggleDesktopMapVisibilityAction());
  });
});
