import { combineReducers } from 'redux';
import * as R from 'ramda';
import { HYDRATE } from 'next-redux-wrapper';

import * as types from './type';

export const currentPage = (state = null, action) => {
  switch (action.type) {
    case types.SET_PAGES:
      return action.currentPage;
    default:
      return state;
  }
};

export const prevPage = (state = null, action) => {
  switch (action.type) {
    case types.SET_PAGES:
      return action.prevPage;
    default:
      return state;
  }
};

export const currentCoordinatesInitialState = {
  latitude: null,
  longitude: null,
  isLocationRequested: false,
};
export const currentCoordinates = (state = currentCoordinatesInitialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_COORDINATES:
      return {
        latitude: action.latitude,
        longitude: action.longitude,
        isLocationRequested: true,
      };
    default:
      return state;
  }
};

export const currentLocation = (state = null, action) => {
  switch (action.type) {
    case types.SET_CURRENT_LOCATION:
      return action.location;
    default:
      return state;
  }
};

export const openGraphInitialState = {
  openGraph: {
    url: null,
    title: null,
    type: null,
    image: null,
    siteName: null,
    description: null,
  },
  twitter: {
    card: null,
    image: null,
  },
};
export const openGraph = (state = openGraphInitialState, action) => {
  switch (action.type) {
    case types.SET_OPEN_GRAPH_DATA:
      return R.mergeDeepRight(state, action.data);
    case HYDRATE: {
      const data = R.pathOr({}, ['payload', 'app', 'openGraph'], action);

      return R.mergeDeepRight(state, data);
    }
    default:
      return state;
  }
};

const appReducer = combineReducers({
  currentPage,
  prevPage,
  currentCoordinates,
  currentLocation,
  openGraph,
});

export default appReducer;
