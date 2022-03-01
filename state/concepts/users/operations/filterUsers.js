import { createLogic } from 'redux-logic';

import { FILTER_USERS } from 'state/concepts/users/types';
import { setFilterParams, setCurrentPage, fetchUsers } from 'state/concepts/users/actions';

const filterUsersOperation = createLogic({
  type: FILTER_USERS,
  latest: true,

  async process({ action: { filters } }, dispatch, done) {
    dispatch(setFilterParams(filters));
    dispatch(setCurrentPage(1));
    dispatch(fetchUsers());
    done();
  },
});

export default filterUsersOperation;
