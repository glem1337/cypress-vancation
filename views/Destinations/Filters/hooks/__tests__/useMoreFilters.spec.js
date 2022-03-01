import { act, renderHook } from '@testing-library/react-hooks';

import { FILTERS } from 'constants/searchDestinations';
import { dispatch } from '__mocks__/react-redux';
import { setFilterValue, setFilterBatchValue } from 'state/concepts/search-destinations/actions';
import { searchDestinationFiltersSelector } from 'state/concepts/search-destinations/selectors';

import useMoreFilters from '../useMoreFilters';
import mockedFilter from '../__mocks__/filters';

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationFiltersSelector: jest.fn(() => mockedFilter),
}));

describe('useMoreFilters hook', () => {
  let result = null;

  const props = {
    toggleOpenedState: jest.fn(() => jest.fn()),
  };

  beforeEach(() => {
    ({ result } = renderHook(() => useMoreFilters(props)));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `detectInitialValues` method', () => {
    let res = null;

    act(() => {
      res = result.current.clearFilters();
    });

    expect(res).toMatchSnapshot();
  });

  it('checks `clearFilters` method', () => {
    let array = null;

    act(() => {
      array = result.current.clearFilters();
    });

    expect(array).toMatchSnapshot();

    expect(dispatch).toHaveBeenCalledWith(setFilterBatchValue(array));

    expect(props.toggleOpenedState).toHaveBeenCalled();
  });

  it('checks `applyFilters` method', () => {
    let array = null;

    act(() => {
      array = result.current.applyFilters();
    });

    expect(array).toMatchSnapshot();

    expect(dispatch).toHaveBeenCalledWith(setFilterBatchValue(array));

    expect(props.toggleOpenedState).toHaveBeenCalled();
  });

  describe('checks `onChangeRating` method', () => {
    const event = {
      target: {
        value: '123',
      },
    };

    it('without immediate update', () => {
      act(() => {
        result.current.onChangeRating(event);
      });

      expect(result.current.filters).toEqual({
        ...result.current.filters,
        rating: '123',
      });

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('with immediate update', () => {
      ({ result } = renderHook(() => useMoreFilters({
        ...props,
        immediatelyApply: true,
      })));

      act(() => {
        result.current.onChangeRating(event);
      });

      expect(result.current.filters).toEqual({
        ...result.current.filters,
        rating: '123',
      });

      expect(dispatch).toHaveBeenCalledWith(setFilterValue({
        name: 'rating',
        value: 123,
      }));
    });

    it('with immediate update and all filter', () => {
      const specificEvent = {
        target: {
          value: FILTERS.RATING.ALL,
        },
      };

      ({ result } = renderHook(() => useMoreFilters({
        ...props,
        immediatelyApply: true,
      })));

      act(() => {
        result.current.onChangeRating(specificEvent);
      });

      expect(result.current.filters).toEqual({
        ...result.current.filters,
        rating: FILTERS.RATING.ALL,
      });

      expect(dispatch).toHaveBeenCalledWith(setFilterValue({
        name: 'rating',
        value: null,
      }));
    });
  });

  describe('checks `onChangeRules` method', () => {
    const ruleName = 'alowPets';

    const event = {
      target: {
        checked: true,
      },
    };

    it('without immediate update', () => {
      act(() => {
        result.current.onChangeRules(ruleName)(event);
      });

      expect(result.current.filters).toEqual({
        ...result.current.filters,
        alowPets: true,
      });

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('with immediate update and checked', () => {
      ({ result } = renderHook(() => useMoreFilters({
        ...props,
        immediatelyApply: true,
      })));

      act(() => {
        result.current.onChangeRules(ruleName)(event);
      });

      expect(result.current.filters).toEqual({
        ...result.current.filters,
        alowPets: true,
      });

      expect(dispatch).toHaveBeenCalledWith(setFilterValue({
        name: ruleName,
        value: true,
      }));
    });

    it('with immediate update and unchecked', () => {
      const specificEvent = {
        target: {
          checked: false,
        },
      };

      ({ result } = renderHook(() => useMoreFilters({
        ...props,
        immediatelyApply: true,
      })));

      act(() => {
        result.current.onChangeRules(ruleName)(specificEvent);
      });

      expect(result.current.filters).toEqual({
        ...result.current.filters,
        alowPets: false,
      });

      expect(dispatch).toHaveBeenCalledWith(setFilterValue({
        name: ruleName,
        value: null,
      }));
    });
  });

  describe('checks `onInsideHeightChange` method', () => {
    const value = { name: 'top_height' };

    it('without immediate update and when does not exist', () => {
      act(() => {
        result.current.onInsideHeightChange(value)();
      });

      expect(result.current.filters).toEqual({
        ...result.current.filters,
        insideHeight: [{ name: 'top_height' }],
      });

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('without immediate update and when exists', () => {
      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          insideHeight: [{ name: 'top_height' }],
        });
      });

      act(() => {
        result.current.onInsideHeightChange(value)();
      });

      expect(result.current.filters).toEqual({
        ...result.current.filters,
        insideHeight: [],
      });

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('with immediate update and when does not exist', () => {
      ({ result } = renderHook(() => useMoreFilters({
        ...props,
        immediatelyApply: true,
      })));

      act(() => {
        result.current.onInsideHeightChange(value)();
      });

      expect(result.current.filters).toEqual({
        ...result.current.filters,
        insideHeight: [value],
      });

      expect(dispatch).toHaveBeenCalledWith(setFilterValue({
        name: 'insideHeight',
        value: [value],
      }));
    });
  });

  describe('checks `onStandardAmenityChange` method', () => {
    const amenity = 'test';

    it('without immediate update and when does not exist', () => {
      act(() => {
        result.current.onStandardAmenityChange(amenity)();
      });

      expect(result.current.filters).toEqual({
        ...result.current.filters,
        standardAmenities: [amenity],
      });

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('without immediate update and when exists', () => {
      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          standardAmenities: [amenity],
        });
      });

      act(() => {
        result.current.onStandardAmenityChange(amenity)();
      });

      expect(result.current.filters).toEqual({
        ...result.current.filters,
        standardAmenities: [],
      });

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('with immediate update and when does not exist', () => {
      ({ result } = renderHook(() => useMoreFilters({
        ...props,
        immediatelyApply: true,
      })));

      act(() => {
        result.current.onStandardAmenityChange(amenity)();
      });

      expect(result.current.filters).toEqual({
        ...result.current.filters,
        standardAmenities: [amenity],
      });

      expect(dispatch).toHaveBeenCalledWith(setFilterValue({
        name: 'standardAmenities',
        value: [amenity],
      }));
    });
  });

  describe('checks `onLuxuryAmenityChange` method', () => {
    const amenity = 'test';

    it('without immediate update and when does not exist', () => {
      act(() => {
        result.current.onLuxuryAmenityChange(amenity)();
      });

      expect(result.current.filters).toEqual({
        ...result.current.filters,
        luxuryAmenities: [amenity],
      });

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('without immediate update and when exists', () => {
      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          luxuryAmenities: [amenity],
        });
      });

      act(() => {
        result.current.onLuxuryAmenityChange(amenity)();
      });

      expect(result.current.filters).toEqual({
        ...result.current.filters,
        luxuryAmenities: [],
      });

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('with immediate update and when does not exist', () => {
      ({ result } = renderHook(() => useMoreFilters({
        ...props,
        immediatelyApply: true,
      })));

      act(() => {
        result.current.onLuxuryAmenityChange(amenity)();
      });

      expect(result.current.filters).toEqual({
        ...result.current.filters,
        luxuryAmenities: [amenity],
      });

      expect(dispatch).toHaveBeenCalledWith(setFilterValue({
        name: 'luxuryAmenities',
        value: [amenity],
      }));
    });
  });

  describe('checks `isStandardAmenityChecked` method', () => {
    it('should return false', () => {
      let res = null;

      act(() => {
        res = result.current.isStandardAmenityChecked('test');
      });

      expect(res).toBe(false);
    });

    it('should return true', () => {
      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          standardAmenities: ['test'],
        });
      });

      let res = null;

      act(() => {
        res = result.current.isStandardAmenityChecked('test');
      });

      expect(res).toBe(true);
    });
  });

  describe('checks `isLuxuryAmenityChecked` method', () => {
    it('should return false', () => {
      let res = null;

      act(() => {
        res = result.current.isLuxuryAmenityChecked('test');
      });

      expect(res).toBe(false);
    });

    it('should return true', () => {
      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          luxuryAmenities: ['test'],
        });
      });

      let res = null;

      act(() => {
        res = result.current.isLuxuryAmenityChecked('test');
      });

      expect(res).toBe(true);
    });
  });

  describe('checks `isInsideHeightChecked` method', () => {
    it('should return false', () => {
      let res = null;

      act(() => {
        res = result.current.isInsideHeightChecked('test');
      });

      expect(res).toBe(false);
    });

    it('should return true', () => {
      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          insideHeight: ['test'],
        });
      });

      let res = null;

      act(() => {
        res = result.current.isInsideHeightChecked('test');
      });

      expect(res).toBe(true);
    });
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
      searchDestinationFiltersSelector.mockReturnValueOnce({
        ...mockedFilter,
        rating: 123,
      });

      ({ result } = renderHook(() => useMoreFilters(props)));

      let res = null;

      act(() => {
        res = result.current.isAnyFilterApplied;
      });

      expect(res).toBe(true);
    });
  });

  it('checks `renderStandardAmenities` method', () => {
    let res = null;

    act(() => {
      res = result.current.renderStandardAmenities();
    });

    expect(res).toMatchSnapshot();
  });

  it('checks `renderLuxuryAmenities` method', () => {
    let res = null;

    act(() => {
      res = result.current.renderLuxuryAmenities();
    });

    expect(res).toMatchSnapshot();
  });

  it('checks `renderInsideHeight` method', () => {
    let res = null;

    act(() => {
      res = result.current.renderInsideHeight();
    });

    expect(res).toMatchSnapshot();
  });

  it('checks `renderRules` method', () => {
    let res = null;

    act(() => {
      res = result.current.renderRules();
    });

    expect(res).toMatchSnapshot();
  });

  describe('checks `renderRating` method', () => {
    it('for desktop', () => {
      let res = null;

      act(() => {
        res = result.current.renderRating();
      });

      expect(res).toMatchSnapshot();
    });

    it('for mobile', () => {
      let res = null;

      act(() => {
        res = result.current.renderRating({ isMobile: true });
      });

      expect(res).toMatchSnapshot();
    });
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

      ({ result } = renderHook(() => useMoreFilters(props)));

      let res = null;

      act(() => {
        res = result.current.checkFilterUpdates();
      });

      expect(res).toBe(true);
    });
  });

  describe('checks `countFilterApplied` method', () => {
    it('should return 0', () => {
      let res = null;

      act(() => {
        res = result.current.countFilterApplied;
      });

      expect(res).toBe(0);
    });

    it('should return 5', () => {
      let res = null;

      searchDestinationFiltersSelector.mockReturnValueOnce({
        ...mockedFilter,
        standardAmenities: ['a', 'b', 'c'],
        rating: 78,
        allowSmoking: true,
      });

      ({ result } = renderHook(() => useMoreFilters(props)));

      act(() => {
        res = result.current.countFilterApplied;
      });

      expect(res).toBe(5);
    });
  });
});
