import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';
import { pluck } from 'ramda';

import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import { fetchNearbyDestinationsEndpoint } from 'state/concepts/campervan-rental/endpoints';
import showErrorNotifications from 'utils/showErrorNotifications';
import { currentCoordinatesSelector } from 'state/app/selectors';
import isPresent from 'utils/isPresent';

import { FETCH_NEAR_YOU_DESTINATIONS } from '../types';
import { setNearYouDestinationsIds } from '../actions';

const fetchNearYouDestinations = createLogic({
  type: FETCH_NEAR_YOU_DESTINATIONS,
  latest: true,
  validate({ getState, action }, allow, reject) {
    const store = getState();

    const coords = currentCoordinatesSelector(store);

    if (isPresent(coords.latitude) && isPresent(coords.longitude)) {
      allow(action);
    } else {
      reject(action);
    }
  },

  async process({ httpClient, getState }, dispatch, done) {
    const store = getState();

    const coords = currentCoordinatesSelector(store);

    const { endpoint, url } = fetchNearbyDestinationsEndpoint;

    const params = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      records_amount: 20,
    };

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.get(url, { params });

      const response = normalize(data);

      dispatch(setNearYouDestinationsIds(pluck('id', data.data)));
      dispatch(dataApiSuccess({ response, endpoint }));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint, error }));
      showErrorNotifications(error, dispatch);
    }
    done();
  },
});

export default fetchNearYouDestinations;
