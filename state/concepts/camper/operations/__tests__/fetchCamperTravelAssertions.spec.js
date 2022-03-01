import normalize from 'json-api-normalizer';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';

import { fetchCamperTravelAssertionsEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

import response from '../../__mocks__/fetchCamperResponse';
import fetchCamperTravelAssertions from '../fetchCamperTravelAssertions';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('fetchCamperTravelAssertions', () => {
  let dispatch;

  const action = {
    id: 1,
  };

  const { endpoint, url } = fetchCamperTravelAssertionsEndpoint(action.id);

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    fetchCamperTravelAssertions.process(
      { httpClient, action },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(fetchCamperTravelAssertions).toMatchSnapshot();
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
