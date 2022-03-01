import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import { FETCH_HOME_STATES } from 'state/concepts/campervan-rental/types';
import { fetchHomeStateLandingsEndpoint } from 'state/concepts/campervan-rental/endpoints';
import showErrorNotifications from 'utils/showErrorNotifications';

const fetchHomeStateLandings = createLogic({
  type: FETCH_HOME_STATES,
  latest: true,

  async process({ httpClient }, dispatch, done) {
    const { endpoint, url } = fetchHomeStateLandingsEndpoint;

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

export default fetchHomeStateLandings;
