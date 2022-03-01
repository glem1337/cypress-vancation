import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';
import moment from 'moment';
import * as R from 'ramda';

import { FETCH_CAMPER_CALENDAR_BOUNDARIES } from 'constants/calendar';
import showErrorNotifications from 'utils/showErrorNotifications';
import { CREATE_BLOCKED_PERIODS } from 'state/concepts/camper/types';
import { createCalendarBlockedPeriodsEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure, dataDeleteEntity } from 'state/data/actions';
import { currentDateSelector } from 'state/concepts/calendar/selectors';
import { setBlockedPeriodIds } from 'state/concepts/calendar/actions';
import { fetchCamperCalendar } from 'state/concepts/camper/actions';

const createCalendarBlockedPeriods = createLogic({
  type: CREATE_BLOCKED_PERIODS,
  latest: true,

  async process({ httpClient, action, getState }, dispatch, done) {
    const { endpoint, url } = createCalendarBlockedPeriodsEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    const currentDate = currentDateSelector(getState());

    const body = {
      camper_id: action.camperId,
      fetch_start_date: FETCH_CAMPER_CALENDAR_BOUNDARIES(currentDate).startDate,
      fetch_end_date: FETCH_CAMPER_CALENDAR_BOUNDARIES(currentDate).endDate,
      start_date: moment(action.startDate).format('YYYY-MM-DD'),
      end_date: moment(action.endDate).format('YYYY-MM-DD'),
    };

    try {
      const { data } = await httpClient.post(url, body);
      const response = normalize(data);

      dispatch(dataDeleteEntity({ kind: 'blockedPeriod' }));
      dispatch(dataApiSuccess({ endpoint, response }));
      dispatch(setBlockedPeriodIds(R.pluck('id', data.data)));
      dispatch(fetchCamperCalendar({
        camperId: action.camperId,
        startDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(currentDate).startDate,
        endDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(currentDate).endDate,
      }));
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }

    done();
  },
});

export default createCalendarBlockedPeriods;
