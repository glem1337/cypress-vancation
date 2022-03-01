import { act, renderHook } from '@testing-library/react-hooks';

import { dispatch } from '__mocks__/react-redux';
import { setFilterValue } from 'state/concepts/search-destinations/actions';
import { searchDestinationFiltersSelector } from 'state/concepts/search-destinations/selectors';

import useVehicles from '../useVehicles';
import mockedFilter from '../__mocks__/filters';
import mockedVehicles from '../__mocks__/vehicles';

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationFiltersSelector: jest.fn(() => mockedFilter),
}));

jest.mock('state/concepts/campervan-rental/selectors', () => ({
  campersTotalSelector: jest.fn(() => 22),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  vehicleTypeSelector: jest.fn(() => mockedVehicles),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

jest.mock('lodash/debounce', () => fn => fn);

describe('useVehicles hook', () => {
  let result = null;

  const props = {
    toggleOpenedState: jest.fn(() => jest.fn()),
  };

  beforeEach(() => {
    searchDestinationFiltersSelector.mockReturnValue(mockedFilter);

    ({ result } = renderHook(() => useVehicles(props)));

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
      name: 'vehicles',
      value: null,
    }));

    expect(props.toggleOpenedState).toHaveBeenCalled();
  });

  it('checks `applyFilters` method', () => {
    let filters = null;

    act(() => {
     filters = result.current.applyFilters();
    });

    expect(dispatch).toHaveBeenCalledWith(setFilterValue({
      name: 'vehicles',
      value: filters,
    }));

    expect(props.toggleOpenedState).toHaveBeenCalled();
  });

  describe('checks `onChangeHandler` method', () => {
    it('should add array item', () => {
      act(() => {
        result.current.onChangeHandler('test')();
      });

      expect(result.current.filters).toEqual(['test']);
    });

    it('should remove array item', () => {
      act(() => {
        result.current.setFilters(['test']);
      });

      act(() => {
        result.current.onChangeHandler('test')();
      });

      expect(result.current.filters).toEqual([]);
    });

    it('with immediate update', () => {
      ({ result } = renderHook(() => useVehicles({
        ...props,
        immediatelyApply: true,
      })));

      act(() => {
        result.current.onChangeHandler('test')();
      });

      expect(dispatch).toHaveBeenCalledWith(setFilterValue({
        name: 'vehicles',
        value: ['test'],
      }));
    });
  });

  describe('checks `isChecked` method', () => {
    it('should return false', () => {
      let res = null;

      act(() => {
        res = result.current.isChecked('test');
      });

      expect(res).toBe(false);
    });

    it('should return true', () => {
      act(() => {
        result.current.setFilters(['test']);
      });

      let res = null;

      act(() => {
        res = result.current.isChecked('test');
      });

      expect(res).toBe(true);
    });
  });

  it('checks `renderVehiclesWidget` method', () => {
    let res = null;

    act(() => {
      res = result.current.renderVehiclesWidget();
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

      ({ result } = renderHook(() => useVehicles(props)));

      let res = null;

      act(() => {
        res = result.current.checkFilterUpdates();
      });

      expect(res).toBe(true);
    });
  });
});
