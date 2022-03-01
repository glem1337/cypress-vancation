import { createLogic } from 'redux-logic';

import { dataApiFailure, dataApiRequest } from 'state/data/actions';
import { USER_AUTH_SOCIAL } from 'state/concepts/session/types';
import { userAuthSocialEndpoint } from 'state/concepts/session/endpoints';
import { userCreateSession } from 'state/concepts/session/actions';
import showErrorNotifications from 'utils/showErrorNotifications';

const userAuthSocial = createLogic({
  type: USER_AUTH_SOCIAL,
  latest: true,

  async process({ action: { token, social, redirectRoute }, httpClient }, dispatch, done) {
    const { url, endpoint } = userAuthSocialEndpoint(social);

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.post(url, null, {
        headers: {
          'Social-Net-Token': token,
        },
      });

      dispatch(userCreateSession(data, false, redirectRoute));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint }));
      showErrorNotifications(error, dispatch);
    }
    done();
  },
});

export default userAuthSocial;
