import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';
import { pluck } from 'ramda';
import axios from 'axios';
import * as R from 'ramda';
import { v4 as uuid } from 'uuid';

import { ACCESS_TOKEN_MAPBOX } from 'constants/mapbox';
import { SEARCH_DESTINATIONS_BY_COORDINATES_COUNT, MAPBOX_FEATURE_TYPE, SEARCH_RESULTS_RADIUS } from 'constants/searchDestinations';
import { setCurrentCoordinates, setCurrentLocation } from 'state/app/actions';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import { reverseGeocodingRoute } from 'lib/apiRoutes';
import getStateShortCodeFromMapboxResult from 'utils/destinations/getStateShortCodeFromMapboxResult';

import { searchDestinationsByCoordinatesEndpoint } from '../endpoints';
import { SEARCH_DESTINATIONS_BY_COORDINATES } from '../types';
import { setDestinationsByCoordinatesIds } from '../actions';

const searchDestinationsByCoordinates = createLogic({
  type: SEARCH_DESTINATIONS_BY_COORDINATES,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = searchDestinationsByCoordinatesEndpoint;

    const params = {
      latitude: action.latitude,
      longitude: action.longitude,
      records_amount: SEARCH_DESTINATIONS_BY_COORDINATES_COUNT,
    };

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.get(url, { params });

      const response = normalize(data);
      dispatch(dataApiSuccess({ response, endpoint }));

      const latitude = parseFloat(data.meta.latitude);
      const longitude = parseFloat(data.meta.longitude);

      const mapboxUrl = reverseGeocodingRoute({
        latitude,
        longitude,
      });

      // Data from MapBox
      const mapBoxResponse = await axios.get(mapboxUrl, {
        params: {
          access_token: ACCESS_TOKEN_MAPBOX,
        },
      });

      // Current user location
      const mapBoxDestination = R.compose(
        item => {
          const shortStateCode = getStateShortCodeFromMapboxResult(item);

          return {
              ...item,
              id: uuid(),
              placeId: item.id,
              latitude: item.center[1],
              longitude: item.center[0],
              shortStateCode,
              placeName: item.place_name,
              placeShortName: item.text,
              type: MAPBOX_FEATURE_TYPE,
              searchRadius: SEARCH_RESULTS_RADIUS,
          };
        },
        R.defaultTo({}),
        R.head,
        R.filter(item => R.test(/(place\.|region\.)/, item.id)),
        R.defaultTo([]),
        R.path(['data', 'features']),
      )(mapBoxResponse);

      dispatch(setCurrentCoordinates({
        latitude,
        longitude,
      }));

      dispatch(setCurrentLocation(mapBoxDestination));

      dispatch(setDestinationsByCoordinatesIds(pluck('id', data.data)));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint, error }));
    }
    done();
  },
});

export default searchDestinationsByCoordinates;
