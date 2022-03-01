import { act } from '@testing-library/react-hooks';

import renderHookWithProviders from 'utils/testHelpers/renderHookWithProviders';

import useContainer from '../useGeoLocation';

describe('useGeoLocation hook', () => {
  global.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  };

  const props = {
    location: 'location',
    state: 'state',
  };

  let result = null;

  beforeEach(() => {
    ({ result } = renderHookWithProviders(() => useContainer(props)));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `currentPositionSuccess` method', () => {
    const position = {
      coords: {
        latitude: 1,
        longitude: 1,
      },
    };

    act(() => {
      result.current.currentPositionSuccess(position);
    });

    expect(result.current.coords).toEqual(position.coords);
  });

  describe('checks `currentPositionError` method', () => {
    it('with not handled error', () => {
      let retVal = null;

      act(() => {
        retVal = result.current.currentPositionError({});
      });

      expect(retVal).toBe(true);
    });

    it('with handled error', () => {
      let retVal = null;

      act(() => {
        retVal = result.current.currentPositionError({ code: 1 });
      });

      expect(retVal).toBe(false);
    });
  });
});
