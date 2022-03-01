import { act, renderHook } from '@testing-library/react-hooks';

import { clearAllFilter as clearAllFilterAction } from 'state/concepts/search-destinations/actions';
import { dispatch } from '__mocks__/react-redux';
import { searchDestinationFiltersSelector } from 'state/concepts/search-destinations/selectors';

import useSharedValues from '../useSharedValues';
import mockedFilter from '../__mocks__/filters';

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationFiltersSelector: jest.fn(() => mockedFilter),
}));

jest.mock('state/concepts/campervan-rental/selectors', () => ({
  campersTotalSelector: jest.fn(() => 22),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

describe('useSharedValues hook', () => {
  let result = null;

  beforeEach(() => {
    searchDestinationFiltersSelector.mockReturnValue(mockedFilter);

    ({ result } = renderHook(useSharedValues));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  describe('checks `tipFormatter` method', () => {
    it('should return value', () => {
      let res = null;

      act(() => {
        res = result.current.tipFormatter(2)(1);
      });

      expect(res).toBe('$1');
    });

    it('should return max value', () => {
      let res = null;

      act(() => {
        res = result.current.tipFormatter(2)(3);
      });

      expect(res).toBe('$2+');
    });
  });

  it('checks `getPopupContainer` method', () => {
    let res = null;

    act(() => {
      res = result.current.getPopupContainer();
    });

    expect(res).toMatchSnapshot();
  });

  it('checks `clearAllFilters` method', () => {
    act(() => {
      result.current.clearAllFilters();
    });

    expect(dispatch).toHaveBeenCalledWith(clearAllFilterAction());
  });
});
