import normalize from 'json-api-normalizer';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';

import { fetchCamperPricingAndFeesEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

import response from '../../__mocks__/fetchCamperPricingAndFeesResponse';
import fetchCamperPricingAndFees from '../fetchCamperPricingAndFees';
import { setCamperPricingAndFeesId } from '../../actions';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('fetchCamperPricingAndFees', () => {
  let dispatch;

  const action = {
    camperId: 1,
    startDate: '2020-11-11',
    endDate: '2020-11-23s',
  };

  const params = {
    camper_id: action.camperId,
    start_date: action.startDate,
    end_date: action.endDate,
  };

  const { endpoint, url } = fetchCamperPricingAndFeesEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    fetchCamperPricingAndFees.process(
      { httpClient, action },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(fetchCamperPricingAndFees).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url, { params });
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        setCamperPricingAndFeesId(response?.data?.data?.id),
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
