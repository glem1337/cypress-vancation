import { omit, pick } from 'ramda';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import formatJsonApiErrors from 'utils/formatJsonApiErrors';

import { userResetPasswordEndpoint } from 'state/concepts/session/endpoints';
import { showModal } from 'state/modal/actions';
import userResetPasswordOperation from '../userResetPassword';
import { resetPasswordErrorResponse } from '../../__mocks__/resetPasswordResponse';

describe('userResetPasswordOperation', () => {
  let dispatch;
  const { url } = userResetPasswordEndpoint;

  const params = {
    email: 'test@example.com',
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
    dispatch = jest.fn();
    userResetPasswordOperation.process(
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
    expect(userResetPasswordOperation)
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

      expect(dispatch).toHaveBeenCalledWith(
        showModal({
          modalType: 'PASSWORD_RECOVERY_MODAL',
          modalProps: {
            ...params,
          },
        }),
      );
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
      expect(dispatch.mock.calls.length).toBe(0);
    });

    it('sets errors', () => {
      const formattedErrors = formatJsonApiErrors(resetPasswordErrorResponse.response.data.errors);
      expect(action.form.setStatus).toHaveBeenCalledWith(pick(['base'], formattedErrors));
      expect(action.form.setErrors).toHaveBeenCalledWith(omit(['base'], formattedErrors));
    });

    it('sets submitting to false', expectSetSubmittingFalse);
  });
});
