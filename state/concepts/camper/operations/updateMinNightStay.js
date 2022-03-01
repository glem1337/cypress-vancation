import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';

import { UPDATE_MIN_NIGHT_STAY } from 'state/concepts/camper/types';
import { updateMinNightStayEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { showMessage } from 'state/flash-messages/actions';

const updateMinNightStayOperation = createLogic({
  type: UPDATE_MIN_NIGHT_STAY,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = updateMinNightStayEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    const body = {
      minimal_night_stay: action.values.minimalNightStay,
      camper_id: action.camperId,
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

export default updateMinNightStayOperation;
