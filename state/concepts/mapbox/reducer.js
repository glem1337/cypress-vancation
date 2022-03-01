import { HYDRATE } from 'next-redux-wrapper';

import { combineReducers } from 'redux';
import * as types from 'state/concepts/mapbox/types';

const geocoder = (state = null, action) => {
  switch (action.type) {
    case types.SET_GEOCODER:
      return action.items;
    case types.CLEAR_GEOCODER:
      return null;
    case HYDRATE:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  geocoder,
});
