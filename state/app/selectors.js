import * as R from 'ramda';

export const prevPageSelector = R.path(['app', 'prevPage']);
export const currentPageSelector = R.path(['app', 'currentPage']);
export const currentCoordinatesSelector = R.path(['app', 'currentCoordinates']);
export const currentLocationSelector = R.path(['app', 'currentLocation']);
export const openGraphDataSelector = R.path(['app', 'openGraph']);
