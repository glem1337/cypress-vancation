import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';

import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { FETCH_CAMPER_FACILITIES } from 'state/concepts/camper/types';
import { fetchCamperFacilitiesEndpoint } from 'state/concepts/camper/endpoints';

const fetchCamperFacilities = createLogic({
  type: FETCH_CAMPER_FACILITIES,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = fetchCamperFacilitiesEndpoint(action.id);

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.get(url);

      const response = normalize(data);

      dispatch(dataApiSuccess({ response, endpoint }));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint, error }));
      showErrorNotifications(error, dispatch);
    }

    done();
  },
});

export default fetchCamperFacilities;
