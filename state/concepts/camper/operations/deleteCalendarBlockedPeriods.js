import { createLogic } from 'redux-logic';
import moment from 'moment';
import normalize from 'json-api-normalizer';
import * as R from 'ramda';

import { FETCH_CAMPER_CALENDAR_BOUNDARIES } from 'constants/calendar';
import showErrorNotifications from 'utils/showErrorNotifications';
import { DELETE_BLOCKED_PERIODS } from 'state/concepts/camper/types';
import { deleteCalendarBlockedPeriodsEndpoint } from 'state/concepts/camper/endpoints';
import { fetchCamperCalendar } from 'state/concepts/camper/actions';
import { setBlockedPeriodIds } from 'state/concepts/calendar/actions';
import { currentDateSelector } from 'state/concepts/calendar/selectors';
import { dataApiRequest, dataApiSuccess, dataApiFailure, dataDeleteEntity } from 'state/data/actions';

const deleteCalendarBlockedPeriods = createLogic({
  type: DELETE_BLOCKED_PERIODS,
  latest: true,

  async process({ httpClient, action, getState }, dispatch, done) {
    const { endpoint, url } = deleteCalendarBlockedPeriodsEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    const currentDate = currentDateSelector(getState());

    const body = {
      camper_id: action.camperId,
      destroy_start_date: moment(action.startDate).format('YYYY-MM-DD'),
      destroy_end_date: moment(action.endDate).format('YYYY-MM-DD'),
      start_date: FETCH_CAMPER_CALENDAR_BOUNDARIES(currentDate).startDate,
      end_date: FETCH_CAMPER_CALENDAR_BOUNDARIES(currentDate).endDate,
    };

    try {
      const { data } = await httpClient.delete(url, { data: body });
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

export default deleteCalendarBlockedPeriods;
