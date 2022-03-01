import { createSelector } from 'reselect';
import build from 'redux-object';
import {
  isEmpty, path, prop, pipe, omit, values, flatten,
} from 'ramda';

const dataSelector = prop('data');

export const usersIdsSelector = path(['users', 'userIds']);

export const usersSelector = createSelector(
  usersIdsSelector,
  dataSelector,
  (ids, data) => (ids && !isEmpty(ids) ? build(data, 'users', ids) : []),
);

export const paginationSelector = path(['users', 'pagination']);

export const currentPageSelector = createSelector(
  paginationSelector,
  prop('number'),
);

export const filtersSelector = path(['users', 'filters']);

export const searchQuerySelector = createSelector(
  filtersSelector,
  prop('name'),
);

export const sortSelector = path(['users', 'sort']);

export const sortParamsSelector = createSelector(
  sortSelector,
  ({ sortKey, direction }) => (direction === 'asc' ? sortKey : `-${sortKey}`),
);

export const appliedFilters = createSelector(
  filtersSelector,
  pipe(
    omit(['name']),
    values,
    flatten,
  ),
);

export const userSelector = createSelector(
  (_, userId) => userId,
  dataSelector,
  (userId, data) => build(data, 'users', userId),
);
