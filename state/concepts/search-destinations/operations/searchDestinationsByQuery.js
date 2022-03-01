import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';
import * as R from 'ramda';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import { geocodingRoute } from 'lib/apiRoutes';
import {
  SEARCH_DESTINATIONS_BY_QUERY_COUNT,
  MAPBOX_FEATURE_TYPE,
  SEARCH_RESULTS_RADIUS,
  SEARCH_DESTINATIONS_BY_QUERY_MAPBOX_COUNT,
} from 'constants/searchDestinations';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import { ACCESS_TOKEN_MAPBOX, COUNTRY_DEFAULT_MAPBOX } from 'constants/mapbox';
import isPresent from 'utils/isPresent';
import getStateShortCodeFromMapboxResult from 'utils/destinations/getStateShortCodeFromMapboxResult';

import { searchDestinationsByQueryEndpoint } from '../endpoints';
import { SEARCH_DESTINATIONS_BY_QUERY } from '../types';
import { setDestinationsByQueryIds, setDestinationsMapBoxIds } from '../actions';

const searchDestinationsByQuery = createLogic({
  type: SEARCH_DESTINATIONS_BY_QUERY,
  latest: true,
  validate({ action }, allow) {
    if (isPresent(action.query)) {
      allow(action);
    }
  },

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = searchDestinationsByQueryEndpoint;

    try {
      const mapboxUrl = geocodingRoute(action.query);

      const params = {
        landing_name: action.query,
      };

      dispatch(dataApiRequest({ endpoint }));

      // Data from API
      const apiResponse = await httpClient.get(url, { params });
      const apiDestinations = R.compose(
        R.take(SEARCH_DESTINATIONS_BY_QUERY_COUNT),
        R.defaultTo([]),
        R.path(['data', 'data']),
      )(apiResponse);

      // Data from MapBox
      const mapBoxResponse = await axios.get(mapboxUrl, {
        params: {
          access_token: ACCESS_TOKEN_MAPBOX,
          country: COUNTRY_DEFAULT_MAPBOX,
        },
      });
      const mapBoxDestinations = R.compose(
        R.map(item => {
          const shortStateCode = getStateShortCodeFromMapboxResult(item);

          return {
              ...item,
              type: MAPBOX_FEATURE_TYPE,
              attributes: {
                id: uuid(),
                place_id: item.id,
                latitude: item.center[1],
                longitude: item.center[0],
                short_state_code: shortStateCode,
                place_name: item.place_name,
                place_short_name: item.text,
                type: MAPBOX_FEATURE_TYPE,
                searchRadius: SEARCH_RESULTS_RADIUS,
              },
          };
        }),
        R.take(SEARCH_DESTINATIONS_BY_QUERY_MAPBOX_COUNT),
        R.defaultTo([]),
        R.path(['data', 'features']),
      )(mapBoxResponse);

      // Prepare data
      const preparedResponse = {
        data: {
          data: [...apiDestinations, ...mapBoxDestinations],
        },
      };

      const response = normalize(preparedResponse.data);
      dispatch(setDestinationsByQueryIds(R.pluck('id', apiDestinations)));
      dispatch(setDestinationsMapBoxIds(R.pluck('id', mapBoxDestinations)));
      dispatch(dataApiSuccess({ response, endpoint }));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint, error }));
    }
    done();
  },
});

export default searchDestinationsByQuery;
