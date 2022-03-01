import { combineReducers } from 'redux';
import { assoc, pathOr } from 'ramda';
import { HYDRATE } from 'next-redux-wrapper';

import { USER_SIGNOUT } from 'state/concepts/session/types';

import {
  MAP_STATE_SLUG_TO_ID,
  MAP_LOCATION_SLUG_TO_ID,
  SET_NEARBY_DESTINATIONS_IDS,
  SET_SHOW_ALL_STATES,
  SET_SLIDE_FAVORITE_DESTINATION,
  SET_FAVORITE_TOTAL,
  SET_CAMPER_IDS,
  SET_CAMPERS_PAGE,
  SET_CAMPERS_TOTAL,
  RESET_CAMPERS_DATA,
} from './types';

const stateIds = (state = {}, action) => {
  switch (action.type) {
    case HYDRATE: {
      return pathOr({}, ['payload', 'campervanRental', 'stateIds'], action);
    }
    case MAP_STATE_SLUG_TO_ID:
      return assoc(action.slug, action.id, state);
    default:
      return state;
  }
};

const locationsIds = (state = {}, action) => {
  switch (action.type) {
    case HYDRATE: {
      return pathOr({}, ['payload', 'campervanRental', 'locationsIds'], action);
    }
    case MAP_LOCATION_SLUG_TO_ID:
      return assoc(action.slug, action.id, state);
    default:
      return state;
  }
};

const nearbyDestinationIds = (state = [], action) => {
  switch (action.type) {
    case SET_NEARBY_DESTINATIONS_IDS:
      return action.ids;
    default:
      return state;
  }
};

const showAllState = (state = false, action) => {
  switch (action.type) {
    case SET_SHOW_ALL_STATES:
      return action.state;
    case HYDRATE:
      return false;
    default:
      return state;
  }
};

const favoriteCurrentSlide = (state = 1, action) => {
  switch (action.type) {
    case SET_SLIDE_FAVORITE_DESTINATION:
      return action.slide;
    case HYDRATE:
      return 1;
    default:
      return state;
  }
};

const favoriteTotal = (state = 1, action) => {
  switch (action.type) {
    case SET_FAVORITE_TOTAL:
      return action.total;
    case HYDRATE:
      return 1;
    default:
      return state;
  }
};

const camperIds = (state = [], action) => {
  switch (action.type) {
    case SET_CAMPER_IDS:
      return action.ids;
    case HYDRATE:
      return action.payload?.campervanRental?.camperIds || [];
    case USER_SIGNOUT: {
      return [];
    }
    case RESET_CAMPERS_DATA: {
      return [];
    }
    default:
      return state;
  }
};

const campersTotal = (state = 0, action) => {
  switch (action.type) {
    case SET_CAMPERS_TOTAL:
      return action.total || 0;
    case HYDRATE:
      return action.payload?.campervanRental?.campersTotal || 0;
    case RESET_CAMPERS_DATA: {
      return 0;
    }
    default:
      return state;
  }
};

const campersPage = (state = 0, action) => {
  switch (action.type) {
    case SET_CAMPERS_PAGE:
      return action.page || 1;
    case HYDRATE:
      return action.payload?.campervanRental?.campersPage || 1;
    case RESET_CAMPERS_DATA: {
      return 0;
    }
    default:
      return state;
  }
};

export default combineReducers({
  stateIds,
  locationsIds,
  nearbyDestinationIds,
  showAllState,
  favoriteCurrentSlide,
  favoriteTotal,
  camperIds,
  campersTotal,
  campersPage,
});
