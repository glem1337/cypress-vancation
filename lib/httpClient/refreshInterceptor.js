import Axios from 'axios';
import cookies from 'next-cookies';

import { REFRESH_ROUTE } from 'constants';
import ROUTES from 'constants/routes';
import setCookieIsomorphic from 'utils/setCookieIsomorphic';
import removeCookieIsomorphic from 'utils/removeCookieIsomorphic';
import redirect from 'utils/redirect';

const refreshInterceptor = (ctx) => {
  let requestsPool = [];
  let isRefreshing = false;
  const subscribeToRefresh = listener => requestsPool.push(listener);
  const finishRefresh = (accessToken) => {
    requestsPool.map(listener => listener(accessToken));
    isRefreshing = false;
    requestsPool = [];
  };
  return async (error) => {
    const retryConfig = error.response && error.response.config;

    if (error.response && retryConfig && error.response.status === 401) {
      const defferedOriginalRequest = new Promise((resolve, reject) => {
        // eslint-disable-next-line consistent-return
        subscribeToRefresh((accessToken) => {
          if (!accessToken) { return reject(error); }
          retryConfig.headers.Authorization = accessToken;
          resolve(Axios.request(retryConfig));
        });
      });
      if (isRefreshing) { return defferedOriginalRequest; }
      try {
        isRefreshing = true;
        const { refresh } = cookies(ctx);

        const response = await Axios.post(REFRESH_ROUTE, {}, { headers: { 'X-Refresh-Token': refresh } });

        setCookieIsomorphic(ctx, 'access', response.data.meta.access, { path: '/' });
        const newAuthHeader = `Bearer ${response.data.meta.access}`;
        ctx.store.httpClient.defaults.headers.common.Authorization = `Bearer ${response.data.meta.access}`;
        finishRefresh(newAuthHeader);
      } catch (e) {
        /* istanbul ignore next */
        if (typeof jest === 'undefined') {
          console.log('refreshInterceptor error', e); // eslint-disable-line no-console
        }
        ctx.store.httpClient.defaults.headers.common.Authorization = null;
        removeCookieIsomorphic(ctx, 'access');
        removeCookieIsomorphic(ctx, 'refresh');
        removeCookieIsomorphic(ctx, 'currentUser');
        redirect(ROUTES.LOGIN.PATH, ctx);
        finishRefresh(null);
      }
      return defferedOriginalRequest;
    }
    return Promise.reject(error);
  };
};
export default refreshInterceptor;
