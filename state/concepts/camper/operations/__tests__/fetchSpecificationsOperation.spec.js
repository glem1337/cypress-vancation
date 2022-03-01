import normalize from 'json-api-normalizer';

import { CAMPER_INCLUSION } from 'constants/camper';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import { mockedFetchSpecifications } from 'state/concepts/camper/__mocks__/mockFetchSpecifications';
import { fetchSpecificationsEndpoint } from 'state/concepts/camper/endpoints';
import fetchSpecificationsOperation from 'state/concepts/camper/operations/fetchSpecificationsOperation';
import { dataApiFailure, dataApiRequest, dataApiSuccess } from 'state/data/actions';
import showErrorNotifications from 'utils/showErrorNotifications';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('fetchSpecificationsOperation', () => {
  let dispatch;
  const { url, endpoint } = fetchSpecificationsEndpoint;

  const params = {
    include: [
      CAMPER_INCLUSION.VEHICLE.MAKES,
      CAMPER_INCLUSION.VEHICLE.MODELS,
    ].join(','),
  };

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    fetchSpecificationsOperation.process({ httpClient, getState: jest.fn }, dispatch, jest.fn());
  };

  it('snapshot', () => {
    expect(fetchSpecificationsOperation).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response: mockedFetchSpecifications });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.spy).toHaveBeenCalledWith(url, { params });
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(2,
        dataApiSuccess({
          response: normalize(mockedFetchSpecifications.data, { endpoint }),
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
