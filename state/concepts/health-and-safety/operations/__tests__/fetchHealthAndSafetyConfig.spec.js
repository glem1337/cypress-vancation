import normalize from 'json-api-normalizer';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';

import { fetchHealthAndSafetyConfigEndpoint } from 'state/concepts/health-and-safety/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

import response from 'state/concepts/health-and-safety/__mocks__/fetchHealthAndSafetyConfigResponse';
import fetchHealthAndSafetyConfig from '../fetchHealthAndSafetyConfig';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('fetchHealthAndSafetyConfig', () => {
  let dispatch;

  const { endpoint, url } = fetchHealthAndSafetyConfigEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    fetchHealthAndSafetyConfig.process({ httpClient }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(fetchHealthAndSafetyConfig).toMatchSnapshot();
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
