import endpoint from 'utils/endpoint';
import {
  searchLandingPagesRoute,
  searchNearestLandingPagesRoute,
  geocodingRoute,
} from 'lib/apiRoutes';

import {
  SEARCH_DESTINATIONS_BY_QUERY,
  SEARCH_DESTINATIONS_BY_COORDINATES,
  FETCH_SEARCH_RESULT_DATA,
} from './types';

export const searchDestinationsByQueryEndpoint = endpoint(SEARCH_DESTINATIONS_BY_QUERY, 'GET', searchLandingPagesRoute);
export const searchDestinationsByCoordinatesEndpoint = endpoint(SEARCH_DESTINATIONS_BY_COORDINATES, 'GET', searchNearestLandingPagesRoute);
export const fetchSearchResultDataOperationEndpoint = placeId => endpoint(FETCH_SEARCH_RESULT_DATA, 'GET', geocodingRoute(placeId));
