import {
  SEARCH_DESTINATION,
  SEARCH_DESTINATIONS_BY_COORDINATES,
  SEARCH_DESTINATIONS_BY_QUERY,
  SET_DESTINATIONS_BY_COORDS_IDS,
  SET_DESTINATIONS_BY_QUERY_IDS,
  SET_DESTINATIONS_FROM_MAP_BOX_IDS,
  CLEAR_DESTINATIONS_BY_QUERY_IDS,
  SET_SEARCH_DESTINATION_DATES,
  SET_SEARCH_DESTINATION_LOCATION,
  CLEAR_SEARCH_DESTINATION_PARAMS,
  SET_ACTIVE_CAMPER_ID,
  SET_FILTER_VALUE,
  SET_FILTER_BATCH_VALUE,
  CLEAR_ALL_FILTERS,
  SET_SEARCH_DESTINATION_LOCATION_INTENT,
  TOGGLE_MOBILE_FILTERS_VISIBILITY,
  TOGGLE_DESKTOP_MAP_VISIBILITY,
  FETCH_NEAR_YOU_DESTINATIONS,
  SET_NEAR_YOU_DESTINATIONS_IDS,
  FETCH_SEARCH_RESULT_DATA,
  SET_SEARCH_DESTINATION_ALL_LOCATIONS,
} from './types';

export const searchDestination = () => ({
  type: SEARCH_DESTINATION,
});

export const searchDestinationsByQuery = (query) => ({
  type: SEARCH_DESTINATIONS_BY_QUERY,
  query,
});

export const searchDestinationsByCoordinates = ({ latitude, longitude }) => ({
  type: SEARCH_DESTINATIONS_BY_COORDINATES,
  latitude,
  longitude,
});

export const setDestinationsByCoordinatesIds = (ids) => ({
  type: SET_DESTINATIONS_BY_COORDS_IDS,
  ids,
});

export const setDestinationsByQueryIds = (ids) => ({
  type: SET_DESTINATIONS_BY_QUERY_IDS,
  ids,
});

export const setDestinationsMapBoxIds = (ids) => ({
  type: SET_DESTINATIONS_FROM_MAP_BOX_IDS,
  ids,
});

export const clearDestinationsByQueryIds = () => ({
  type: CLEAR_DESTINATIONS_BY_QUERY_IDS,
});

export const setSearchDestinationDates = (dateRange) => ({
  type: SET_SEARCH_DESTINATION_DATES,
  dateRange,
});

export const setSearchDestinationLocation = (location) => ({
  type: SET_SEARCH_DESTINATION_LOCATION,
  location,
});

export const clearSearchDestinationParams = () => ({
  type: CLEAR_SEARCH_DESTINATION_PARAMS,
});

export const setActiveCamperId = (id) => ({
  type: SET_ACTIVE_CAMPER_ID,
  id,
});

export const setFilterValue = ({ name, value }) => ({
  type: SET_FILTER_VALUE,
  name,
  value,
});

export const setFilterBatchValue = (filters) => ({
  type: SET_FILTER_BATCH_VALUE,
  filters,
});

export const clearAllFilter = () => ({
  type: CLEAR_ALL_FILTERS,
});

export const setSearchDestinationLocationIntent = (location) => ({
  type: SET_SEARCH_DESTINATION_LOCATION_INTENT,
  location,
});

export const setSearchDestinationAllLocations = (location) => ({
  type: SET_SEARCH_DESTINATION_ALL_LOCATIONS,
  location,
});

export const toggleMobileFiltersVisibility = () => ({
  type: TOGGLE_MOBILE_FILTERS_VISIBILITY,
});

export const toggleDesktopMapVisibility = () => ({
  type: TOGGLE_DESKTOP_MAP_VISIBILITY,
});

export const fetchNearYouDestinations = () => ({
  type: FETCH_NEAR_YOU_DESTINATIONS,
});

export const setNearYouDestinationsIds = (ids) => ({
  type: SET_NEAR_YOU_DESTINATIONS_IDS,
  ids,
});

export const fetchSearchResultData = (placeId) => ({
  type: FETCH_SEARCH_RESULT_DATA,
  placeId,
});
