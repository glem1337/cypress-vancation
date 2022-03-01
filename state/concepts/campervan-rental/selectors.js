import { createSelector } from 'reselect';
import build from 'redux-object';
import * as R from 'ramda';

import isPresent from 'utils/isPresent';
import { loadingSelector } from 'state/data/selectors';

import { fetchCampersEndpoint } from './endpoints';

const dataSelector = R.prop('data');
const stateIdsSelector = R.path(['campervanRental', 'stateIds']);
const locationIdsSelector = R.path(['campervanRental', 'locationsIds']);
const nearbyDestinationIdsSelector = R.path(['campervanRental', 'nearbyDestinationIds']);
const camperIdsSelector = R.path(['campervanRental', 'camperIds']);
export const campersPageSelector = R.path(['campervanRental', 'campersPage']);
export const campersTotalSelector = R.path(['campervanRental', 'campersTotal']);

export const stateLandingSelector = createSelector(
  (_, slug) => slug,
  dataSelector,
  stateIdsSelector,
  (slug, data, ids) => {
    const id = ids[slug];

    return id ? build(data, 'stateLanding', id) : null;
  },
);

export const bindStateLandingSelector = (slug) => (store) => stateLandingSelector(store, slug);

export const locationLandingSelector = createSelector(
  (_, slug) => slug,
  dataSelector,
  locationIdsSelector,
  (slug, data, ids) => {
    const id = ids[slug];

    return id ? build(data, 'locationLanding', id) : null;
  },
);

export const bindLocationLandingSelector = (slug) => (store) => locationLandingSelector(
  store,
  slug,
);

export const nearbyDestinationsSelector = createSelector(
  dataSelector,
  nearbyDestinationIdsSelector,
  (data, ids) => {
    if (R.isEmpty(ids)) {
      return [];
    }

    return R.compose(
      R.filter(item => isPresent(item)),
      R.defaultTo([]),
    )(build(data, 'searchLandingPage', ids));
  },
);

export const campersSelector = createSelector(
  dataSelector,
  camperIdsSelector,
  (data, ids) => {
    if (R.isEmpty(ids)) {
      return [];
    }

    return R.compose(
      R.filter(item => isPresent(item)),
      R.defaultTo([]),
    )(build(data, 'camper', ids));
  },
);

export const areSearchResultsExistedSelector = createSelector(
  camperIdsSelector,
  (ids) => isPresent(ids),
);

export const areSearchResultsFetchingSelector = (state) => loadingSelector(
  state,
  fetchCampersEndpoint.endpoint,
);

export const epicenterLocationsSelector = createSelector(
  dataSelector,
  (data) => build(data, 'epicenterLocationLanding'),
);

export const homeStatesSelector = createSelector(
  dataSelector,
  (data) => build(data, 'homeStateLanding'),
);

export const nearestDestinationsSelector = createSelector(
  dataSelector,
  (data) => build(data, 'searchLandingPage'),
);

export const showAllStateSelector = R.path(['campervanRental', 'showAllState']);

export const locationLandingsSelector = createSelector(
  dataSelector,
  (data) => (build(data, 'locationLanding')),
);

export const favoriteCurrentSlideSelector = R.path(['campervanRental', 'favoriteCurrentSlide']);

export const favoriteTotalSelector = R.path(['campervanRental', 'favoriteTotal']);
