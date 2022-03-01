import { isEmpty } from 'ramda';

import tokenInterceptor from './tokenInterceptor';
import refreshInterceptor from './refreshInterceptor';

// run from _app.js to add interceptor for authorization token expiration error, etc.,
// mounted on first _app getInitialProps run on server or didMount
// on client, so changes require app reload to take effect
const mountInterceptors = (ctx) => {
  /* istanbul ignore next */
  // eslint-disable-next-line no-useless-return
  if (!isEmpty(ctx.store.httpClient.interceptors.response.handlers)) return;

  ctx.store.httpClient.interceptors.response.use(null, refreshInterceptor(ctx));
  ctx.store.httpClient.interceptors.request.use(tokenInterceptor(ctx), null);
};

export default mountInterceptors;
