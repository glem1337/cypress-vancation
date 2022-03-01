import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';

import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

import { FETCH_TRAVEL_ACCESSORIES_CONFIG } from 'state/concepts/travel-accessories/types';
import { fetchTravelAccessoriesConfigEndpoint } from 'state/concepts/travel-accessories/endpoints';

const fetchTravelAccessoriesConfig = createLogic({
  type: FETCH_TRAVEL_ACCESSORIES_CONFIG,
  latest: true,

  async process({ httpClient }, dispatch, done) {
    const { endpoint, url } = fetchTravelAccessoriesConfigEndpoint;

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

export default fetchTravelAccessoriesConfig;
