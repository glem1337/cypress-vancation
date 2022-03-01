import normalize from 'json-api-normalizer';
import moment from 'moment';
import * as R from 'ramda';

import { FETCH_CAMPER_CALENDAR_BOUNDARIES } from 'constants/calendar';
import { createCustomDiscountPeriodEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';
import mockedResponse from 'state/concepts/camper/__mocks__/createCustomDiscountPeriodResponse';
import { setCustomDiscountPeriodIds } from 'state/concepts/calendar/actions';
import { showMessage } from 'state/flash-messages/actions';
import { fetchCamperCalendar } from 'state/concepts/camper/actions';

import createCustomDiscountPeriod from '../createCustomDiscountPeriod';

jest.mock('utils/showErrorNotifications', () => jest.fn());

const mockedCurrentDate = moment();
jest.mock('state/concepts/calendar/selectors', () => ({
  customDiscountPeriodIdsSelector: jest.fn(() => []),
  currentDateSelector: jest.fn(() => mockedCurrentDate),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

describe('createCustomDiscountPeriod', () => {
  let dispatch;

  const action = {
    camperId: '0aebbaa8-5006-483b-962c-82fe01ed581f',
    selectedSlots: {
      slots: [new Date(), new Date()],
    },
    values: {
      monthlyDiscountPercent: 12,
      weeklyDiscountPercent: 12,
    },
    form: {
      setSubmitting: jest.fn(),
      resetForm: jest.fn(),
    },
  };

  const startDate = R.compose(
    value => moment(value).format('YYYY-MM-DD'),
    R.head,
    R.path(['selectedSlots', 'slots']),
  )(action);

  const endDate = R.compose(
    value => moment(value).format('YYYY-MM-DD'),
    R.last,
    R.path(['selectedSlots', 'slots']),
  )(action);

  const body = {
    camper_id: action.camperId,
    start_date: startDate,
    end_date: endDate,
    monthly_discount_percent: action.values.monthlyDiscountPercent,
    weekly_discount_percent: action.values.weeklyDiscountPercent,
  };

  const { endpoint, url } = createCustomDiscountPeriodEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    createCustomDiscountPeriod.process(
      { httpClient, action, getState: jest.fn() }, dispatch, jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(createCustomDiscountPeriod).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'post', response: mockedResponse });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.post).toHaveBeenCalledWith(url, body);
    });

    it('success', () => {
      expect(dispatch).toHaveBeenCalledTimes(5);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      const response = normalize(mockedResponse.data);
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response,
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        setCustomDiscountPeriodIds([mockedResponse.data.data.id]),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        showMessage({
          messageSubTitle: { id: 'calendar.changesSuccessfullySaved' },
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        5,
        fetchCamperCalendar({
          camperId: action.camperId,
          start_date: FETCH_CAMPER_CALENDAR_BOUNDARIES(mockedCurrentDate).startDate,
          end_date: FETCH_CAMPER_CALENDAR_BOUNDARIES(mockedCurrentDate).endDate,
        }),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({ method: 'post', reject: true, response: error });

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
