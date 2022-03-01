import normalize from 'json-api-normalizer';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import { mockedFetchSpecifications } from 'state/concepts/camper/__mocks__/mockFetchSpecifications';
import { fetchVehicleTypesEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiFailure, dataApiRequest, dataApiSuccess } from 'state/data/actions';
import showErrorNotifications from 'utils/showErrorNotifications';

import fetchVehicleTypesOperations from '../fetchVehicleTypesOperation';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('fetchVehicleTypesOperations', () => {
  let dispatch;
  const { url, endpoint } = fetchVehicleTypesEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    fetchVehicleTypesOperations.process({ httpClient, getState: jest.fn }, dispatch, jest.fn());
  };

  it('snapshot', () => {
    expect(fetchVehicleTypesOperations).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response: mockedFetchSpecifications });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.spy).toHaveBeenCalledWith(url);
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(2,
        dataApiSuccess({
          response: normalize(mockedFetchSpecifications.data),
          endpoint,
        }));
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({ method: 'get', reject: true, response: error });

    beforeEach(beforeFunction(httpClient));

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(2, dataApiFailure({ endpoint }));
    });

    it('shows error', () => {
      expect(showErrorNotifications).toHaveBeenCalledWith(error, dispatch);
    });
  });
});
