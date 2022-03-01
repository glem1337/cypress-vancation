import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';
import * as R from 'ramda';
import moment from 'moment';

import { FETCH_CAMPER_CALENDAR_BOUNDARIES } from 'constants/calendar';
import showErrorNotifications from 'utils/showErrorNotifications';
import { CREATE_CUSTOM_MIN_NIGHT_STAY_PERIOD } from 'state/concepts/camper/types';
import { createCustomMinNightStayPeriodEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import { customMinNightStayIdsSelector, currentDateSelector } from 'state/concepts/calendar/selectors';
import { setCustomMinNightStayIds } from 'state/concepts/calendar/actions';
import { showMessage } from 'state/flash-messages/actions';
import { fetchCamperCalendar } from 'state/concepts/camper/actions';

const createCustomMinNightStayPeriod = createLogic({
  type: CREATE_CUSTOM_MIN_NIGHT_STAY_PERIOD,
  latest: true,

  async process({ httpClient, action, getState }, dispatch, done) {
    const { endpoint, url } = createCustomMinNightStayPeriodEndpoint;

    dispatch(dataApiRequest({ endpoint }));

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
      nights_amount: action.values.minimalNightStay,
    };

    try {
      const { data } = await httpClient.post(url, body);
      const response = normalize(data);

      dispatch(dataApiSuccess({ endpoint, response }));

      const customMinNightStayIds = customMinNightStayIdsSelector(getState());
      dispatch(setCustomMinNightStayIds([...customMinNightStayIds, data.data.id]));

      dispatch(
        showMessage({
          messageSubTitle: { id: 'calendar.changesSuccessfullySaved' },
        }),
      );

      const currentDate = currentDateSelector(getState());
      dispatch(fetchCamperCalendar({
        camperId: action.camperId,
        start_date: FETCH_CAMPER_CALENDAR_BOUNDARIES(currentDate).startDate,
        end_date: FETCH_CAMPER_CALENDAR_BOUNDARIES(currentDate).endDate,
      }));
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }

    action.form.setSubmitting(false);
    action.form.resetForm();
    done();
  },
});

export default createCustomMinNightStayPeriod;
