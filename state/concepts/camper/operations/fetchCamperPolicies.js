import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';

import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { FETCH_CAMPER_POLICIES } from 'state/concepts/camper/types';
import { fetchCamperPoliciesEndpoint } from 'state/concepts/camper/endpoints';

const fetchCamperPolicies = createLogic({
  type: FETCH_CAMPER_POLICIES,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = fetchCamperPoliciesEndpoint(action.id);

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

export default fetchCamperPolicies;
