import normalize from 'json-api-normalizer';
import * as R from 'ramda';

import { fetchCamperCalendarEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure, dataDeleteEntity } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';
import {
  setCustomDiscountPeriodIds,
  setCustomNightRatesIds,
  setBlockedPeriodIds,
  setCustomMinNightStayIds,
  setExternalEventsIds,
  setExternalCalendarIds,
} from 'state/concepts/calendar/actions';

import response from '../../__mocks__/fetchCamperCalendarResponse';
import fetchCamperCalendar from '../fetchCamperCalendar';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('fetchCamperCalendar', () => {
  let dispatch;

  const action = {
    camperId: 1,
    startDate: 'start date',
    endDate: 'end date',
  };

  const params = {
    start_date: action.startDate,
    end_date: action.endDate,
  };

  const { endpoint, url } = fetchCamperCalendarEndpoint(action.camperId);

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    fetchCamperCalendar.process({ httpClient, action, getState: jest.fn() }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(fetchCamperCalendar).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url, { params });
    });

    it('success', () => {
      const included = R.compose(
        R.defaultTo([]),
        R.path(['included']),
      )(response.data);

      const customDiscountPeriodIds = R.compose(
        R.pluck('id'),
        R.filter(item => item.type === 'custom_discount_period'),
      )(included);

      const customNightRatesIds = R.compose(
        R.pluck('id'),
        R.filter(item => item.type === 'pricing_period'),
      )(included);

      const blockedPeriodIds = R.compose(
        R.pluck('id'),
        R.filter(item => item.type === 'blocked_period'),
      )(included);

      const minNightStayIds = R.compose(
        R.pluck('id'),
        R.filter(item => item.type === 'custom_minimum_night_stay_period'),
      )(included);

      const externalEventsIds = R.compose(
        R.pluck('id'),
        R.filter(item => item.type === 'external_event'),
      )(included);

      const externalCalendarIds = R.compose(
        R.pluck('id'),
        R.filter(item => item.type === 'external_calendar'),
      )(included);

      expect(dispatch).toHaveBeenCalledTimes(9);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataDeleteEntity({ kind: 'blockedPeriod' }),
      );

      const res = normalize(response.data);
      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        dataApiSuccess({
          endpoint,
          response: res,
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        setCustomMinNightStayIds(minNightStayIds),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        5,
        setCustomDiscountPeriodIds(customDiscountPeriodIds),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        6,
        setCustomNightRatesIds(customNightRatesIds),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        7,
        setBlockedPeriodIds(blockedPeriodIds),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        8,
        setExternalEventsIds(externalEventsIds),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        9,
        setExternalCalendarIds(externalCalendarIds),
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
