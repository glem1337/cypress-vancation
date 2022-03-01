import { HYDRATE } from 'next-redux-wrapper';
import { REHYDRATE } from 'redux-persist';

import { CAMPER_STATUS } from 'constants/camper';
import { OWNER_CAMPER_PAGINATION_DEFAULT } from 'constants/dashboard';

import reducer from '../reducer';
import * as types from '../types';
import { USER_SIGNOUT } from '../../session/types';
import fetchOwnerCampersMocked from '../__mocks__/fetchOwnerCampers';

describe('Camper', () => {
  describe('estimateEarningData reducer', () => {
    const initialState = {
      estimateEarningData: null,
    };

    it('should handle SET_ESTIMATE_EARNING_DATA', () => {
      const params = {
        name: 'test_name',
        estimatedEarning: 120.0,
        iconUrl: 'test_url',
      };

      const action = {
        type: types.SET_ESTIMATE_EARNING_DATA,
        ...params,
      };

      expect(reducer(initialState, action).estimateEarningData).toEqual(params);
    });

    it('should handle CLEAR_ESTIMATE_EARNING_DATA', () => {
      const action = {
        type: types.CLEAR_ESTIMATE_EARNING_DATA,
      };

      expect(reducer(initialState, action).estimateEarningData).toEqual(null);
    });

    it('should handle USER_SIGNOUT', () => {
      const action = {
        type: USER_SIGNOUT,
      };

      expect(reducer(initialState, action).estimateEarningData).toEqual(null);
    });

    it('should handle HYDRATE', () => {
      const action = {
        type: HYDRATE,
      };

      expect(reducer(initialState, action).estimateEarningData).toEqual(null);
    });
  });

  describe('estimateEarningState reducer', () => {
    const initialState = {
      estimateEarningState: false,
    };

    it('should handle SET_ESTIMATE_EARNING_STATE', () => {
      const action = {
        type: types.SET_ESTIMATE_EARNING_STATE,
        state: true,
      };

      expect(reducer(initialState, action).estimateEarningState).toEqual(action.state);
    });

    it('should handle SET_ESTIMATE_EARNING_DATA', () => {
      const action = {
        type: types.SET_ESTIMATE_EARNING_DATA,
      };

      expect(reducer(initialState, action).estimateEarningState).toEqual(true);
    });
  });

  describe('leavePageMethod reducer', () => {
   it('should handle SET_SIDEBAR_VISIBILITY', () => {
      const action = {
        type: types.SET_LEAVE_PAGE_METHOD,
        leavePageMethod: 'test',
      };

      expect(reducer(undefined, action).leavePageMethod).toBe('test');
    });
  });

  describe('ownerCampersIds reducer', () => {
    it('should handle SET_OWNER_CAMPERS', () => {
      const action = {
        type: types.SET_OWNER_CAMPER_IDS,
        camperIds: [
          fetchOwnerCampersMocked.data.data[0].id,
          fetchOwnerCampersMocked.data.data[1].id,
        ],
      };

      expect(reducer(undefined, action).ownerCampersIds)
        .toEqual(action.camperIds);
    });

    it('should handle DELETE_OWNER_CAMPER_ID', () => {
      const action = {
        type: types.DELETE_OWNER_CAMPER_ID,
        camperId: 'id',
      };

      expect(
        reducer({ ownerCampersIds: ['id'] }, action).ownerCampersIds.length,
      ).toBe(0);
    });
  });

  describe('ownerCampersLastEditIds reducer', () => {
    it('should handle SET_OWNER_CAMPERS_LAST_EDIT', () => {
      const action = {
        type: types.SET_FIRST_PORTION_CAMPER_IDS,
        camperIds: [
          fetchOwnerCampersMocked.data.data[0].id,
          fetchOwnerCampersMocked.data.data[1].id,
        ],
      };

      expect(reducer(undefined, action).ownerCampersFirstPortionIds)
        .toEqual(action.camperIds);
    });

    it('should handle DELETE_FIRST_PORTION_CAMPER_ID', () => {
      const action = {
        type: types.DELETE_FIRST_PORTION_CAMPER_ID,
        camperId: 'id',
      };

      expect(
        reducer({ ownerCampersFirstPortionIds: ['id'] }, action)
          .ownerCampersFirstPortionIds.length,
      ).toBe(0);
    });
  });

  describe('ownerCampersPagination reducer', () => {
    it('should handle SET_OWNER_CAMPERS_LAST_EDIT', () => {
      const action = {
        type: types.SET_OWNER_CAMPERS_PAGE,
        page: 2,
      };

      expect(reducer(undefined, action).ownerCampersPagination)
        .toEqual({
          number: 2,
          size: OWNER_CAMPER_PAGINATION_DEFAULT.SIZE,
          total: OWNER_CAMPER_PAGINATION_DEFAULT.TOTAL,
        });
    });

    it('should handle SET_OWNER_TOTAL', () => {
      const action = {
        type: types.SET_OWNER_TOTAL,
        total: 10,
      };

      expect(reducer(undefined, action).ownerCampersPagination)
        .toEqual({
          number: OWNER_CAMPER_PAGINATION_DEFAULT.NUMBER,
          size: OWNER_CAMPER_PAGINATION_DEFAULT.SIZE,
          total: 10,
        });
    });

    it('should handle HYDRATE', () => {
      const action = {
        type: HYDRATE,
      };

      const state = {
        ownerCampersPagination: {
          number: 1,
          size: 10,
          total: 3,
        },
      };

      expect(reducer(state, action).ownerCampersPagination)
        .toEqual({
          ...state.ownerCampersPagination,
          number: OWNER_CAMPER_PAGINATION_DEFAULT.NUMBER,
          size: OWNER_CAMPER_PAGINATION_DEFAULT.SIZE,
        });
    });

    it('should handle REHYDRATE', () => {
      const action = {
        type: REHYDRATE,
      };

      const state = {
        ownerCampersPagination: {
          number: 1,
          size: 10,
          total: 3,
        },
      };

      expect(reducer(state, action).ownerCampersPagination)
        .toEqual({
          ...state.ownerCampersPagination,
          number: OWNER_CAMPER_PAGINATION_DEFAULT.NUMBER,
          size: OWNER_CAMPER_PAGINATION_DEFAULT.SIZE,
        });
    });
  });

  describe('ownerCampersFilter reducer', () => {
    it('should handle HYDRATE', () => {
      const action = {
        type: HYDRATE,
      };

      expect(reducer(undefined, action).ownerCampersFilter).toEqual({
        status: CAMPER_STATUS.ALL,
        search: '',
      });
    });

    it('should handle SET_OWNER_CAMPERS_STATUS_FILTER', () => {
      const action = {
        type: types.SET_OWNER_CAMPERS_STATUS_FILTER,
        status: CAMPER_STATUS.PUBLISHED,
      };

      expect(reducer(undefined, action).ownerCampersFilter).toEqual({
        status: CAMPER_STATUS.PUBLISHED,
        search: '',
      });
    });

    it('should handle SET_OWNER_CAMPERS_SEARCH', () => {
      const action = {
        type: types.SET_OWNER_CAMPERS_SEARCH,
        search: 'search',
      };

      expect(reducer(undefined, action).ownerCampersFilter).toEqual({
        search: 'search',
        status: 'all',
      });
    });
  });

  describe('camperPricingAndFeesId reducer', () => {
    it('should handle HYDRATE', () => {
      const action = {
        type: HYDRATE,
        payload: {
          camper: {
            camperPricingAndFeesId: 123,
          },
        },
      };

      expect(reducer(undefined, action).camperPricingAndFeesId).toBe(null);
    });

    it('should handle SET_CAMPER_PRICING_AND_FEES_ID', () => {
      const action = {
        type: types.SET_CAMPER_PRICING_AND_FEES_ID,
        id: 456,
      };

      expect(reducer(undefined, action).camperPricingAndFeesId).toBe(456);
    });
  });
});
