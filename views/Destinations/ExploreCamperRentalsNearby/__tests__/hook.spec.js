import { act, renderHook } from '@testing-library/react-hooks';
import { dispatch } from '__mocks__/react-redux';

import { LANDING_TYPE } from 'constants/campervanRentals';
import { fetchNearYouDestinations } from 'state/concepts/search-destinations/actions';
import { createCampervanRentalRoute } from 'utils/createRouteHelper';

import useContainer from '../hook';

jest.mock('state/concepts/search-destinations/selectors', () => ({
  destinationsNearYouSelector: jest.fn(() => [{ id: 1, type: 'destination' }]),
}));

jest.mock('state/concepts/campervan-rental/selectors', () => ({
  campersSelector: jest.fn(() => [{ id: 1, type: 'camper' }]),
}));

jest.mock('state/app/selectors', () => ({
  currentCoordinatesSelector: jest.fn(() => ({
    latitude: 1,
    longitude: 2,
  })),
}));

describe('ExploreCamperRentalsNearby useContainer hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useContainer));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `fetchNearYouDestinations` method', () => {
    act(() => {
      result.current.fetchNearYouDestinations();
    });

    expect(dispatch).toHaveBeenCalledWith(fetchNearYouDestinations());
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
});
