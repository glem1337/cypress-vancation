import normalize from 'json-api-normalizer';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import fetchUsersResponse from '../../__mocks__/fetchUsersResponse';
import { fetchUsersEndpoint } from '../../endpoints';
import fetchUsersOperation from '../fetchUsers';

jest.mock('../../selectors', () => ({
  paginationSelector: () => ({
    number: 1,
    size: 20,
  }),
  filtersSelector: () => ({
    name: 'name',
  }),
  sortParamsSelector: () => 'name',
}));

describe('fetchUsersOperation', () => {
  let dispatch;
  const { url, endpoint } = fetchUsersEndpoint;
  const params = {
    page: {
      number: 1,
      size: 20,
    },
    filter: {
      name: 'name',
    },
    sort: 'name',
  };

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    fetchUsersOperation.process({ httpClient, getState: jest.fn }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(fetchUsersOperation).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response: fetchUsersResponse });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint with right params', () => {
      expect(httpClient.spy).toHaveBeenCalledWith(url, { params });
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: 'DATA_API_REQUEST',
        endpoint,
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: 'DATA_API_SUCCESS',
        endpoint,
        response: normalize(fetchUsersResponse.data, { endpoint }),
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: 'users/SET_USERS',
        userIds: fetchUsersResponse.data.data.map(({ id }) => id),
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
