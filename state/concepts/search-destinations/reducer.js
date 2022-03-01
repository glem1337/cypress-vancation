import { combineReducers } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { v4 as uuid } from 'uuid';
import * as R from 'ramda';
import { HYDRATE } from 'next-redux-wrapper';

import isPresent from 'utils/isPresent';

import {
  SET_DESTINATIONS_BY_COORDS_IDS,
  SET_DESTINATIONS_BY_QUERY_IDS,
  SET_DESTINATIONS_FROM_MAP_BOX_IDS,
  CLEAR_DESTINATIONS_BY_QUERY_IDS,
  SET_SEARCH_DESTINATION_DATES,
  SET_SEARCH_DESTINATION_LOCATION,
  CLEAR_SEARCH_DESTINATION_PARAMS,
  SET_ACTIVE_CAMPER_ID,
  SET_FILTER_VALUE,
  CLEAR_ALL_FILTERS,
  SET_FILTER_BATCH_VALUE,
  SET_SEARCH_DESTINATION_LOCATION_INTENT,
  TOGGLE_MOBILE_FILTERS_VISIBILITY,
  TOGGLE_DESKTOP_MAP_VISIBILITY,
  SET_NEAR_YOU_DESTINATIONS_IDS,
  SET_SEARCH_DESTINATION_ALL_LOCATIONS,
} from './types';

const destinationsByCoordsIds = (state = [], action) => {
  switch (action.type) {
    case SET_DESTINATIONS_BY_COORDS_IDS:
      return action.ids;
    default:
      return state;
  }
};

const destinationsByQueryIds = (state = [], action) => {
  switch (action.type) {
    case SET_DESTINATIONS_BY_QUERY_IDS:
      return action.ids;
    case CLEAR_DESTINATIONS_BY_QUERY_IDS:
      return [];
    default:
      return state;
  }
};

const destinationsFromMapBoxIds = (state = [], action) => {
  switch (action.type) {
    case SET_DESTINATIONS_FROM_MAP_BOX_IDS:
      return action.ids;
    case CLEAR_DESTINATIONS_BY_QUERY_IDS:
      return [];
    default:
      return state;
  }
};

const desktopMapVisibility = (state = true, action) => {
  switch (action.type) {
    case TOGGLE_DESKTOP_MAP_VISIBILITY:
      return !state;
    default:
      return state;
  }
};

const destinationsNearYouIds = (state = [], action) => {
  switch (action.type) {
    case SET_NEAR_YOU_DESTINATIONS_IDS:
      return action.ids;
    default:
      return state;
  }
};

export const searchDestinationParamsInitialState = {
  uuid: null,
  dateRange: null,
  location: null,
  locationIntent: null,
};
const searchDestinationParams = (state = searchDestinationParamsInitialState, action) => {
  switch (action.type) {
    case SET_SEARCH_DESTINATION_DATES:
      return {
        ...state,
        dateRange: action.dateRange,
        uuid: uuid(),
      };
    case SET_SEARCH_DESTINATION_LOCATION:
      return {
        ...state,
        location: action.location,
        uuid: uuid(),
      };
    case SET_SEARCH_DESTINATION_LOCATION_INTENT:
      return {
        ...state,
        locationIntent: action.location,
      };
    case SET_SEARCH_DESTINATION_ALL_LOCATIONS: {
      return {
        ...state,
        location: action.location,
        locationIntent: action.location,
        uuid: uuid(),
      };
    }
    case CLEAR_SEARCH_DESTINATION_PARAMS:
      return searchDestinationParamsInitialState;
    case HYDRATE: {
      const location = R.pathOr(null, ['payload', 'searchDestinations', 'searchDestinationParams', 'location'], action);
      const locationIntent = R.pathOr(null, ['payload', 'searchDestinations', 'searchDestinationParams', 'locationIntent'], action);

      return {
        ...state,
        location,
        locationIntent,
      };
    }
    case REHYDRATE: {
      if (action.payload?.searchDestinationParams) {
        const dates = action.payload?.searchDestinationParams?.dateRange;
        const dateRange = isPresent(dates)
          ? [new Date(dates[0]), new Date(dates[1])]
          : state.dateRange;

        const location = R.isNil(state.location)
          ? action.payload?.searchDestinationParams?.location
          : state.location;

        const locationIntent = R.isNil(state.locationIntent)
          ? action.payload?.searchDestinationParams?.locationIntent
          : state.locationIntent;

        return {
          ...state,
          location,
          locationIntent,
          dateRange,
        };
      }

      return state;
    }
    default:
      return state;
  }
};

export const searchDestinationFiltersInitialState = {
  isMobileVisible: false,
  uuid: null,
  seats: null,
  sleeps: null,
  priceStart: null,
  priceEnd: null,
  vehicles: null,
  delivery: null,
  glamper: null,
  rating: null,
  allowPets: null,
  allowSmoking: null,
  festivalApproved: null,
  allowUnlimitedMiles: null,
  insideHeight: null,
  standardAmenities: null,
  luxuryAmenities: null,
};
const searchDestinationFilters = (state = searchDestinationFiltersInitialState, action) => {
  switch (action.type) {
    case TOGGLE_MOBILE_FILTERS_VISIBILITY: {
      const clone = R.clone(state);

      clone.isMobileVisible = !state.isMobileVisible;

      return clone;
    }
    case SET_FILTER_VALUE: {
      const clone = R.clone(state);

      clone[action.name] = action.value;
      clone.uuid = uuid();

      return clone;
    }
    case SET_FILTER_BATCH_VALUE: {
      const clone = R.clone(state);

      action.filters.forEach(filter => {
        clone[filter.name] = filter.value;
      });
      clone.uuid = uuid();

      return clone;
    }
    case CLEAR_ALL_FILTERS: {
      return {
        ...searchDestinationFiltersInitialState,
        isMobileVisible: state.isMobileVisible,
        uuid: uuid(),
      };
    }
    default:
      return state;
  }
};

const activeCamperId = (state = null, action) => {
  switch (action.type) {
    case SET_ACTIVE_CAMPER_ID:
      return action.id;
    default:
      return state;
  }
};

export default combineReducers({
  destinationsByCoordsIds,
  destinationsByQueryIds,
  destinationsFromMapBoxIds,
  searchDestinationParams,
  searchDestinationFilters,
  activeCamperId,
  desktopMapVisibility,
  destinationsNearYouIds,
});
