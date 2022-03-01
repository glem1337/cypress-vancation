import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { LANDING_TYPE } from 'constants/campervanRentals';
import mockedDestinations from 'utils/hooks/__mocks__/destinations';
import { createCampervanRentalRoute } from 'utils/createRouteHelper';
import isMobileView from 'utils/breakpoints/isMobileView';
import { dispatch } from '__mocks__/react-redux';
import { fetchNearbyDestinations } from 'state/concepts/campervan-rental/actions';
import usePrevious from 'utils/hooks/usePrevious';

import useNearbyDestinations from '../useNearbyDestinations';

const mockedLocation = {
  id: 1,
  latitude: 1,
  longitude: 2,
};
jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationParamsSelector: jest.fn(() => ({
    dateRange: null,
    location: mockedLocation,
    locationIntent: mockedLocation,
  })),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('utils/hooks/usePrevious', () => jest.fn(() => ({})));

jest.mock('utils/breakpoints/isMobileView', () => jest.fn(() => false));

jest.mock('state/concepts/campervan-rental/selectors', () => ({
  nearbyDestinationsSelector: jest.fn(() => mockedDestinations),
}));

const mockedSwiperRef = {
  current: {
    swiper: {
      slidePrev: jest.fn(),
      slideNext: jest.fn(),
      update: jest.fn(),
    },
  },
};
jest.mock('react', () => {
  const originReact = jest.requireActual('react');

  return {
    ...originReact,
    useRef: jest.fn(() => mockedSwiperRef),
  };
});

describe('useNearbyDestinations hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useNearbyDestinations));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  describe('checks `moveLeft` method', () => {
    it('should move', () => {
      let res = null;

      act(() => {
        res = result.current.moveLeft();
      });

      expect(mockedSwiperRef.current.swiper.slidePrev).toHaveBeenCalled();
      expect(res).toBe(true);
    });

    it('should not move', () => {
      React.useRef
        .mockReturnValueOnce({})
        .mockReturnValueOnce({});

      ({ result } = renderHook(useNearbyDestinations));

      let res = null;

      act(() => {
        res = result.current.moveLeft();
      });

      expect(res).toBe(false);
    });
  });

  describe('checks `moveRight` method', () => {
    it('should move', () => {
      let res = null;

      act(() => {
        res = result.current.moveRight();
      });

      expect(mockedSwiperRef.current.swiper.slideNext).toHaveBeenCalled();
      expect(res).toBe(true);
    });

    it('should not move', () => {
      React.useRef
        .mockReturnValueOnce({})
        .mockReturnValueOnce({});

      ({ result } = renderHook(useNearbyDestinations));

      let res = null;

      act(() => {
        res = result.current.moveRight();
      });

      expect(res).toBe(false);
    });
  });

  describe('checks `constructDestinationName` method', () => {
    it('for state', () => {
      let res = null;

      act(() => {
        res = result.current.constructDestinationName({
          landingType: LANDING_TYPE.STATE_LANDING,
          landingName: 'State',
        });
      });

      expect(res).toBe('State');
    });

    it('for location', () => {
      let res = null;

      act(() => {
        res = result.current.constructDestinationName({
          landingType: LANDING_TYPE.LOCATION_LANDING,
          landingName: 'Location',
          stateName: 'stateName',
        });
      });

      expect(res).toBe('Location, stateName');
    });

    it('for undefined', () => {
      let res = null;

      act(() => {
        res = result.current.constructDestinationName({});
      });

      expect(res).toBe('Error');
    });
  });

  describe('checks `constructDestinationLink` method', () => {
    it('for state', () => {
      const destination = {
        landingType: LANDING_TYPE.STATE_LANDING,
        landingSlug: 'landingSlug',
      };

      let res = null;

      act(() => {
        res = result.current.constructDestinationLink(destination);
      });

      expect(res).toBe(createCampervanRentalRoute({ state: destination.landingSlug }));
    });

    it('for location', () => {
      const destination = {
        landingType: LANDING_TYPE.LOCATION_LANDING,
        stateSlug: 'stateSlug',
        landingSlug: 'landingSlug',
      };

      let res = null;

      act(() => {
        res = result.current.constructDestinationLink(destination);
      });

      expect(res).toBe(createCampervanRentalRoute({
        state: destination.stateSlug,
        location: destination.landingSlug,
      }));
    });

    it('for undefined', () => {
      let res = null;

      act(() => {
        res = result.current.constructDestinationLink({});
      });

      expect(res).toBe('#');
    });
  });

  describe('checks `handleResize` method', () => {
    it('for desktop', () => {
      act(() => {
        result.current.handleResize();
      });

      expect(result.current.swiperOptions).toMatchSnapshot();
    });

    it('for mobile', () => {
      isMobileView.mockReturnValueOnce(true);

      ({ result } = renderHook(useNearbyDestinations));

      act(() => {
        result.current.handleResize();
      });

      expect(result.current.swiperOptions).toMatchSnapshot();
    });
  });

  it('checks `fetchDestinations` method', () => {
    act(() => {
      result.current.fetchDestinations();
    });

    expect(dispatch).toHaveBeenCalledWith(fetchNearbyDestinations({
      latitude: mockedLocation.latitude,
      longitude: mockedLocation.longitude,
      excludedId: mockedLocation.id,
    }));
  });

  it('checks `isDestinationsLoading` updating', () => {
    usePrevious
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true);

    ({ result } = renderHook(useNearbyDestinations));

    expect(dispatch).toHaveBeenCalled();
  });
});
