import { createSelector } from 'reselect';
import build from 'redux-object';
import * as R from 'ramda';

import isPresent from 'utils/isPresent';

const dataSelector = R.prop('data');

export const instagramPhotosIdsSelector = R.path(['home', 'instagramPhotosIds']);
export const instagramPhotosPageSelector = R.path(['home', 'instagramPhotosPage']);
export const instagramPhotosTotalSelector = R.path(['home', 'instagramPhotosTotal']);

export const instagramPhotosSelector = createSelector(
  dataSelector,
  instagramPhotosIdsSelector,
  (data, ids) => {
    if (R.isEmpty(ids)) {
      return [];
    }

    return R.compose(
      R.filter(item => isPresent(item)),
      R.defaultTo([]),
    )(build(data, 'instagramPhoto', ids));
  },
);
