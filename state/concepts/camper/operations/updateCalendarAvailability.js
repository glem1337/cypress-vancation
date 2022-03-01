import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';
import { UPDATE_CALENDAR_AVAILABILITY } from 'state/concepts/camper/types';
import { updateCalendarAvailabilityEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { showMessage } from 'state/flash-messages/actions';

const updateCalendarAvailabilityOperation = createLogic({
  type: UPDATE_CALENDAR_AVAILABILITY,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = updateCalendarAvailabilityEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    const body = {
      camper_id: action.camperId,
      calendar_availability: action.values.countMonth,
    };

    try {
      const { data } = await httpClient.patch(url, body);

      const response = normalize(data);

      dispatch(dataApiSuccess({ endpoint, response }));

      dispatch(
        showMessage({
          messageSubTitle: { id: 'calendar.settingsSuccessfullySaved' },
        }),
      );
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }

    action.form.setSubmitting(false);
    action.form.resetForm();
    done();
  },
});

export default updateCalendarAvailabilityOperation;
