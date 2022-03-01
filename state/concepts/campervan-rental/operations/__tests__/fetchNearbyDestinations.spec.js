import normalize from 'json-api-normalizer';
import { pluck } from 'ramda';

import { fetchNearbyDestinationsEndpoint } from 'state/concepts/campervan-rental/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import response from 'state/concepts/campervan-rental/__mocks__/fetchNearbyDestinationsResponse';
import showErrorNotifications from 'utils/showErrorNotifications';
import { setNearbyDestinationsIds } from 'state/concepts/campervan-rental/actions';

import fetchNearbyDestinations from '../fetchNearbyDestinations';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('fetchNearbyDestinations', () => {
  let dispatch;

  const action = {
    latitude: 'latitude',
    longitude: 'longitude',
    count: 18,
  };

  const params = {
    latitude: action.latitude,
    longitude: action.longitude,
    records_amount: action.count,
  };

  const { endpoint, url } = fetchNearbyDestinationsEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    fetchNearbyDestinations.process(
      { httpClient, action, getState: jest.fn() }, dispatch, jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(fetchNearbyDestinations).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url, { params });
    });

    it('success', () => {
      expect(dispatch).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        setNearbyDestinationsIds(pluck('id', response.data.data)),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        dataApiSuccess({
          endpoint,
          response: normalize(response.data),
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
