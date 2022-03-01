import reducer from '../reducer';
import * as types from '../types';

describe('Users', () => {
  describe('userIds reducer', () => {
    it('should return initial state', () => {
      expect(reducer(undefined, {}).userIds).toEqual([]);
    });

    it('should handle SET_USERS', () => {
      const action = {
        type: types.SET_USERS,
        userIds: ['id'],
      };

      expect(reducer(undefined, action).userIds).toEqual(['id']);
    });
  });

  describe('pagination reducer', () => {
    const initialState = {
      number: 1,
      size: 20,
    };

    it('should return initial state', () => {
      expect(reducer(undefined, {}).pagination).toEqual(initialState);
    });

    it('should handle SET_USERS_PAGE', () => {
      const action = {
        type: types.SET_USERS_PAGE,
        pageNumber: 2,
      };

      expect(reducer(undefined, action).pagination).toEqual({ number: 2, size: 20 });
    });
  });

  describe('filters reducer', () => {
    const initialState = {
      name: '',
      roles: [],
      statuses: [],
    };

    it('should return initial state', () => {
      expect(reducer(undefined, {}).filters).toEqual(initialState);
    });

    it('should handle SET_USERS_FILTER_PARAMS', () => {
      const action = {
        type: types.SET_USERS_FILTER_PARAMS,
        filterParams: { name: 'name' },
      };

      expect(reducer(undefined, action).filters).toEqual({ ...initialState, name: 'name' });
    });
  });

  describe('sort reducer', () => {
    const initialState = { sortKey: 'name', direction: 'asc' };

    it('should return initial state', () => {
      expect(reducer(undefined, {}).sort).toEqual(initialState);
    });

    describe('when action sortKey equals state sortKey', () => {
      it('should handle SET_USERS_SORT_ORDER', () => {
        const action = {
          type: types.SET_USERS_SORT_ORDER,
          sortKey: 'name',
        };

        expect(reducer(undefined, action).sort).toEqual({ sortKey: 'name', direction: 'desc' });
      });
    });

    describe('when action sortKey does not equals state sortKey', () => {
      it('should handle SET_USERS_SORT_ORDER', () => {
        const action = {
          type: types.SET_USERS_SORT_ORDER,
          sortKey: 'fullName',
        };

        expect(reducer(undefined, action).sort).toEqual({ sortKey: 'fullName', direction: 'asc' });
      });
    });
  });
});
