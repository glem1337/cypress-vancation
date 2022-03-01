import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';
import { UPDATE_PREPARATION_TIME } from 'state/concepts/camper/types';
import { updatePreparationTimeEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { showMessage } from 'state/flash-messages/actions';

const updatePreparationTimeOperation = createLogic({
  type: UPDATE_PREPARATION_TIME,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = updatePreparationTimeEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    const body = {
      camper_id: action.camperId,
      preparation_time: parseInt(action.values.time, 10),
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

export default updatePreparationTimeOperation;
