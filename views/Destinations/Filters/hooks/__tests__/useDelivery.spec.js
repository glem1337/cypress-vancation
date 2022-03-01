import { act, renderHook } from '@testing-library/react-hooks';

import { dispatch } from '__mocks__/react-redux';
import { setFilterValue } from 'state/concepts/search-destinations/actions';
import { searchDestinationFiltersSelector } from 'state/concepts/search-destinations/selectors';

import useDelivery from '../useDelivery';
import mockedFilter from '../__mocks__/filters';

jest.mock('lodash/debounce', () => fn => fn);

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationFiltersSelector: jest.fn(() => mockedFilter),
}));

describe('useDelivery hook', () => {
  let result = null;

  const props = {
    toggleOpenedState: jest.fn(() => jest.fn()),
  };

  beforeEach(() => {
    ({ result } = renderHook(() => useDelivery(props)));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `clearFilters` method', () => {
    act(() => {
      result.current.clearFilters();
    });

    expect(dispatch).toHaveBeenCalledWith(setFilterValue({
      name: 'delivery',
      value: null,
    }));

    expect(props.toggleOpenedState).toHaveBeenCalled();
  });

  it('checks `applyFilters` method', () => {
    act(() => {
      result.current.applyFilters();
    });

    expect(dispatch).toHaveBeenCalledWith(setFilterValue({
      name: 'delivery',
      value: result.current.filter,
    }));

    expect(props.toggleOpenedState).toHaveBeenCalled();
  });

  describe('checks `onChangeHandler` method', () => {
    it('without immediate update', () => {
      const newValue = 'test';

      act(() => {
        result.current.onChangeHandler(newValue)();
      });

      expect(result.current.filter).toBe(newValue);

      expect(dispatch).not.toHaveBeenCalledWith(setFilterValue({
        name: 'delivery',
        value: newValue,
      }));
    });

    it('with immediate update', () => {
      const newValue = 'test 2';

      ({ result } = renderHook(() => useDelivery({
        ...props,
        immediatelyApply: true,
      })));

      act(() => {
        result.current.onChangeHandler(newValue)();
      });

      expect(result.current.filter).toBe(newValue);

      expect(dispatch).toHaveBeenCalledWith(setFilterValue({
        name: 'delivery',
        value: newValue,
      }));
    });
  });

  it('checks `renderDeliveryWidget` method', () => {
    let res = null;

    act(() => {
      res = result.current.renderDeliveryWidget();
    });

    expect(res).toMatchSnapshot();
  });

  describe('checks `checkFilterUpdates` method', () => {
    it('should return false', () => {
      let res = null;

      act(() => {
        res = result.current.checkFilterUpdates();
      });

      expect(res).toBe(false);
    });

    it('should return true', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        uuid: '213218n-vdjiks',
      });

      ({ result } = renderHook(() => useDelivery(props)));

      let res = null;

      act(() => {
        res = result.current.checkFilterUpdates();
      });

      expect(res).toBe(true);
    });
  });
});
