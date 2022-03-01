import assertFormSubmitAction from 'utils/testHelpers/assertFormSubmitAction';
import * as actions from '../actions';

it('fetchSelf()', () => {
  const expectedAction = { type: 'users/FETCH_SELF' };

  expect(actions.fetchSelf()).toEqual(expectedAction);
});

it('fetchUsers()', () => {
  const expectedAction = { type: 'users/FETCH_USERS' };

  expect(actions.fetchUsers()).toEqual(expectedAction);
});

it('setUsers()', () => {
  const expectedAction = { userIds: ['id'], type: 'users/SET_USERS' };

  expect(actions.setUsers(['id'])).toEqual(expectedAction);
});

it('setCurrentPage()', () => {
  const expectedAction = { pageNumber: 2, type: 'users/SET_USERS_PAGE' };

  expect(actions.setCurrentPage(2)).toEqual(expectedAction);
});

it('filterUsers()', () => {
  const expectedAction = { filters: 'filters', type: 'users/FILTER_USERS' };

  expect(actions.filterUsers('filters')).toEqual(expectedAction);
});

it('setFilterParams()', () => {
  const expectedAction = { filterParams: 'filterParams', type: 'users/SET_USERS_FILTER_PARAMS' };

  expect(actions.setFilterParams('filterParams')).toEqual(expectedAction);
});

it('setSortOrder()', () => {
  const expectedAction = { sortKey: 'name', type: 'users/SET_USERS_SORT_ORDER' };

  expect(actions.setSortOrder('name')).toEqual(expectedAction);
});

it('fetchUser()', () => {
  const expectedAction = { userId: 'id', type: 'users/FETCH_USER' };

  expect(actions.fetchUser('id')).toEqual(expectedAction);
});

it('subscribeDiscountAction()', () => {
  assertFormSubmitAction(actions.subscribeDiscountAction, 'users/SUBSCRIBE_DISCOUNT');
});
