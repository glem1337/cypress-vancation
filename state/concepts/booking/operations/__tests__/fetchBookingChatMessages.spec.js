import normalize from 'json-api-normalizer';
import { pluck } from 'ramda';

import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import response from 'state/concepts/booking/__mocks__/fetchCamperInquiriesResponse';
import showErrorNotifications from 'utils/showErrorNotifications';

import {
  setBookingChatMessagesIds,
  setBookingChatMessagesPage,
  setBookingChatMessagesTotal,
} from '../../actions';
import { fetchBookingChatMessagesEndpoint } from '../../endpoints';

import fetchBookingChatMessages from '../fetchBookingChatMessages';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('fetchBookingChatMessages', () => {
  let dispatch;
  let allow;
  let reject;

  const action = {
    id: 22,
    page: 1,
    perPage: 20,
  };

  const params = {
    'page[number]': action.page,
    'page[size]': action.perPage,
    camper_inquiry_id: action.id,
  };

  const { endpoint, url } = fetchBookingChatMessagesEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    allow = jest.fn();
    reject = jest.fn();

    fetchBookingChatMessages.validate({ action }, allow, reject);
    fetchBookingChatMessages.process(
      { httpClient, action, getState: jest.fn() }, dispatch, jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(fetchBookingChatMessages).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url, { params });
    });

    it('success', () => {
      expect(dispatch).toHaveBeenCalledTimes(5);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        setBookingChatMessagesIds(pluck('id', response.data.data)),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        setBookingChatMessagesPage(response.data.meta?.page?.total),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        setBookingChatMessagesTotal(response.data.meta?.page?.current_page),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        5,
        dataApiSuccess({
          endpoint,
          response: normalize(response.data),
        }),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({ method: 'get', reject: true, response: error });

    beforeEach(beforeFunction(httpClient));

    it('dispatches actions', async () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

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
