import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';
import * as R from 'ramda';

import { FETCH_CAMPER_CALENDAR_BOUNDARIES } from 'constants/calendar';
import { dataApiRequest, dataApiSuccess, dataApiFailure, dataDeleteEntity } from 'state/data/actions';
import { FETCH_CAMPER_CALENDAR } from 'state/concepts/camper/types';
import {
  setCustomDiscountPeriodIds,
  setCustomNightRatesIds,
  setBlockedPeriodIds,
  setCustomMinNightStayIds,
  setExternalEventsIds,
  setExternalCalendarIds,
} from 'state/concepts/calendar/actions';
import { fetchCamperCalendarEndpoint } from 'state/concepts/camper/endpoints';
import showErrorNotifications from 'utils/showErrorNotifications';

const fetchCamperCalendarOperation = createLogic({
  type: FETCH_CAMPER_CALENDAR,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = fetchCamperCalendarEndpoint(action.camperId);

    const params = {
      start_date: action.startDate || FETCH_CAMPER_CALENDAR_BOUNDARIES().startDate,
      end_date: action.endDate || FETCH_CAMPER_CALENDAR_BOUNDARIES().endDate,
    };

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.get(url, { params });

      const response = normalize(data);

      const included = R.compose(
        R.defaultTo([]),
        R.path(['included']),
      )(data);

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

      dispatch(dataDeleteEntity({ kind: 'blockedPeriod' }));
      dispatch(dataApiSuccess({ response, endpoint }));
      dispatch(setCustomMinNightStayIds(minNightStayIds));
      dispatch(setCustomDiscountPeriodIds(customDiscountPeriodIds));
      dispatch(setCustomNightRatesIds(customNightRatesIds));
      dispatch(setBlockedPeriodIds(blockedPeriodIds));
      dispatch(setExternalEventsIds(externalEventsIds));
      dispatch(setExternalCalendarIds(externalCalendarIds));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint, error }));
      showErrorNotifications(error, dispatch);
    }
    done();
  },
});

export default fetchCamperCalendarOperation;
