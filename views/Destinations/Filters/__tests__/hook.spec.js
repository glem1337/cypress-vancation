import { act, renderHook } from '@testing-library/react-hooks';

import { dispatch } from '__mocks__/react-redux';
import { fetchVehicleTypes } from 'state/concepts/camper/actions';
import { fetchCampers } from 'state/concepts/campervan-rental/actions';

import useContainer from '../hook';

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationFiltersSelector: jest.fn(() => ({ price: 123, uuid: 1 })),
}));

describe('Filters useContainer hook', () => {
  Object.defineProperty(
    document,
    'querySelector',
    { value: jest.fn() },
  );

  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(() => useContainer()));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('dispatch vehicle types', () => {
    ({ result } = renderHook(() => useContainer()));

    expect(dispatch).toHaveBeenCalledWith(fetchVehicleTypes());
  });

  it('when filters were updated', () => {
    ({ result } = renderHook(() => useContainer()));

    expect(dispatch).toHaveBeenCalledWith(fetchCampers());
  });

  describe('checks `detectFetchCampers` method', () => {
    it('should return true', () => {
      let res = null;

      act(() => {
        res = result.current.detectFetchCampers({ price: 123, uuid: 1 }, { price: 1233, uuid: 1 });
      });

      expect(res).toBe(true);
    });

    it('should return false', () => {
      let res = null;

      act(() => {
        res = result.current.detectFetchCampers({ price: 123, uuid: 1 }, { price: 123, uuid: 1 });
      });

      expect(res).toBe(false);
    });
  });
});
