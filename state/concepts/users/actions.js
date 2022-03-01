import makeFormSubmitAction from 'utils/form/makeFormSubmitAction';
import * as types from './types';

export const fetchSelf = () => ({
  type: types.FETCH_SELF,
});

export const fetchUsers = () => ({
  type: types.FETCH_USERS,
});

export const setUsers = userIds => ({
  type: types.SET_USERS,
  userIds,
});

export const setCurrentPage = pageNumber => ({
  type: types.SET_USERS_PAGE,
  pageNumber,
});

export const filterUsers = filters => ({
  type: types.FILTER_USERS,
  filters,
});

export const setFilterParams = filterParams => ({
  type: types.SET_USERS_FILTER_PARAMS,
  filterParams,
});

export const setSortOrder = sortKey => ({
  type: types.SET_USERS_SORT_ORDER,
  sortKey,
});

export const fetchUser = userId => ({
  type: types.FETCH_USER,
  userId,
});

export const subscribeDiscountAction = makeFormSubmitAction(types.SUBSCRIBE_DISCOUNT);
