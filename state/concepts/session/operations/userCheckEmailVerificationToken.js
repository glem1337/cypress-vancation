import { createLogic } from 'redux-logic';

import ROUTES from 'constants/routes';

import redirect from 'utils/redirect';
import showErrorNotifications from 'utils/showErrorNotifications';

import { userCheckEmailVerificationTokenEndpoint } from 'state/concepts/session/endpoints';
import { USER_CHECK_EMAIL_VERIFICATION_TOKEN } from 'state/concepts/session/types';
import { userSetEmailVerification } from 'state/concepts/session/actions';
import {
  dataApiFailure,
  dataApiRequest,
  dataApiSuccess,
} from 'state/data/actions';
import { showMessage } from 'state/flash-messages/actions';

const userCheckEmailVerificationToken = createLogic({
  type: USER_CHECK_EMAIL_VERIFICATION_TOKEN,
  latest: true,

  async process({ action: { token }, httpClient }, dispatch, done) {
    const { url, endpoint } = userCheckEmailVerificationTokenEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const params = { email_token: token };
      await httpClient.get(url, { params });

      dispatch(dataApiSuccess({ endpoint }));
      dispatch(
        showMessage({
          messageSubTitle: {
            id: 'shared.emailVerified',
          },
        }),
      );
      dispatch(userSetEmailVerification(true));
    } catch (error) {
      const {
        response: { status },
      } = error;

      dispatch(dataApiFailure({ endpoint, error }));

      if (status === 422) {
        redirect(ROUTES.INDEX.PATH);
      } else {
        showErrorNotifications(error, dispatch);
      }
    }

    done();
  },
});

export default userCheckEmailVerificationToken;
