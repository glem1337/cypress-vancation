import normalize from 'json-api-normalizer';

import { fetchStateLocationEndpoint } from 'state/concepts/campervan-rental/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import response from 'state/concepts/campervan-rental/__mocks__/fetchLocationResponse';
import showErrorNotifications from 'utils/showErrorNotifications';
import { mapLocationSlugToId } from 'state/concepts/campervan-rental/actions';
import { setSearchDestinationLocation, setSearchDestinationLocationIntent } from 'state/concepts/search-destinations/actions';

import { resetCampersData, fetchCampers } from '../../actions';

import fetchStateLocation from '../fetchStateLocation';

jest.mock('utils/showErrorNotifications', () => jest.fn());

const mockedLocation = {
  id: 1,
  locationName: 'test location',
  latitude: 1,
  longitude: 1,
  searchRadius: 123,
  stateLanding: {},
};
jest.mock('redux-object', () => jest.fn(() => mockedLocation));

describe('fetchStateLocation', () => {
  let dispatch;

  const action = {
    location: 'location',
    inclusions: 'test inclusions',
  };

  const params = {
    slug: action.location,
    include: action.inclusions,
  };

  const { endpoint, url } = fetchStateLocationEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    fetchStateLocation.process({ httpClient, action, getState: jest.fn() }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(fetchStateLocation).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url, { params });
    });

    it('success', () => {
      expect(dispatch).toHaveBeenCalledTimes(7);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        setSearchDestinationLocation(mockedLocation),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        setSearchDestinationLocationIntent({
          landingName: mockedLocation.locationName,
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        resetCampersData(),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        5,
        fetchCampers({
          latitude: mockedLocation.latitude,
          longitude: mockedLocation.longitude,
          radius: mockedLocation.searchRadius,
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        6,
        mapLocationSlugToId({
          id: response.data.data.id,
          slug: response.data.data.attributes.slug,
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        7,
        dataApiSuccess({
          endpoint,
          response: normalize(
            response.data,
          ),
        }),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({ method: 'get', reject: true, response: error });

    beforeEach(beforeFunction(httpClient));

    it('dispatches actions', async () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiFailure({ endpoint, error }),
      );
    });

    it('shows error', () => {
      expect(showErrorNotifications).toHaveBeenCalledWith(error, dispatch);
    });
  });
});
