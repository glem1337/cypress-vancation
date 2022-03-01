import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';
import * as R from 'ramda';

import showErrorNotifications from 'utils/showErrorNotifications';

import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { CREATE_CAMPER_AMENITY_HEALTH_SAFETIES } from 'state/concepts/camper/types';
import { createCamperAmenityHealthSafetiesEndpoint } from 'state/concepts/camper/endpoints';
import { createCamperAmenities } from 'state/concepts/camper/actions';

const createCamperAmenityHealthSafeties = createLogic({
  type: CREATE_CAMPER_AMENITY_HEALTH_SAFETIES,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = createCamperAmenityHealthSafetiesEndpoint;

    const params = {
      camper_id: action.camperId,
      amenity_health_safety_items: action.values.amenityHealthSafetyItems.map(
        (item) => ({
          amenity_health_safety_item_id: item.amenityHealthSafetyItemId,
          health_safety_id: item.id,
          active: item.active,
        }),
      ),
    };

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.post(url, params);

      const response = normalize(data);

      dispatch(dataApiSuccess({ endpoint, response }));

      const actionArgs = [
        action.values,
        ...R.props(
          ['setErrors', 'setSubmitting', 'setStatus', 'resetForm', 'setValues'],
          action.form,
        ),
        {
          camperId: action.camperId,
        },
      ];

      dispatch(createCamperAmenities(...actionArgs));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint, error }));
      showErrorNotifications(error, dispatch);
    }

    done();
  },
});

export default createCamperAmenityHealthSafeties;
