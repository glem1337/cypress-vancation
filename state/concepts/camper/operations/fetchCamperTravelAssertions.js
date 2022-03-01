import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';

import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { FETCH_CAMPER_TRAVEL_ASSERTIONS } from 'state/concepts/camper/types';
import { fetchCamperTravelAssertionsEndpoint } from 'state/concepts/camper/endpoints';

const fetchCamperTravelAssertions = createLogic({
  type: FETCH_CAMPER_TRAVEL_ASSERTIONS,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = fetchCamperTravelAssertionsEndpoint(action.id);

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

export default fetchCamperTravelAssertions;
