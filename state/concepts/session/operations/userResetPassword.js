import { createLogic } from 'redux-logic';

import assignFormErrors from 'utils/form/assignFormErrors';

import { userResetPasswordEndpoint } from 'state/concepts/session/endpoints';
import { USER_RESET_PASSWORD } from 'state/concepts/session/types';
import { showModal } from 'state/modal/actions';

const userResetPasswordOperation = createLogic({
  type: USER_RESET_PASSWORD,
  latest: true,

  async process({ action: { values, form }, httpClient }, dispatch, done) {
    const { url } = userResetPasswordEndpoint;

    try {
      const params = {
        email: values.email,
      };

      await httpClient.post(url, params);

      dispatch(
        showModal({
          modalType: 'PASSWORD_RECOVERY_MODAL',
          modalProps: { email: values.email },
        }),
      );

      form.resetForm({
        email: '',
      });
    } catch (error) {
      assignFormErrors(form, error);
    }

    form.setSubmitting(false);
    done();
  },
});

export default userResetPasswordOperation;
