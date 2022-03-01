import { act, renderHook } from '@testing-library/react-hooks';

import { dispatch } from '__mocks__/react-redux';
import { setFilterBatchValue } from 'state/concepts/search-destinations/actions';
import { FILTERS } from 'constants/searchDestinations';
import { searchDestinationFiltersSelector } from 'state/concepts/search-destinations/selectors';

import usePrice from '../usePrice';
import mockedFilter from '../__mocks__/filters';

jest.mock('lodash/debounce', () => fn => fn);

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationFiltersSelector: jest.fn(() => mockedFilter),
}));

const mockedHookData = {
  tipFormatter: jest.fn(),
};
jest.mock('views/Destinations/Filters/hooks/useSharedValues', () => jest.fn(() => mockedHookData));

describe('usePrice hook', () => {
  let result = null;

  const props = {
    toggleOpenedState: jest.fn(() => jest.fn()),
  };

  beforeEach(() => {
    searchDestinationFiltersSelector.mockReturnValue(mockedFilter);

    ({ result } = renderHook(() => usePrice(props)));

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
        name: 'priceStart',
        value: null,
      },
      {
        name: 'priceEnd',
        value: null,
      },
    ]));

    expect(props.toggleOpenedState).toHaveBeenCalled();
  });

  it('checks `applyFilters` method', () => {
    let priceStart = null;
    let priceEnd = null;

    act(() => {
      ({ priceStart, priceEnd } = result.current.applyFilters());
    });

    expect(dispatch).toHaveBeenCalledWith(setFilterBatchValue([
      {
        name: 'priceStart',
        value: priceStart,
      },
      {
        name: 'priceEnd',
        value: priceEnd,
      },
    ]));

    expect(props.toggleOpenedState).toHaveBeenCalled();
  });

  describe('checks `prepareInitialValue` method', () => {
    it('for start price when null', () => {
      let res = null;

      act(() => {
        res = result.current.prepareInitialValue('priceStart');
      });

      expect(res).toBe(`$${FILTERS.PRICE_BOUNDARIES.MIN}`);
    });

    it('for end price when null', () => {
      let res = null;

      act(() => {
        res = result.current.prepareInitialValue('priceEnd');
      });

      expect(res).toBe(`$${FILTERS.PRICE_BOUNDARIES.MAX}+`);
    });

    it('for start price when equals max', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        priceStart: FILTERS.PRICE_BOUNDARIES.MAX,
      });

      ({ result } = renderHook(() => usePrice(props)));

      let res = null;

      act(() => {
        res = result.current.prepareInitialValue('priceStart');
      });

      expect(res).toBe(`$${FILTERS.PRICE_BOUNDARIES.MAX}+`);
    });

    it('for end price when equals max', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        priceEnd: FILTERS.PRICE_BOUNDARIES.MAX,
      });

      ({ result } = renderHook(() => usePrice(props)));

      let res = null;

      act(() => {
        res = result.current.prepareInitialValue('priceEnd');
      });

      expect(res).toBe(`$${FILTERS.PRICE_BOUNDARIES.MAX}+`);
    });

    it('for end price when does not equals max', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        priceEnd: 111,
      });

      ({ result } = renderHook(() => usePrice(props)));

      let res = null;

      act(() => {
        res = result.current.prepareInitialValue('priceEnd');
      });

      expect(res).toBe(`$${111}`);
    });
  });

  describe('checks `onChangePriceBySlider` method', () => {
    it('for not boundaries', () => {
      const range = [12, 33];

      act(() => {
        result.current.onChangePriceBySlider(range);
      });

      expect(result.current.filters).toEqual({
        priceStart: '$12',
        priceEnd: '$33',
      });
    });

    it('for boundaries', () => {
      const range = [
        FILTERS.PRICE_BOUNDARIES.MAX,
        FILTERS.PRICE_BOUNDARIES.MAX,
      ];

      act(() => {
        result.current.onChangePriceBySlider(range);
      });

      expect(result.current.filters).toEqual({
        priceStart: `$${FILTERS.PRICE_BOUNDARIES.MAX}+`,
        priceEnd: `$${FILTERS.PRICE_BOUNDARIES.MAX}+`,
      });
    });

    it('with immediate update', () => {
      ({ result } = renderHook(() => usePrice({
        ...props,
        immediatelyApply: true,
      })));

      const range = [12, 33];

      act(() => {
        result.current.onChangePriceBySlider(range);
      });

      expect(result.current.filters).toEqual({
        priceStart: '$12',
        priceEnd: '$33',
      });

      expect(dispatch).toHaveBeenCalledWith(setFilterBatchValue([
        {
          name: 'priceStart',
          value: 12,
        },
        {
          name: 'priceEnd',
          value: 33,
        },
      ]));
    });
  });

  describe('checks `onChangePrice` method', () => {
    it('for not boundaries', () => {
      const event = {
        target: {
          value: '123',
        },
      };

      act(() => {
        result.current.onChangePrice('priceStart')(event);
      });

      expect(result.current.filters).toEqual({
        ...result.current.filters,
        priceStart: '$123',
      });
    });

    it('for boundaries', () => {
      const event = {
        target: {
          value: `${FILTERS.PRICE_BOUNDARIES.MAX + 1}`,
        },
      };

      act(() => {
        result.current.onChangePrice('priceStart')(event);
      });

      expect(result.current.filters).toEqual({
        ...result.current.filters,
        priceStart: `$${FILTERS.PRICE_BOUNDARIES.MAX}+`,
      });
    });

    it('with immediate update', () => {
      const event = {
        target: {
          value: '123',
        },
      };

      ({ result } = renderHook(() => usePrice({
        ...props,
        immediatelyApply: true,
      })));

      act(() => {
        result.current.onChangePrice('priceStart')(event);
      });

      expect(dispatch).toHaveBeenCalledWith(setFilterBatchValue([
        {
          name: 'priceStart',
          value: 123,
        },
        {
          name: 'priceEnd',
          value: 500,
        },
      ]));
    });
  });

  describe('checks `rangeValue` method', () => {
    it('should return zeros', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        priceStart: 'test',
        priceEnd: 'test',
      });

      ({ result } = renderHook(() => usePrice(props)));

      let res = 0;

      act(() => {
        res = result.current.rangeValue;
      });

      expect(res).toEqual([0, 0]);
    });

    it('should boundaries', () => {
      act(() => {
        result.current.setFilters({
          priceStart: `${FILTERS.PRICE_BOUNDARIES.MAX + 100}`,
          priceEnd: `${FILTERS.PRICE_BOUNDARIES.MAX + 100}`,
        });
      });

      let res = 0;

      act(() => {
        res = result.current.rangeValue;
      });

      expect(res).toEqual([FILTERS.PRICE_BOUNDARIES.MAX, FILTERS.PRICE_BOUNDARIES.MAX]);
    });

    it('should simple values', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        priceStart: 1,
        priceEnd: 2,
      });

      ({ result } = renderHook(() => usePrice(props)));

      let res = 0;

      act(() => {
        res = result.current.rangeValue;
      });

      expect(res).toEqual([1, 2]);
    });
  });

  describe('checks `onBlurHandler` method', () => {
    it('should return min for priceStart', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        priceStart: 'test',
        priceEnd: 'test',
      });

      ({ result } = renderHook(() => usePrice(props)));

      act(() => {
        result.current.onBlurHandler('priceStart')();
      });

      expect(result.current.filters.priceStart).toBe(`$${FILTERS.PRICE_BOUNDARIES.MIN}`);
    });

    it('should return max for priceEnd', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        priceStart: 'test',
        priceEnd: 'test',
      });

      ({ result } = renderHook(() => usePrice(props)));

      act(() => {
        result.current.onBlurHandler('priceEnd')();
      });

      expect(result.current.filters.priceEnd).toBe(`$${FILTERS.PRICE_BOUNDARIES.MAX}+`);
    });

    it('should return max for big value', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        priceStart: 'test',
        priceEnd: 10000,
      });

      ({ result } = renderHook(() => usePrice(props)));

      act(() => {
        result.current.onBlurHandler('priceEnd')();
      });

      expect(result.current.filters.priceEnd).toBe(`$${FILTERS.PRICE_BOUNDARIES.MAX}+`);
    });
  });

  describe('checks `getPriceString` method', () => {
    it('should return null', () => {
      let res = null;

      act(() => {
        res = result.current.priceString;
      });

      expect(res).toBe(null);
    });

    it('should return null', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        priceStart: FILTERS.PRICE_BOUNDARIES.MIN,
        priceEnd: FILTERS.PRICE_BOUNDARIES.MIN,
      });

      ({ result } = renderHook(() => usePrice(props)));

      let res = null;

      act(() => {
        res = result.current.priceString;
      });

      expect(res).toBe(null);
    });

    it('should return null', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        priceStart: FILTERS.PRICE_BOUNDARIES.MIN,
        priceEnd: FILTERS.PRICE_BOUNDARIES.MAX,
      });

      ({ result } = renderHook(() => usePrice(props)));

      let res = null;

      act(() => {
        res = result.current.priceString;
      });

      expect(res).toBe(null);
    });

    it('should return max single value', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        priceStart: FILTERS.PRICE_BOUNDARIES.MAX,
        priceEnd: FILTERS.PRICE_BOUNDARIES.MAX,
      });

      ({ result } = renderHook(() => usePrice(props)));

      let res = null;

      act(() => {
        res = result.current.priceString;
      });

      expect(res).toBe('$500+');
    });

    it('should return value when start price more than max', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        priceStart: FILTERS.PRICE_BOUNDARIES.MAX + 1,
        priceEnd: 111,
      });

      ({ result } = renderHook(() => usePrice(props)));

      let res = null;

      act(() => {
        res = result.current.priceString;
      });

      expect(res).toBe('$500+ - $111');
    });

    it('should return max value', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        priceStart: FILTERS.PRICE_BOUNDARIES.MAX + 1,
        priceEnd: FILTERS.PRICE_BOUNDARIES.MAX + 1,
      });

      ({ result } = renderHook(() => usePrice(props)));

      let res = null;

      act(() => {
        res = result.current.priceString;
      });

      expect(res).toBe(`$${FILTERS.PRICE_BOUNDARIES.MAX}+`);
    });

    it('should return max value', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        priceStart: FILTERS.PRICE_BOUNDARIES.MAX,
        priceEnd: FILTERS.PRICE_BOUNDARIES.MAX,
      });

      ({ result } = renderHook(() => usePrice(props)));

      let res = null;

      act(() => {
        res = result.current.priceString;
      });

      expect(res).toBe(`$${FILTERS.PRICE_BOUNDARIES.MAX}+`);
    });

    it('should return range string', () => {
      searchDestinationFiltersSelector.mockReturnValue({
        ...mockedFilter,
        priceStart: 11,
        priceEnd: 22,
      });

      ({ result } = renderHook(() => usePrice(props)));

      let res = null;

      act(() => {
        res = result.current.priceString;
      });

      expect(res).toBe('$11 - $22');
    });
  });

  it('checks `renderPriceWidget` method', () => {
    let res = null;

    act(() => {
      res = result.current.renderPriceWidget();
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

      ({ result } = renderHook(() => usePrice(props)));

      let res = null;

      act(() => {
        res = result.current.checkFilterUpdates();
      });

      expect(res).toBe(true);
    });
  });
});
