import normalize from 'json-api-normalizer';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';

import { fetchTravelAccessoriesConfigEndpoint } from 'state/concepts/travel-accessories/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

import response from 'state/concepts/health-and-safety/__mocks__/fetchHealthAndSafetyConfigResponse';
import fetchTravelAccessoriesConfig from '../fetchTravelAccessoriesConfig';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('fetchTravelAccessoriesConfig', () => {
  let dispatch;

  const { endpoint, url } = fetchTravelAccessoriesConfigEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    fetchTravelAccessoriesConfig.process({ httpClient }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(fetchTravelAccessoriesConfig).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url);
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response: normalize(response.data),
        }),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({
      method: 'get',
      reject: true,
      response: error,
    });

    beforeEach(beforeFunction(httpClient));

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

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
