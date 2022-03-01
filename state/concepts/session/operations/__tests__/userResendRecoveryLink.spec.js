import { omit, pick } from 'ramda';

import { userResetPasswordEndpoint } from 'state/concepts/session/endpoints';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import formatJsonApiErrors from 'utils/formatJsonApiErrors';

import { RECOVERY_MODAL_NOTIFICATIONS_CONTEXT } from 'state/notifications/notificationsContexts';
import { showNotification } from 'state/notifications/actions';
import userResendRecoveryLinkOperation from '../userResendRecoveryLink';
import { resetPasswordErrorResponse } from '../../__mocks__/resetPasswordResponse';

describe('userResendRecoveryLinkOperation', () => {
  let dispatch;
  const { url } = userResetPasswordEndpoint;

  const params = {
    email: 'test@example.com',
  };

  const notificationParams = {
    id: 'resend-notification-success',
    messageObject: { id: 'passwordRecoveryModal.resendSuccess' },
    context: RECOVERY_MODAL_NOTIFICATIONS_CONTEXT,
  };

  const action = {
    values: {
      ...params,
    },
    form: {
      setErrors: jest.fn(),
      setSubmitting: jest.fn(),
      setStatus: jest.fn(),
    },
  };

  const beforeFunction = (httpClient) => () => {
    jest.clearAllMocks();
    dispatch = jest.fn();
    userResendRecoveryLinkOperation.process(
      {
        action,
        httpClient,
      },
      dispatch,
      jest.fn(),
    );
  };

  const expectSetSubmittingFalse = () => expect(action.form.setSubmitting)
    .toHaveBeenCalledWith(false);

  it('has valid attributes', () => {
    expect(userResendRecoveryLinkOperation)
      .toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'post' });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint with right params', () => {
      expect(httpClient.post)
        .toHaveBeenCalledWith(
          url,
          params,
        );
    });

    it('dispatches actions', () => {
      expect(dispatch)
        .toHaveBeenCalledTimes(1);

      expect(dispatch)
        .toHaveBeenCalledWith(showNotification(notificationParams));
    });

    it('sets submitting to false', expectSetSubmittingFalse);
  });

  describe('failure', () => {
    const httpClient = mockHttpClient({
      method: 'post',
      response: resetPasswordErrorResponse,
      reject: true,
    });

    beforeEach(beforeFunction(httpClient));

    it('does not dispatches actions', () => {
      expect(dispatch).not.toHaveBeenCalled();
    });

    it('sets errors', () => {
      const formattedErrors = formatJsonApiErrors(resetPasswordErrorResponse.response.data.errors);
      expect(action.form.setStatus)
        .toHaveBeenCalledWith(pick(['email'], formattedErrors));
      expect(action.form.setErrors)
        .toHaveBeenCalledWith(omit(['email'], formattedErrors));
    });

    it('sets submitting to false', expectSetSubmittingFalse);
  });
});
