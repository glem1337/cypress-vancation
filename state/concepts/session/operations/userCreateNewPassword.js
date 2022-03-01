import { createLogic } from 'redux-logic';
import Router from 'next/router';

import { userCreateNewPasswordEndpoint } from 'state/concepts/session/endpoints';
import ROUTES from 'constants/routes';

import { USER_CREATE_NEW_PASSWORD } from 'state/concepts/session/types';
import assignFormErrors from 'utils/form/assignFormErrors';

const userCreateNewPassword = createLogic({
  type: USER_CREATE_NEW_PASSWORD,
  latest: true,

  async process({ action: { values, form }, httpClient }, dispatch, done) {
    const { url } = userCreateNewPasswordEndpoint;

    form.setStatus(null);

    try {
      const params = {
        email_token: values.email_token,
        password: values.password,
      };

      await httpClient.patch(url, params);

      form.resetForm({
        password: '',
      });

      Router.push({
        pathname: ROUTES.LOGIN.PATH,
        query: { passwordUpdate: 'success' },
      });
    } catch (error) {
      assignFormErrors(form, error, ['emailToken']);
    }

    form.setSubmitting(false);
    done();
  },
});

export default userCreateNewPassword;
