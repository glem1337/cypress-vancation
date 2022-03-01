import tokenInterceptor from 'lib/httpClient/tokenInterceptor';
import { clone } from 'ramda';

import mountInterceptors from '../mountInterceptors';

jest.mock('lib/httpClient/tokenInterceptor', () => jest.fn());
jest.mock('../refreshInterceptor', () => jest.fn(() => 'refreshInterceptor'));

describe('mountInterceptors()', () => {
  const ctxDefault = {
    store: {
      httpClient: {
        interceptors: {
          request: {
            use: () => jest.fn(),
          },
          response: {
            use: jest.fn(),
            handlers: {},
          },
        },
      },
    },
  };

  const ctx = (handlers = {}) => {
   const cloneCtx = clone(ctxDefault);
    cloneCtx.store.httpClient.interceptors.response.handlers = handlers;

   return cloneCtx;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('snapshot', () => {
    expect(mountInterceptors).toMatchSnapshot();
  });

  describe('tokenInterceptor()', () => {
    it('else header is not empty', () => {
      mountInterceptors(ctx());
      expect(tokenInterceptor).toHaveBeenCalledTimes(1);
      expect(tokenInterceptor).toHaveBeenCalledWith(ctx());
    });

    it('should attach refresh listeners', () => {
      mountInterceptors(ctxDefault);

      expect(
        ctxDefault.store.httpClient.interceptors.response.use,
      ).toHaveBeenCalledWith(null, 'refreshInterceptor');
    });
  });
});
