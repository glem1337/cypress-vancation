import normalize from 'json-api-normalizer';

import { FETCH_CAMPER_AMENITIES_INCLUSIONS } from 'constants/camperAmenities';

import { fetchCamperAmenitiesEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';

import response from '../../__mocks__/fetchCamperResponse';
import fetchCamperAmenities from '../fetchCamperAmenities';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('fetchCamperAmenities', () => {
  let dispatch;

  const action = {
    inclusions: FETCH_CAMPER_AMENITIES_INCLUSIONS.join(','),
  };

  const params = {
    include: action.inclusions,
  };

  const { endpoint, url } = fetchCamperAmenitiesEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    fetchCamperAmenities.process(
      { httpClient, action },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(fetchCamperAmenities).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url, { params });
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
