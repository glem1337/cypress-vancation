import { combineReducers } from 'redux';

import {
  SET_USERS,
  SET_USERS_PAGE,
  SET_USERS_FILTER_PARAMS,
  SET_USERS_SORT_ORDER,
} from './types';

const userIds = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.userIds;
    default:
      return state;
  }
};

const pagination = (state = { number: 1, size: 20 }, action) => {
  switch (action.type) {
    case SET_USERS_PAGE:
      return { ...state, number: action.pageNumber };
    default:
      return state;
  }
};

const filtersInitialState = {
  name: '',
  roles: [],
  statuses: [],
};
const filters = (state = filtersInitialState, action) => {
  switch (action.type) {
    case SET_USERS_FILTER_PARAMS:
      return { ...state, ...action.filterParams };
    default:
      return state;
  }
};

const sort = (state = { sortKey: 'name', direction: 'asc' }, action) => {
  switch (action.type) {
    case SET_USERS_SORT_ORDER:
      return state.sortKey === action.sortKey
        ? { ...state, direction: state.direction === 'asc' ? 'desc' : 'asc' }
        : { sortKey: action.sortKey, direction: 'asc' };
    default:
      return state;
  }
};

export default combineReducers({
  userIds,
  pagination,
  filters,
  sort,
});
