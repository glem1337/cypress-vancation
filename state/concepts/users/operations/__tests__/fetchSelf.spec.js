import normalize from 'json-api-normalizer';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import fetchSelfResponse from '../../__mocks__/fetchSelfResponse';
import { fetchSelfEndpoint } from '../../endpoints';
import fetchSelfOperation from '../fetchSelf';

describe('fetchSelfOperation', () => {
  let dispatch;
  const { url, endpoint } = fetchSelfEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    fetchSelfOperation.process({ httpClient, getState: jest.fn }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(fetchSelfOperation).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response: fetchSelfResponse });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.spy).toHaveBeenCalledWith(url);
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: 'DATA_API_REQUEST',
        endpoint,
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: 'DATA_API_SUCCESS',
        endpoint,
        response: normalize(fetchSelfResponse.data, { endpoint }),
      });
    });
  });

  describe('failure', () => {
    const httpClient = mockHttpClient({ method: 'get', reject: true });

    beforeEach(beforeFunction(httpClient));

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: 'DATA_API_REQUEST',
        endpoint,
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: 'DATA_API_FAILURE',
        endpoint,
      });
    });
  });
});
