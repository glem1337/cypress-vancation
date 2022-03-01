import { pathOr } from 'ramda';

// eslint-disable-next-line import/prefer-default-export
export const geocoderListSelector = pathOr([], ['mapbox', 'geocoder']);
