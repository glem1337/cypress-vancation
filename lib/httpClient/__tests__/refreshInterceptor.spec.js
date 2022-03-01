import Axios from 'axios';
import { REFRESH_ROUTE } from 'constants';
import ROUTES from 'constants/routes';
import redirect from 'utils/redirect';

import setCookieIsomorphic from 'utils/setCookieIsomorphic';
import removeCookieIsomorphic from 'utils/removeCookieIsomorphic';

import refreshInterceptor from '../refreshInterceptor';

const mockRetryRequest = config => ({ mock: 'retried request', config });
jest.mock('axios', () => ({
  request: jest.fn(config => mockRetryRequest(config)),
  post: jest.fn(),
}));
const mockRefreshToken = 'refresh token mock';
const mockCookies = {
  access: mockRefreshToken,
  refresh: mockRefreshToken,
};
jest.mock('next-cookies', () => jest.fn(() => mockCookies));
jest.mock('component-cookie');
jest.mock('utils/redirect', () => jest.fn());
jest.mock('utils/setCookieIsomorphic', () => jest.fn());
jest.mock('utils/removeCookieIsomorphic', () => jest.fn());

describe('refreshInterceptor() creates interceptor that', () => {
  const cookieConfig = { path: '/' };

  const ctx = {
    res: jest.fn(),
    store: {
      httpClient: {
        defaults: {
          headers: {
            common: {
              Authorization: 'old token',
            },
          },
        },
      },
    },
  };

  const makeError = (status, url = 'url') => ({
    response: {
      config: {
        headers: {
          Authorization: 'old token',
          url,
        },
      },
      status,
    },
  });

  let interceptorInstance = null;

  beforeEach(() => {
    Axios.post.mockClear();
    Axios.request.mockClear();
    interceptorInstance = refreshInterceptor(ctx);
  });

  const refreshResponse = {
    data: { meta: { jwt: { access: 'new access token' } } },
  };

  describe('Does not refresh', () => {
    it('when error.response is not defined', () => {
      const error = {};
      expect(interceptorInstance(error)).rejects.toEqual(error);
    });

    it('when error.response.config is not defined', () => {
      const error = { response: {} };
      expect(interceptorInstance(error)).rejects.toEqual(error);
    });

    it('when error.response.status is other than 401', () => {
      const error = makeError(422);
      expect(interceptorInstance(error)).rejects.toEqual(error);
    });
  });

  describe('Refresh', () => {
    const error = makeError(401);
    const requestErrors = [makeError(401, '1'), makeError(401, '2'), makeError(401, '3')];

    it('single error ', async () => {
      Axios.post.mockImplementationOnce(() => Promise.resolve(refreshResponse));
      Axios.request.mockImplementationOnce(config => ({ mock: 'retried request', config }));

      await expect(interceptorInstance(error)).resolves
        .toEqual(mockRetryRequest(error.response.config));

      const { access } = refreshResponse.data.meta;

      expect(Axios.post).toHaveBeenCalledWith(REFRESH_ROUTE, {}, { headers: { 'X-Refresh-Token': mockRefreshToken } });
      expect(setCookieIsomorphic).toHaveBeenCalledWith(ctx, 'access', access, cookieConfig);
      expect(ctx.store.httpClient.defaults.headers.common.Authorization).toEqual(`Bearer ${access}`);
      expect(error.response.config.headers.Authorization).toEqual(`Bearer ${access}`);
      expect(Axios.request).toHaveBeenCalledWith(error.response.config);
    });

    it('multiple errors', async () => {
      let resolveRefreshRequest;

      const makeResolveRefreshRequest = resolve => () => resolve(refreshResponse);
      const refreshRequestPromise = new Promise((resolve) => {
        resolveRefreshRequest = makeResolveRefreshRequest(resolve);
      });

      Axios.post.mockImplementationOnce(() => refreshRequestPromise);
      const requestExpectations = requestErrors.map(requestError => expect(
        interceptorInstance(requestError),
      ).resolves.toEqual(mockRetryRequest(requestError.response.config)));
      resolveRefreshRequest();

      await Promise.all(requestExpectations);

      const { access } = refreshResponse.data.meta;

      requestErrors.forEach((requestError, index) => {
        expect(requestError.response.config.headers.Authorization).toEqual(`Bearer ${access}`);
        expect(Axios.request).toHaveBeenNthCalledWith(index + 1, requestError.response.config);
      });
    });

    it('redirect to login when session was over', async () => {
      let rejectRefreshRequest;
      const makeRejectRefreshRequest = reject => () => reject(refreshResponse);
      const refreshRequestPromise = new Promise((resolve, reject) => {
        rejectRefreshRequest = makeRejectRefreshRequest(reject);
      });
      Axios.post.mockImplementationOnce(() => refreshRequestPromise);
      const requestExpectations = requestErrors.map(requestError => expect(
        interceptorInstance(requestError),
      ).rejects.toEqual(requestError));
      rejectRefreshRequest();
      await Promise.all(requestExpectations);

      expect(Axios.post).toHaveBeenCalledWith(REFRESH_ROUTE, {}, { headers: { 'X-Refresh-Token': mockRefreshToken } });
      expect(removeCookieIsomorphic).toHaveBeenCalledTimes(3);
      expect(removeCookieIsomorphic).toHaveBeenNthCalledWith(1, ctx, 'access');
      expect(removeCookieIsomorphic).toHaveBeenNthCalledWith(2, ctx, 'refresh');
      expect(removeCookieIsomorphic).toHaveBeenNthCalledWith(3, ctx, 'currentUser');
      expect(ctx.store.httpClient.defaults.headers.common.Authorization).toBe(null);
      expect(redirect).toHaveBeenCalledWith(ROUTES.LOGIN.PATH, ctx);
      expect(Axios.request).toHaveBeenCalledTimes(0);
    });
  });
});
