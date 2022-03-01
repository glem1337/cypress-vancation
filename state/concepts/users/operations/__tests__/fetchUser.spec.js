import normalize from 'json-api-normalizer';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import fetchUserResponse from '../../__mocks__/fetchUserResponse';
import { fetchUserEndpoint } from '../../endpoints';
import fetchUserOperation from '../fetchUser';

describe('fetchUserOperation', () => {
  let dispatch;
  const { url, endpoint } = fetchUserEndpoint('1');
  const action = { userId: '1' };

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    fetchUserOperation.process({ action, httpClient, getState: jest.fn }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(fetchUserOperation).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response: fetchUserResponse });

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
        response: normalize(fetchUserResponse.data, { endpoint }),
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
