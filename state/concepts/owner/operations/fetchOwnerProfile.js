import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';

import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { FETCH_OWNER_PROFILE } from 'state/concepts/owner/types';
import { fetchOwnerProfileEndpoint } from 'state/concepts/owner/endpoints';

const fetchOwnerProfile = createLogic({
  type: FETCH_OWNER_PROFILE,
  latest: true,

  async process({ httpClient }, dispatch, done) {
    const { endpoint, url } = fetchOwnerProfileEndpoint;

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

export default fetchOwnerProfile;
