import {
 mergeDeepRight, omit, compose, filter, path, dissocPath,
} from 'ramda';
import { HYDRATE } from 'next-redux-wrapper';
import { REHYDRATE } from 'redux-persist';

import { USER_SIGNOUT } from 'state/concepts/session/types';
import { RESET_CAMPERS_DATA } from 'state/concepts/campervan-rental/types';
import { fetchCampersEndpoint } from 'state/concepts/campervan-rental/endpoints';

import * as types from './types';

const initialState = {
  meta: {},
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DATA_API_REQUEST:
      return mergeDeepRight(state, { meta: { [action.endpoint]: { loading: true } } });
    case types.DATA_API_SUCCESS:
      return mergeDeepRight(
        state,
        mergeDeepRight(action.response, { meta: { [action.endpoint]: { loading: false } } }),
      );
    case types.DATA_API_FAILURE:
      return mergeDeepRight(state, { meta: { [action.endpoint]: { loading: false } } });
    case types.DATA_DELETE:
      return { ...state, [action.kind]: omit(action.ids, state[action.kind]) };
    case types.DATA_DELETE_ENTITY: {
      return { ...state, [action.kind]: {} };
    }
    case types.DATA_REMOVE_RELATIONSHIP:
      return mergeDeepRight(state, {
        [action.kind]: {
          [action.ownerId]: {
            relationships: {
              [action.relationship]: {
                data: compose(
                  filter((item) => !action.ids.includes(item.id)),
                  path([
                    action.kind,
                    action.ownerId,
                    'relationships',
                    action.relationship,
                    'data',
                  ]),
                )(state),
              },
            },
          },
        },
      });
    case HYDRATE: {
      return mergeDeepRight(state, action.payload.data);
    }
    case REHYDRATE: {
      if (!action.payload?.data) {
        return state;
      }
      return mergeDeepRight(action.payload.data, state);
    }
    case USER_SIGNOUT: {
      return initialState;
    }
    case types.META_REMOVE_ENDPOINT: {
      return dissocPath(['meta', action.endpoint], state);
    }
    case RESET_CAMPERS_DATA: {
      return dissocPath(['meta', fetchCampersEndpoint.endpoint], state);
    }
    default:
      return state;
  }
};

export default dataReducer;
