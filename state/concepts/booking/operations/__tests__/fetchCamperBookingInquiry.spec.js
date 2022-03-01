import normalize from 'json-api-normalizer';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';

import { fetchCamperBookingInquiryEndpoint } from 'state/concepts/booking/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

import response from 'state/concepts/booking/__mocks__/fetchCamperBookingInquiryResponse';
import fetchCamperBookingInquiry from '../fetchCamperBookingInquiry';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('fetchCamperBookingInquiry', () => {
  let dispatch;

  const action = {
    id: 1,
  };

  const params = {
    camper_inquiry_id: action.id,
  };

  const { endpoint, url } = fetchCamperBookingInquiryEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    fetchCamperBookingInquiry.process(
      {
        httpClient,
        action,
      },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(fetchCamperBookingInquiry).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({
      method: 'get',
      response,
    });

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
        dataApiFailure({
          endpoint,
          error,
        }),
      );
    });

    it('shows error', () => {
      expect(showErrorNotifications).toHaveBeenCalledWith(error, dispatch);
    });
  });
});
