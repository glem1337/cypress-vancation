import { CAMPER_INCLUSION } from 'constants/camper';
import { LANDING_TYPE } from 'constants/campervanRentals';
import { SEARCH_RESULTS_RADIUS } from 'constants/searchDestinations';

import {
  FETCH_STATE,
  FETCH_STATE_LOCATION,
  MAP_LOCATION_SLUG_TO_ID,
  MAP_STATE_SLUG_TO_ID,
  FETCH_NEARBY_DESTINATIONS,
  SET_NEARBY_DESTINATIONS_IDS,
  FETCH_EPICENTER_LOCATIONS,
  FETCH_HOME_STATES,
  SET_SHOW_ALL_STATES,
  SET_SLIDE_FAVORITE_DESTINATION,
  SET_FAVORITE_TOTAL,
  FETCH_FAVORITE_DESTINATION,
  FETCH_CAMPERS,
  SET_CAMPER_IDS,
  SET_CAMPERS_PAGE,
  SET_CAMPERS_TOTAL,
  RESET_CAMPERS_DATA,
} from './types';

export const fetchState = ({
  state,
  inclusions = 'seo_info,top_location_landings,fun_facts',
}) => ({
  type: FETCH_STATE,
  state,
  inclusions,
});

export const fetchStateLocation = ({
  state,
  location,
  inclusions = 'state_landing,seo_info,fun_facts',
}) => ({
  type: FETCH_STATE_LOCATION,
  state,
  location,
  inclusions,
});

export const mapStateSlugToId = ({ id, slug }) => ({
  type: MAP_STATE_SLUG_TO_ID,
  id,
  slug,
});

export const mapLocationSlugToId = ({ id, slug }) => ({
  type: MAP_LOCATION_SLUG_TO_ID,
  id,
  slug,
});

export const fetchNearbyDestinations = ({
  latitude,
  longitude,
  count = 12,
  landingType = LANDING_TYPE.LOCATION_LANDING,
  excludedId,
}) => ({
  type: FETCH_NEARBY_DESTINATIONS,
  latitude,
  longitude,
  count,
  landingType,
  excludedId,
});

export const setNearbyDestinationsIds = (ids) => ({
  type: SET_NEARBY_DESTINATIONS_IDS,
  ids,
});

export const fetchEpicenterLocationsAction = () => ({
  type: FETCH_EPICENTER_LOCATIONS,
});

export const fetchHomeStatesAction = () => ({
  type: FETCH_HOME_STATES,
});

export const setShowAllStatesAction = (state) => ({
  type: SET_SHOW_ALL_STATES,
  state,
});

export const setSlideFavoriteDestinationsAction = (slide) => ({
  type: SET_SLIDE_FAVORITE_DESTINATION,
  slide,
});

export const setFavoriteTotalAction = (total) => ({
  type: SET_FAVORITE_TOTAL,
  total,
});

export const fetchFavoriteDestinationsAction = ({ pageNumber, pageSize }) => ({
  type: FETCH_FAVORITE_DESTINATION,
  pageNumber,
  pageSize,
});

export const fetchCampers = ({
  latitude,
  longitude,
  startDate,
  endDate,
  page = 1,
  perPage = 20,
  radius = SEARCH_RESULTS_RADIUS,
  inclusions = CAMPER_INCLUSION.SPECIFICATIONS_DETAILS,
} = {}) => ({
  type: FETCH_CAMPERS,
  latitude,
  longitude,
  startDate,
  endDate,
  page,
  perPage,
  radius,
  inclusions,
});

export const setCamperIds = (ids) => ({
  type: SET_CAMPER_IDS,
  ids,
});

export const setCampersTotal = (total) => ({
  type: SET_CAMPERS_TOTAL,
  total,
});

export const setCampersPage = (page) => ({
  type: SET_CAMPERS_PAGE,
  page,
});

export const resetCampersData = () => ({
  type: RESET_CAMPERS_DATA,
});
