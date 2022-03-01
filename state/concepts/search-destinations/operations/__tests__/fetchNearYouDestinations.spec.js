import normalize from 'json-api-normalizer';
import { pluck } from 'ramda';

import { fetchNearbyDestinationsEndpoint } from 'state/concepts/campervan-rental/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import response from 'state/concepts/campervan-rental/__mocks__/fetchNearbyDestinationsResponse';
import showErrorNotifications from 'utils/showErrorNotifications';
import { setNearYouDestinationsIds } from 'state/concepts/search-destinations/actions';
import { currentCoordinatesSelector } from 'state/app/selectors';

import fetchNearYouDestinations from '../fetchNearYouDestinations';

jest.mock('utils/showErrorNotifications', () => jest.fn());

jest.mock('state/app/selectors', () => ({
  currentCoordinatesSelector: jest.fn(() => ({
    latitude: 1,
    longitude: 2,
  })),
}));

describe('fetchNearYouDestinations', () => {
  let dispatch;

  const { endpoint, url } = fetchNearbyDestinationsEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    fetchNearYouDestinations.process(
      { httpClient, getState: jest.fn() }, dispatch, jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(fetchNearYouDestinations).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      const params = {
        latitude: 1,
        longitude: 2,
        records_amount: 20,
      };

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
        setNearYouDestinationsIds(pluck('id', response.data.data)),
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

  describe('check validate method', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should allow', () => {
      const allow = jest.fn();
      const reject = jest.fn();

      const getState = jest.fn(() => ({
        app: {
          currentCoordinates: {
            latitude: 1,
            longitude: 2,
          },
        },
      }));

      fetchNearYouDestinations.validate(
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
        app: {
          currentCoordinates: {},
        },
      }));

      currentCoordinatesSelector.mockReturnValueOnce({});

      fetchNearYouDestinations.validate(
        { action: {}, getState },
        allow,
        reject,
      );

      expect(reject).toHaveBeenCalledWith({});
      expect(allow).not.toHaveBeenCalled();
    });
  });
});
