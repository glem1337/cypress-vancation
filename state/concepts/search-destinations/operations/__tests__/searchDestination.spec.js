import { createCampervanRentalRoute, createSearchDestinationRoute } from 'utils/createRouteHelper';
import redirect from 'utils/redirect';
import { fetchCampers, resetCampersData } from 'state/concepts/campervan-rental/actions';
import { LANDING_TYPE } from 'constants/campervanRentals';
import { MAPBOX_FEATURE_TYPE } from 'constants/searchDestinations';

import searchDestination from '../searchDestination';
import { setSearchDestinationLocation } from '../../actions';

jest.mock('utils/redirect', () => jest.fn());

describe('searchDestination operation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('has valid attributes', () => {
    expect(searchDestination).toMatchSnapshot();
  });

  describe('check validate method', () => {
    it('should allow', () => {
      const allow = jest.fn();
      const reject = jest.fn();

      const getState = jest.fn(() => ({
        searchDestinations: {
          searchDestinationParams: {
            locationIntent: {
              latitude: 1,
              longitude: 2,
            },
          },
        },
      }));

      searchDestination.validate(
        { action: {}, getState },
        allow,
        reject,
      );

      expect(allow).toHaveBeenCalledWith({});
      expect(reject).not.toHaveBeenCalled();
    });

    it('should reject', () => {
      const allow = jest.fn();
      const reject = jest.fn();

      const getState = jest.fn(() => ({
        searchDestinations: {
          searchDestinationParams: {
            locationIntent: {},
          },
        },
      }));

      searchDestination.validate(
        { action: {}, getState },
        allow,
        reject,
      );

      expect(reject).toHaveBeenCalledWith({});
      expect(allow).not.toHaveBeenCalled();
    });
  });

  it('should redirect to state landing', () => {
    const getState = jest.fn(() => ({
      searchDestinations: {
        searchDestinationParams: {
          locationIntent: {
            landingType: LANDING_TYPE.STATE_LANDING,
            stateSlug: 'stateSlug',
          },
        },
      },
    }));

    const link = createCampervanRentalRoute({ state: 'stateSlug' });

    searchDestination.process(
      { getState },
      jest.fn(),
      jest.fn(),
    );

    expect(redirect).toHaveBeenCalledWith(link);
  });

  it('should redirect to location landing', () => {
    const getState = jest.fn(() => ({
      searchDestinations: {
        searchDestinationParams: {
          locationIntent: {
            landingType: LANDING_TYPE.LOCATION_LANDING,
            stateSlug: 'stateSlug',
            landingSlug: 'landingSlug',
          },
        },
      },
    }));

    const link = createCampervanRentalRoute({ state: 'stateSlug', location: 'landingSlug' });

    searchDestination.process(
      { getState },
      jest.fn(),
      jest.fn(),
    );

    expect(redirect).toHaveBeenCalledWith(link);
  });

  it('should redirect to search results page', () => {
    const dispatch = jest.fn();

    const getState = jest.fn(() => ({
      searchDestinations: {
        searchDestinationParams: {
          locationIntent: {
            type: MAPBOX_FEATURE_TYPE,
            placeId: 'placeId',
          },
        },
      },
    }));

    const link = createSearchDestinationRoute('placeId');

    searchDestination.process(
      { getState },
      dispatch,
      jest.fn(),
    );

    expect(dispatch).toHaveBeenCalledWith(setSearchDestinationLocation({
      type: MAPBOX_FEATURE_TYPE,
      placeId: 'placeId',
    }));
    expect(redirect).toHaveBeenCalledWith(link);
  });

  it('should reset and fetch campers', () => {
    const dispatch = jest.fn();

    const getState = jest.fn(() => ({
      searchDestinations: {
        searchDestinationParams: {
          locationIntent: {
            type: MAPBOX_FEATURE_TYPE,
            placeId: 'placeId',
          },
        },
      },
    }));

    searchDestination.process(
      { getState },
      dispatch,
      jest.fn(),
    );

    expect(dispatch).toHaveBeenNthCalledWith(1, setSearchDestinationLocation({
      type: MAPBOX_FEATURE_TYPE,
      placeId: 'placeId',
    }));
    expect(dispatch).toHaveBeenNthCalledWith(2, resetCampersData());
    expect(dispatch).toHaveBeenNthCalledWith(3, fetchCampers());
  });
});
