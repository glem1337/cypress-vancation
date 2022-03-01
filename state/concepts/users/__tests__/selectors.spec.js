import normalize from 'json-api-normalizer';
import build from 'redux-object';
import * as selectors from '../selectors';
import fetchUsersResponse from '../__mocks__/fetchUsersResponse';

describe('Users selectors', () => {
  describe('usersSelector()', () => {
    const state = {
      data: normalize(fetchUsersResponse.data),
      users: {
        userIds: [fetchUsersResponse.data.data[0].id],
      },
    };

    it('returns fetched users', () => {
      expect(selectors.usersSelector(state)).toMatchSnapshot();
    });
  });

  describe('paginationSelector()', () => {
    const state = {
      users: {
        pagination: 'pagination',
      },
    };

    it('returns users pagination', () => {
      expect(selectors.paginationSelector(state)).toEqual('pagination');
    });
  });

  describe('currentPageSelector()', () => {
    const state = {
      users: {
        pagination: {
          number: 2,
        },
      },
    };

    it('returns users page number', () => {
      expect(selectors.currentPageSelector(state)).toEqual(2);
    });
  });

  describe('filtersSelector()', () => {
    const state = {
      users: {
        filters: 'filters',
      },
    };

    it('returns users filter params', () => {
      expect(selectors.filtersSelector(state)).toEqual('filters');
    });
  });

  describe('searchQuerySelector()', () => {
    const state = {
      users: {
        filters: { name: 'name' },
      },
    };

    it('returns users filter search param', () => {
      expect(selectors.searchQuerySelector(state)).toEqual('name');
    });
  });

  describe('sortSelector()', () => {
    const state = {
      users: {
        sort: 'sort',
      },
    };

    it('returns users sort', () => {
      expect(selectors.sortSelector(state)).toEqual('sort');
    });
  });

  describe('sortParamsSelector()', () => {
    describe('when direction id asc', () => {
      const state = {
        users: {
          sort: { sortKey: 'name', direction: 'asc' },
        },
      };

      it('returns sortKey', () => {
        expect(selectors.sortParamsSelector(state)).toEqual('name');
      });
    });

    describe('when direction is desc', () => {
      const state = {
        users: {
          sort: { sortKey: 'name', direction: 'desc' },
        },
      };

      it('returns sortKey with minus sign', () => {
        expect(selectors.sortParamsSelector(state)).toEqual('-name');
      });
    });
  });

  describe('appliedFilters()', () => {
    const state = {
      users: {
        filters: {
          name: 'name',
          roles: ['admin'],
          statuses: ['active', 'pending'],
        },
      },
    };

    it('returns users filters without considering filter', () => {
      expect(selectors.appliedFilters(state)).toEqual(['admin', 'active', 'pending']);
    });
  });
});

describe('userSelector()', () => {
  const userId = fetchUsersResponse.data.data[0].id;
  const state = {
    data: normalize(fetchUsersResponse.data),
  };

  it('returns user by id', () => {
    expect(selectors.userSelector(state, userId)).toEqual(build(state.data, 'users', userId));
  });
});
