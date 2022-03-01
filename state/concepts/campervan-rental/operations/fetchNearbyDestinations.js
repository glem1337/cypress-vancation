import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';
import { pluck } from 'ramda';

import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import { FETCH_NEARBY_DESTINATIONS } from 'state/concepts/campervan-rental/types';
import { fetchNearbyDestinationsEndpoint } from 'state/concepts/campervan-rental/endpoints';
import { setNearbyDestinationsIds } from 'state/concepts/campervan-rental/actions';
import showErrorNotifications from 'utils/showErrorNotifications';

const fetchNearbyDestinations = createLogic({
  type: FETCH_NEARBY_DESTINATIONS,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = fetchNearbyDestinationsEndpoint;

    const params = {
      latitude: action.latitude,
      longitude: action.longitude,
      records_amount: action.count,
      landing_type: action.landingType,
      excluded_id: action.excludedId,
    };

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.get(url, { params });

      const response = normalize(data);

      dispatch(setNearbyDestinationsIds(pluck('id', data.data)));
      dispatch(dataApiSuccess({ response, endpoint }));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint, error }));
      showErrorNotifications(error, dispatch);
    }
    done();
  },
});

export default fetchNearbyDestinations;
