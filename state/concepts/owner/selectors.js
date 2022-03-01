import * as R from 'ramda';
import { createSelector } from 'reselect';
import build from 'redux-object';

const dataSelector = R.prop('data');

// eslint-disable-next-line import/prefer-default-export
export const ownerProfileSelector = createSelector(dataSelector, (data) => {
  const owners = build(data, 'owner');
  return owners ? owners[0] : undefined;
});
