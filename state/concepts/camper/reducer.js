import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { REHYDRATE } from 'redux-persist';

import { OWNER_CAMPER_PAGINATION_DEFAULT } from 'constants/dashboard';
import { CAMPER_STATUS } from 'constants/camper';

import * as types from './types';
import { USER_SIGNOUT } from '../session/types';

const estimateEarningData = (state = null, action) => {
  switch (action.type) {
    case types.SET_ESTIMATE_EARNING_DATA:
      return {
        estimatedEarning: action.estimatedEarning,
        iconUrl: action.iconUrl,
        name: action.name,
      };
    case HYDRATE:
    case USER_SIGNOUT:
    case types.CLEAR_ESTIMATE_EARNING_DATA:
      return null;
    default:
      return state;
  }
};

const estimateEarningState = (state = false, action) => {
  switch (action.type) {
    case types.SET_ESTIMATE_EARNING_STATE:
      return action.state;
    case types.SET_ESTIMATE_EARNING_DATA:
      return true;
    default:
      return state;
  }
};

const leavePageMethod = (state = null, action) => {
  switch (action.type) {
    case types.SET_LEAVE_PAGE_METHOD:
      return action.leavePageMethod;
    default:
      return state;
  }
};

const ownerCampersIds = (state = [], action) => {
  switch (action.type) {
    case types.SET_OWNER_CAMPER_IDS:
      return action.camperIds;
    case types.DELETE_OWNER_CAMPER_ID:
      return state.filter((item) => item !== action.camperId);
    default:
      return state;
  }
};

const ownerCampersFirstPortionIds = (state = [], action) => {
  switch (action.type) {
    case types.SET_FIRST_PORTION_CAMPER_IDS:
      return action.camperIds;
    case types.DELETE_FIRST_PORTION_CAMPER_ID:
      return state.filter((item) => item !== action.camperId);
    default:
      return state;
  }
};

const ownerCampersPagination = (
  state = {
    number: OWNER_CAMPER_PAGINATION_DEFAULT.NUMBER,
    size: OWNER_CAMPER_PAGINATION_DEFAULT.SIZE,
    total: OWNER_CAMPER_PAGINATION_DEFAULT.TOTAL,
  },
  action,
) => {
  switch (action.type) {
    case types.SET_OWNER_CAMPERS_PAGE:
      return { ...state, number: action.page };
    case types.SET_OWNER_TOTAL:
      return { ...state, total: action.total };
    case REHYDRATE:
    case HYDRATE:
      return {
        ...state,
        number: OWNER_CAMPER_PAGINATION_DEFAULT.NUMBER,
        size: OWNER_CAMPER_PAGINATION_DEFAULT.SIZE,
      };
    default:
      return state;
  }
};

const ownerCampersFilter = (
  state = {
    status: CAMPER_STATUS.ALL,
    search: '',
  },
  action,
) => {
  switch (action.type) {
    case types.SET_OWNER_CAMPERS_STATUS_FILTER:
      return { ...state, status: action.status };
    case types.SET_OWNER_CAMPERS_SEARCH:
      return { ...state, search: action.search };
    case HYDRATE:
      return {
        status: CAMPER_STATUS.ALL,
        search: '',
      };
    default:
      return state;
  }
};

const camperPricingAndFeesId = (state = null, action) => {
  switch (action.type) {
    case types.SET_CAMPER_PRICING_AND_FEES_ID:
      return action.id;
    case HYDRATE: {
      return null;
    }
    default:
      return state;
  }
};

const camperReducer = combineReducers({
  estimateEarningData,
  estimateEarningState,
  leavePageMethod,
  ownerCampersIds,
  ownerCampersFirstPortionIds,
  ownerCampersPagination,
  ownerCampersFilter,
  camperPricingAndFeesId,
});

export default camperReducer;
