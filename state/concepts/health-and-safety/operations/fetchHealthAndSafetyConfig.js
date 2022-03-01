import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';

import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

import { FETCH_HEALTH_AND_SAFETY_CONFIG } from 'state/concepts/health-and-safety/types';
import { fetchHealthAndSafetyConfigEndpoint } from 'state/concepts/health-and-safety/endpoints';

const fetchHealthAndSafetyConfig = createLogic({
  type: FETCH_HEALTH_AND_SAFETY_CONFIG,
  latest: true,

  async process({ httpClient }, dispatch, done) {
    const { endpoint, url } = fetchHealthAndSafetyConfigEndpoint;

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

export default fetchHealthAndSafetyConfig;
