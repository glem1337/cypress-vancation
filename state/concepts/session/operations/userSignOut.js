import { createLogic } from 'redux-logic';
import cookies from 'component-cookie';
import { USER_SIGNOUT } from 'state/concepts/session/types';
import removeUserCookies from 'utils/removeUserCookies';
import redirect from 'utils/redirect';
import ROUTES from 'constants/routes';
import { userSignOutEndpoint } from '../endpoints';
import { userSignOutSuccess } from '../actions';

const userSignOut = createLogic({
  type: USER_SIGNOUT,
  latest: true,

  async process({ httpClient }, dispatch, done) {
    const { url } = userSignOutEndpoint;
    const token = cookies('refresh');

    try {
      removeUserCookies();
      dispatch(userSignOutSuccess());
      redirect(ROUTES.INDEX.PATH);

      httpClient.delete(url, {
        headers: {
          'X-Refresh-Token': token,
        },
      });
    } catch (error) {
      // TODO - Need handler errors from the server
    }

    done();
  },
});

export default userSignOut;
