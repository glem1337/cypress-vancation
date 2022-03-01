import { setFilterParams, setCurrentPage, fetchUsers } from 'state/concepts/users/actions';

import filterUsersOperation from '../filterUsers';

describe('filterUsersOperation', () => {
  let dispatch;

  const action = {
    filters: 'filters',
  };

  beforeEach(() => {
    dispatch = jest.fn();
    filterUsersOperation.process({ action }, dispatch, jest.fn());
  });

  it('has valid attributes', () => {
    expect(filterUsersOperation).toMatchSnapshot();
  });

  it('dispatches actions', () => {
    expect(dispatch).toHaveBeenCalledTimes(3);

    expect(dispatch).toHaveBeenNthCalledWith(1, setFilterParams(action.filters));
    expect(dispatch).toHaveBeenNthCalledWith(2, setCurrentPage(1));
    expect(dispatch).toHaveBeenNthCalledWith(3, fetchUsers());
  });
});
