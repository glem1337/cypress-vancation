import {
  loadingSelector,
  linksSelector,
  endpointMetaSelector,
  pageCountSelector,
  totalCountSelector,
} from '../selectors';

describe('Data selectors', () => {
  describe('loadingSelector()', () => {
    const state = {
      data: {
        meta: {
          endpoint: { loading: true },
          endpoint1: { loading: false },
        },
      },
    };

    it('returns endpoint loading state', () => {
      expect(loadingSelector(state, 'endpoint')).toEqual(true);
      expect(loadingSelector(state, 'endpoint1')).toEqual(false);
      expect(loadingSelector(state, 'endpoint2')).toEqual(undefined);
    });
  });

  describe('linksSelector()', () => {
    const state = {
      data: {
        meta: {
          endpoint: { links: 'links' },
        },
      },
    };

    it('returns endpoint loading state', () => {
      expect(linksSelector(state, 'endpoint')).toEqual('links');
    });
  });

  describe('endpointMetaSelector()', () => {
    const state = {
      data: {
        meta: {
          endpoint: { meta: 'meta' },
        },
      },
    };

    it('returns endpoint meta data', () => {
      expect(endpointMetaSelector(state, 'endpoint')).toEqual('meta');
    });
  });

  describe('pageCountSelector()', () => {
    const state = {
      data: {
        meta: {
          endpoint: { links: { last: 'user?page=10' } },
        },
      },
    };

    it('returns endpoint loading state', () => {
      expect(pageCountSelector(state, 'endpoint')).toEqual(10);
    });
  });

  describe('totalCountSelector', () => {
    const state = {
      data: {
        meta: {
          endpoint: { meta: { total: 10 } },
        },
      },
    };

    it('returns users total', () => {
      expect(totalCountSelector(state, 'endpoint')).toEqual(10);
    });
  });
});
