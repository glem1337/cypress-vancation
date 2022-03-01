import { createSelector } from 'reselect';
import build from 'redux-object';
import * as R from 'ramda';

import isPresent from 'utils/isPresent';

const dataSelector = R.prop('data');
export const destinationsByCoordsIdsSelector = R.path(['searchDestinations', 'destinationsByCoordsIds']);
export const destinationsByQueryIdsSelector = R.path(['searchDestinations', 'destinationsByQueryIds']);
export const destinationsFromMapBoxIdsSelector = R.path(['searchDestinations', 'destinationsFromMapBoxIds']);
export const searchDestinationParamsSelector = R.path(['searchDestinations', 'searchDestinationParams']);
export const searchDestinationFiltersSelector = R.path(['searchDestinations', 'searchDestinationFilters']);
export const activeCamperIdSelector = R.path(['searchDestinations', 'activeCamperId']);
export const desktopMapVisibilitySelector = R.path(['searchDestinations', 'desktopMapVisibility']);
export const destinationsNearYouIdsSelector = R.path(['searchDestinations', 'destinationsNearYouIds']);

export const destinationsByCoordsSelector = createSelector(
  dataSelector,
  destinationsByCoordsIdsSelector,
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

export const destinationsByQuerySelector = createSelector(
  dataSelector,
  destinationsByQueryIdsSelector,
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

export const destinationsFromMapBoxSelector = createSelector(
  dataSelector,
  destinationsFromMapBoxIdsSelector,
  (data, ids) => {
    if (R.isEmpty(ids)) {
      return [];
    }

    return R.compose(
      R.filter(item => isPresent(item)),
      R.defaultTo([]),
    )(build(data, 'mapboxFeature', ids));
  },
);

export const destinationsNearYouSelector = createSelector(
  dataSelector,
  destinationsNearYouIdsSelector,
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
