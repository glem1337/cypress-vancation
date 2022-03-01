import normalize from 'json-api-normalizer';
import { mergeDeepRight } from 'ramda';
import { HYDRATE } from 'next-redux-wrapper';
import { REHYDRATE } from 'redux-persist';

import { USER_SIGNOUT } from 'state/concepts/session/types';
import usersResponse from 'state/concepts/users/__mocks__/fetchUsersResponse';
import { fetchCampersEndpoint } from 'state/concepts/campervan-rental/endpoints';
import { RESET_CAMPERS_DATA } from 'state/concepts/campervan-rental/types';

import reducer from '../reducer';
import * as types from '../types';

describe('dataReducer', () => {
  const usersData = normalize(usersResponse.data);

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({ meta: {} });
  });

  it('should handle DATA_API_REQUEST', () => {
    const endpoint = '/users';
    const action = {
      type: types.DATA_API_REQUEST,
      endpoint,
    };

    expect(reducer(undefined, action)).toEqual({
      meta: {
        '/users': {
          loading: true,
        },
      },
    });
  });

  it('should handle DATA_API_SUCCESS', () => {
    const endpoint = '/users';
    const action = {
      type: types.DATA_API_SUCCESS,
      endpoint,
      response: usersData,
    };

    const priorUsersState = {
      users: {
        777: {
          id: '777',
          type: 'users',
          attributes: {
            'first-name': 'Test',
            'last-name': 'Test',
            status: 'active',
          },
        },
      },
    };

    // without prior state
    const result = mergeDeepRight(
      priorUsersState,
      mergeDeepRight(usersData, { meta: { [endpoint]: { loading: false } } }),
    );
    expect(reducer(priorUsersState, action)).toEqual(result);
  });

  it('should handle DATA_API_FAILURE', () => {
    const endpoint = '/users';
    const action = {
      type: types.DATA_API_FAILURE,
      endpoint,
    };

    expect(reducer(undefined, action)).toEqual({
      meta: {
        [endpoint]: {
          loading: false,
        },
      },
    });
  });

  it('should handle DATA_DELETE', () => {
    const action = {
      type: types.DATA_DELETE,
      kind: 'users',
      ids: ['364'],
    };

    const resultState = Object.assign({}, { ...usersData });
    resultState.users = { 367: usersData.users[367] };

    expect(reducer(usersData, action)).toEqual(resultState);
  });

  it('should handle HYDRATE', () => {
    const action = {
      type: HYDRATE,
      payload: {
        data: {
          camper: { id: '9a48ae4f-ae51-403e-af4f-1a3a353b8935' },
        },
      },
    };

    const initialState = {
      policy: { id: '9a48ae4f-ae51-403e-af4f-1a3a353b8935' },
    };

    const resultState = {
      camper: { id: '9a48ae4f-ae51-403e-af4f-1a3a353b8935' },
      policy: { id: '9a48ae4f-ae51-403e-af4f-1a3a353b8935' },
    };

    expect(reducer(initialState, action)).toEqual(resultState);
  });

  describe('should handle REHYDRATE', () => {
    it('with payload', () => {
      const action = {
        type: REHYDRATE,
        payload: {
          data: {
            camper: { id: '9a48ae4f-ae51-403e-af4f-1a3a353b8935' },
          },
        },
      };

      const initialState = {
        policy: { id: '9a48ae4f-ae51-403e-af4f-1a3a353b8935' },
      };

      const resultState = {
        camper: { id: '9a48ae4f-ae51-403e-af4f-1a3a353b8935' },
        policy: { id: '9a48ae4f-ae51-403e-af4f-1a3a353b8935' },
      };

      expect(reducer(initialState, action)).toEqual(resultState);
    });

    it('without payload', () => {
      const action = {
        type: REHYDRATE,
      };

      const initialState = {
        policy: { id: '9a48ae4f-ae51-403e-af4f-1a3a353b8935' },
      };

      const resultState = {
        policy: { id: '9a48ae4f-ae51-403e-af4f-1a3a353b8935' },
      };

      expect(reducer(initialState, action)).toEqual(resultState);
    });
  });

  it('should handle USER_SIGNOUT', () => {
    const action = {
      type: USER_SIGNOUT,
    };

    const initialState = {
      data: {
        policy: { id: '9a48ae4f-ae51-403e-af4f-1a3a353b8935' },
      },
    };

    expect(reducer(initialState, action)).toEqual({
      meta: {},
    });
  });

  it('should handle DATA_DELETE_ENTITY', () => {
    const action = {
      type: types.DATA_DELETE_ENTITY,
      kind: 'policy',
    };

    const initialState = {
      policy: { id: '9a48ae4f-ae51-403e-af4f-1a3a353b8935' },
    };

    expect(reducer(initialState, action)).toEqual({
      policy: {},
    });
  });

  it('should handle DATA_REMOVE_RELATIONSHIP', () => {
    const action = {
      type: types.DATA_REMOVE_RELATIONSHIP,
      kind: 'camper',
      ownerId: 1,
      relationship: 'documents',
      ids: [2],
    };

    const initialState = {
      camper: {
        1: {
          relationships: {
            documents: {
              data: [
                {
                  id: 2,
                },
              ],
            },
          },
        },
      },
    };

    const expected = {
      camper: {
        1: {
          relationships: {
            documents: {
              data: [],
            },
          },
        },
      },
    };

    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('should handle RESET_CAMPERS_DATA', () => {
    const action = {
      type: RESET_CAMPERS_DATA,
    };

    const initialState = {
      meta: {
        [fetchCampersEndpoint.endpoint]: { loading: false },
      },
    };

    expect(reducer(initialState, action)).toEqual({ meta: {} });
  });

  it('should handle META_REMOVE_ENDPOINT', () => {
    const action = {
      type: types.META_REMOVE_ENDPOINT,
      endpoint: 'test',
    };

    const initialState = {
      meta: {
        test: { loading: false },
      },
    };

    expect(reducer(initialState, action)).toEqual({ meta: {} });
  });
});
