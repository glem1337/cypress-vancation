import axios from 'axios';
import { createLogic } from 'redux-logic';
import { map } from 'ramda';

import { FETCH_GEOCODER } from 'state/concepts/mapbox/types';
import { fetchGeocodingEndpoint } from 'state/concepts/mapbox/endpoints';
import { dataApiFailure, dataApiRequest } from 'state/data/actions';
import { clearGeocoder, setGeocoder } from 'state/concepts/mapbox/actions';
import { ACCESS_TOKEN_MAPBOX, COUNTRY_DEFAULT_MAPBOX } from 'constants/mapbox';

const fetchGeocoderOperation = createLogic({
  type: FETCH_GEOCODER,
  latest: true,

  validate({ action }, allow, reject) {
    if (action.searchText && action.searchText.length) {
      allow(action);
    } else {
      reject(clearGeocoder());
    }
  },

  async process({ action: { searchText } }, dispatch, done) {
    const { url, endpoint } = fetchGeocodingEndpoint(searchText);

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await axios.get(url, {
        params: {
          access_token: ACCESS_TOKEN_MAPBOX,
          country: COUNTRY_DEFAULT_MAPBOX,
        },
      });

      const items = map(
        ({
           // eslint-disable-next-line camelcase
           id, center, place_name,
        }) => ({
          id, place: place_name, longitude: center[0], latitude: center[1],
        }),
        data.features,
      );

      dispatch(setGeocoder(items));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint }));
      // TODO - Need handler errors from the server
    }
    done();
  },
});

export default fetchGeocoderOperation;
