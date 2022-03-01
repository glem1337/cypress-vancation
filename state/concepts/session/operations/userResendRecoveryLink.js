import { createLogic } from 'redux-logic';

import { userResetPasswordEndpoint } from 'state/concepts/session/endpoints';
import { RECOVERY_MODAL_NOTIFICATIONS_CONTEXT } from 'state/notifications/notificationsContexts';
import { USER_RESEND_RECOVERY_LINK } from 'state/concepts/session/types';
import assignFormErrors from 'utils/form/assignFormErrors';
import { showNotification } from 'state/notifications/actions';

const userResendRecoveryLink = createLogic({
  type: USER_RESEND_RECOVERY_LINK,
  latest: true,

  async process({ action: { values, form }, httpClient }, dispatch, done) {
    const { url } = userResetPasswordEndpoint;

    form.setStatus(null);

    try {
      const params = {
        email: values.email,
      };

      await httpClient.post(url, params);

      /* TODO - (Should be realized by antd notification component) :start */
      dispatch(
        showNotification({
          context: RECOVERY_MODAL_NOTIFICATIONS_CONTEXT,
          id: 'resend-notification-success',
          messageObject: { id: 'passwordRecoveryModal.resendSuccess' },
        }),
      );
      /* TODO - (Should be realized by antd notification component) :end */
    } catch (error) {
      assignFormErrors(form, error, ['email']);
    }

    form.setSubmitting(false);
    done();
  },
});

export default userResendRecoveryLink;
