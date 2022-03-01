import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';
import { UPDATE_PICKUP_DROP_OFF_TIME } from 'state/concepts/camper/types';
import { updatePickupDropOffEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { showMessage } from 'state/flash-messages/actions';

const updatePickupDropOffTimeOperation = createLogic({
  type: UPDATE_PICKUP_DROP_OFF_TIME,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = updatePickupDropOffEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    const body = {
      delivery_dropoff: action.values.dropOffTime,
      delivery_pickup: action.values.pickupTime,
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

export default updatePickupDropOffTimeOperation;
