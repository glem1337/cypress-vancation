import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import { FETCH_SELF } from 'state/concepts/users/types';
import { fetchUserEndpoint } from 'state/concepts/users/endpoints';

const fetchSelfOperation = createLogic({
  type: FETCH_SELF,
  latest: true,

  async process({ action: { userId }, httpClient }, dispatch, done) {
    const { endpoint, url } = fetchUserEndpoint(userId);

    dispatch(dataApiRequest({ endpoint }));
    try {
      const { data } = await httpClient.get(url);

      dispatch(dataApiSuccess({ response: normalize(data, { endpoint }), endpoint }));
    } catch {
      dispatch(dataApiFailure({ endpoint }));
    }
    done();
  },
});

export default fetchSelfOperation;
