import * as R from 'ramda';
import normalize from 'json-api-normalizer';
import build from 'redux-object';
import { createLogic } from 'redux-logic';

import ROUTES, { AUTH_ROUTES } from 'constants/routes';
import { USER_CREATE_SESSION } from 'state/concepts/session/types';
import { userLoginSuccess } from 'state/concepts/session/actions';
import { dataApiSuccess } from 'state/data/actions';
import { prevPageSelector } from 'state/app/selectors';
import redirect from 'utils/redirect';
import setUserCookies from 'utils/setUserCookies';
import setAuthorizationHeader from 'utils/setAuthorizationHeader';
import isPresent from 'utils/isPresent';

const userCreateSession = createLogic({
  type: USER_CREATE_SESSION,
  latest: true,

  process({
    action: { sessionData, isServer, redirectRoute },
    httpClient,
    getState,
  }, dispatch, done) {
    const response = normalize(sessionData);
    const currentUser = build(response, 'account')[0];
    const prevPage = prevPageSelector(getState());

    // Detect redirect route
    const route = R.cond([
      [
        () => isPresent(redirectRoute),
        R.always(redirectRoute),
      ],
      [
        () => isPresent(prevPage),
        () => {
          if (R.includes(prevPage, AUTH_ROUTES)) {
            return ROUTES.INDEX.PATH;
          }

          return prevPage;
        },
      ],
      [
        R.T,
        R.always(ROUTES.INDEX.PATH),
      ],
    ])();

    if (!isServer) {
      setUserCookies(currentUser, sessionData.meta);
      setAuthorizationHeader(httpClient, sessionData.meta.access);
    }

    dispatch(userLoginSuccess(currentUser));
    dispatch(dataApiSuccess({ response }));

    redirect(route);
    done();
  },
});

export default userCreateSession;
