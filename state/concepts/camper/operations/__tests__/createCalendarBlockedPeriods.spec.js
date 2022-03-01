import normalize from 'json-api-normalizer';
import moment from 'moment';
import * as R from 'ramda';

import { FETCH_CAMPER_CALENDAR_BOUNDARIES } from 'constants/calendar';
import { createCalendarBlockedPeriodsEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure, dataDeleteEntity } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';
import mockedResponse from 'state/concepts/camper/__mocks__/createCalendarBlockedPeriodResponse';
import { setBlockedPeriodIds } from 'state/concepts/calendar/actions';
import { fetchCamperCalendar } from 'state/concepts/camper/actions';

import createCalendarBlockedPeriods from '../createCalendarBlockedPeriods';

jest.mock('utils/showErrorNotifications', () => jest.fn());

const mockedCurrentDate = moment();
jest.mock('state/concepts/calendar/selectors', () => ({
  customBlockedPeriodIdsSelector: jest.fn(() => []),
  currentDateSelector: jest.fn(() => mockedCurrentDate),
}));

describe('createCalendarBlockedPeriods', () => {
  let dispatch;

  const action = {
    startDate: new Date(),
    endDate: new Date(),
    camperId: '0aebbaa8-5006-483b-962c-82fe01ed581f',
  };

  const body = {
    camper_id: action.camperId,
    fetch_start_date: FETCH_CAMPER_CALENDAR_BOUNDARIES(mockedCurrentDate).startDate,
    fetch_end_date: FETCH_CAMPER_CALENDAR_BOUNDARIES(mockedCurrentDate).endDate,
    start_date: moment(action.startDate).format('YYYY-MM-DD'),
    end_date: moment(action.endDate).format('YYYY-MM-DD'),
  };

  const { endpoint, url } = createCalendarBlockedPeriodsEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    createCalendarBlockedPeriods.process(
      { httpClient, action, getState: jest.fn() }, dispatch, jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(createCalendarBlockedPeriods).toMatchSnapshot();
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

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataDeleteEntity({ kind: 'blockedPeriod' }),
      );

      const response = normalize(mockedResponse.data);
      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        dataApiSuccess({
          endpoint,
          response,
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        setBlockedPeriodIds(R.pluck('id', mockedResponse.data.data)),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        5,
        fetchCamperCalendar({
          camperId: action.camperId,
          startDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(mockedCurrentDate).startDate,
          endDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(mockedCurrentDate).endDate,
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
