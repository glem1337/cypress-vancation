import endpoint from 'utils/endpoint';
import { FETCH_GEOCODER } from 'state/concepts/mapbox/types';
import { geocodingRoute } from 'lib/apiRoutes';

// eslint-disable-next-line import/prefer-default-export
export const fetchGeocodingEndpoint = searchText => endpoint(
  FETCH_GEOCODER,
  'GET',
  geocodingRoute(searchText),
);
