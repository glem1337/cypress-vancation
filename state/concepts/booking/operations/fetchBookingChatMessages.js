import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';
import * as R from 'ramda';

import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import showErrorNotifications from 'utils/showErrorNotifications';
import isPresent from 'utils/isPresent';

import { FETCH_BOOKING_CHAT_MESSAGES } from '../types';
import { fetchBookingChatMessagesEndpoint } from '../endpoints';
import {
  setBookingChatMessagesIds,
  setBookingChatMessagesPage,
  setBookingChatMessagesTotal,
} from '../actions';

const fetchBookingChatMessages = createLogic({
  type: FETCH_BOOKING_CHAT_MESSAGES,
  latest: true,
  validate({ action }, allow) {
    if (isPresent(action.id)) {
      allow(action);
    }
  },

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = fetchBookingChatMessagesEndpoint;

    const params = {
      camper_inquiry_id: action.id,
      'page[number]': action.page,
      'page[size]': action.perPage,
    };

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.get(url, { params });

      const response = normalize(data);

      dispatch(setBookingChatMessagesIds(R.pluck('id', data.data)));
      dispatch(setBookingChatMessagesPage(data.meta?.page?.current_page));
      dispatch(setBookingChatMessagesTotal(data.meta?.page?.total));
      dispatch(dataApiSuccess({ response, endpoint }));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint, error }));
      showErrorNotifications(error, dispatch);
    }
    done();
  },
});

export default fetchBookingChatMessages;
