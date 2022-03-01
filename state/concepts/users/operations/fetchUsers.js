import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';
import { map, prop } from 'ramda';

import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import { FETCH_USERS } from 'state/concepts/users/types';
import { fetchUsersEndpoint } from 'state/concepts/users/endpoints';
import { setUsers } from 'state/concepts/users/actions';
import { paginationSelector, filtersSelector, sortParamsSelector } from 'state/concepts/users/selectors';

const fetchUsersOperation = createLogic({
  type: FETCH_USERS,
  latest: true,

  async process({ httpClient, getState }, dispatch, done) {
    const { endpoint, url } = fetchUsersEndpoint;
    const state = getState();
    const params = {
      page: paginationSelector(state),
      filter: filtersSelector(state),
      sort: sortParamsSelector(state),
    };

    dispatch(dataApiRequest({ endpoint }));
    try {
      const { data } = await httpClient.get(url, { params });
      const response = normalize(data, { endpoint });

      dispatch(dataApiSuccess({ response, endpoint }));
      dispatch(setUsers(map(prop('id'), data.data)));
    } catch {
      dispatch(dataApiFailure({ endpoint }));
    }
    done();
  },
});

export default fetchUsersOperation;
