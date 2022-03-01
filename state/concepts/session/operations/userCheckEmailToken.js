import { createLogic } from 'redux-logic';

import { userCheckEmailTokenEndpoint } from 'state/concepts/session/endpoints';
import { USER_CHECK_EMAIL_TOKEN } from 'state/concepts/session/types';
import { showModal } from 'state/modal/actions';
import {
  dataApiFailure,
  dataApiRequest,
  dataApiSuccess,
} from 'state/data/actions';

const userCheckEmailToken = createLogic({
  type: USER_CHECK_EMAIL_TOKEN,
  latest: true,

  async process(
    // eslint-disable-next-line camelcase
    { action: { token: email_token }, httpClient },
    dispatch,
    done,
  ) {
    const { url, endpoint } = userCheckEmailTokenEndpoint;
    dispatch(dataApiRequest({ endpoint }));

    try {
      const params = { email_token, password: null };
      await httpClient.patch(url, params);

      dispatch(dataApiSuccess({ endpoint }));
    } catch ({ response: { status } }) {
      if (status === 404) {
        dispatch(
          showModal({
            modalType: 'EMAIL_TOKEN_EXPIRED_MODAL',
          }),
        );
      }

      dispatch(dataApiFailure({ endpoint }));
    }

    done();
  },
});

export default userCheckEmailToken;
