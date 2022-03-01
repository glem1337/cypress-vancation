import endpoint from 'utils/endpoint';
import {
  locationLandingRoute,
  stateLandingRoute,
  searchNearestLandingPagesRoute,
  epicenterLocationLandingsRoute,
  homeStateLandingsRoute,
  featuredLocationLandingsRoute,
  campersRoute,
} from 'lib/apiRoutes';

import {
  FETCH_STATE,
  FETCH_STATE_LOCATION,
  FETCH_NEARBY_DESTINATIONS,
  FETCH_EPICENTER_LOCATIONS,
  FETCH_HOME_STATES,
  FETCH_FAVORITE_DESTINATION,
  FETCH_CAMPERS,
} from './types';

export const fetchStateEndpoint = endpoint(FETCH_STATE, 'GET', stateLandingRoute);
export const fetchStateLocationEndpoint = endpoint(FETCH_STATE_LOCATION, 'GET', locationLandingRoute);
export const fetchNearbyDestinationsEndpoint = endpoint(FETCH_NEARBY_DESTINATIONS, 'GET', searchNearestLandingPagesRoute);
export const fetchEpicenterLocationLandingsEndpoint = endpoint(FETCH_EPICENTER_LOCATIONS, 'GET', epicenterLocationLandingsRoute);
export const fetchHomeStateLandingsEndpoint = endpoint(FETCH_HOME_STATES, 'GET', homeStateLandingsRoute);
export const favoriteDestinationsEndpoint = endpoint(FETCH_FAVORITE_DESTINATION, 'GET', featuredLocationLandingsRoute);
export const fetchCampersEndpoint = endpoint(FETCH_CAMPERS, 'GET', campersRoute);
