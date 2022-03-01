import * as types from './types';

export const fetchGeocoder = searchText => ({
  type: types.FETCH_GEOCODER,
  searchText,
});

export const setGeocoder = items => ({
  type: types.SET_GEOCODER,
  items,
});

export const clearGeocoder = () => ({
  type: types.CLEAR_GEOCODER,
});
