import { act, renderHook } from '@testing-library/react-hooks';

import { dispatch } from '__mocks__/react-redux';
import { setFilterBatchValue, setFilterValue } from 'state/concepts/search-destinations/actions';
import { searchDestinationFiltersSelector } from 'state/concepts/search-destinations/selectors';

import useQuests, { DECREASE_INCREASE_ACTIONS } from '../useQuests';
import mockedFilter from '../__mocks__/filters';

jest.mock('lodash/debounce', () => fn => fn);

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationFiltersSelector: jest.fn(() => mockedFilter),
}));

describe('useQuests hook', () => {
  let result = null;

  const props = {
    toggleOpenedState: jest.fn(() => jest.fn()),
  };

  beforeEach(() => {
    searchDestinationFiltersSelector.mockReturnValue(mockedFilter);

    ({ result } = renderHook(() => useQuests(props)));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `clearFilters` method', () => {
    act(() => {
      result.current.clearFilters();
    });

    expect(dispatch).toHaveBeenCalledWith(setFilterBatchValue([
      {
        name: 'sleeps',
        value: null,
      },
      {
        name: 'seats',
        value: null,
      },
    ]));

    expect(props.toggleOpenedState).toHaveBeenCalled();
  });

  it('checks `applyFilters` method', () => {
    let sleeps = null;
    let seats = null;

    act(() => {
      ({ sleeps, seats } = result.current.applyFilters());
    });

    expect(dispatch).toHaveBeenCalledWith(setFilterBatchValue([
      {
        name: 'sleeps',
        value: sleeps,
      },
      {
        name: 'seats',
        value: seats,
      },
    ]));

    expect(props.toggleOpenedState).toHaveBeenCalled();
  });

  describe('checks `onIncreaseDecrease` method', () => {
    it('should increase', () => {
      act(() => {
        result.current.onIncreaseDecrease('sleeps', DECREASE_INCREASE_ACTIONS.INCREASE)();
      });

      expect(result.current.filters.sleeps).toBe(1);
    });

    it('should decrease', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        sleeps: 3,
      });

      ({ result } = renderHook(() => useQuests(props)));

      act(() => {
        result.current.onIncreaseDecrease('sleeps', DECREASE_INCREASE_ACTIONS.DECREASE)();
      });

      expect(result.current.filters.sleeps).toBe(2);
    });

    it('should return false', () => {
      let res = null;

      act(() => {
        res = result.current.onIncreaseDecrease('sleeps', DECREASE_INCREASE_ACTIONS.DECREASE)();
      });

      expect(res).toBe(false);
    });

    it('with immediate update when is not 0', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        sleeps: 3,
      });

      ({ result } = renderHook(() => useQuests({
        ...props,
        immediatelyApply: true,
      })));

      act(() => {
        result.current.onIncreaseDecrease('sleeps', DECREASE_INCREASE_ACTIONS.DECREASE)();
      });

      expect(dispatch).toHaveBeenCalledWith(setFilterValue({
        name: 'sleeps',
        value: 2,
      }));
    });

    it('with immediate update when is 0', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        sleeps: 1,
      });

      ({ result } = renderHook(() => useQuests({
        ...props,
        immediatelyApply: true,
      })));

      act(() => {
        result.current.onIncreaseDecrease('sleeps', DECREASE_INCREASE_ACTIONS.DECREASE)();
      });

      expect(dispatch).toHaveBeenCalledWith(setFilterValue({
        name: 'sleeps',
        value: null,
      }));
    });
  });

  describe('checks `getBadge` method', () => {
    it('should return 0', () => {
      let res = null;

      act(() => {
        res = result.current.badge;
      });

      expect(res).toBe(0);
    });

    it('should return 1', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        sleeps: 3,
      });

      ({ result } = renderHook(() => useQuests(props)));

      let res = null;

      act(() => {
        res = result.current.badge;
      });

      expect(res).toBe(1);
    });

    it('should return 2', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        sleeps: 3,
        seats: 3,
      });

      ({ result } = renderHook(() => useQuests(props)));

      let res = null;

      act(() => {
        res = result.current.badge;
      });

      expect(res).toBe(2);
    });
  });

  it('checks `renderQuestsWidget` method', () => {
    let res = null;

    act(() => {
      res = result.current.renderQuestsWidget();
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

      ({ result } = renderHook(() => useQuests(props)));

      let res = null;

      act(() => {
        res = result.current.checkFilterUpdates();
      });

      expect(res).toBe(true);
    });
  });
});
