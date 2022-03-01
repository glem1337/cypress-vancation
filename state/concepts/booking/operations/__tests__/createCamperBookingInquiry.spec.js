import normalize from 'json-api-normalizer';
import moment from 'moment';
import * as R from 'ramda';

import showErrorNotifications from 'utils/showErrorNotifications';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';

import { createCamperBookingInquiryEndpoint } from 'state/concepts/booking/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { hideModal } from 'state/modal/actions';
import { showMessage } from 'state/flash-messages/actions';
import mockedResponse from 'state/concepts/booking/__mocks__/createBookingCamperInquiryResponse';

import createCamperBookingInquiry from '../createCamperBookingInquiry';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('createCamperBookingInquiry', () => {
  let dispatch;

  const action = {
    values: {
      dateRange: [new Date(), new Date()],
      description: 'test description',
    },
    camperId: 'camperId',
  };

  const body = {
    camper_id: action.camperId,
    start_date: moment(R.head(action.values.dateRange)).format('YYYY-MM-DD'),
    end_date: moment(R.last(action.values.dateRange)).format('YYYY-MM-DD'),
    description: action.values.description,
  };

  const { endpoint, url } = createCamperBookingInquiryEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    createCamperBookingInquiry.process(
      { httpClient, action, getState: jest.fn() },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(createCamperBookingInquiry).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({
      method: 'post',
      response: mockedResponse,
    });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.post).toHaveBeenCalledWith(url, body);
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(4);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response: normalize(mockedResponse.data),
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(3, hideModal());

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        showMessage({
          messageSubTitle: { id: 'shared.success' },
        }),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({
      method: 'post',
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
