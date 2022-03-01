import { omit, pick } from 'ramda';
import Router from 'next/router';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import formatJsonApiErrors from 'utils/formatJsonApiErrors';

import ROUTES from 'constants/routes';

import { userCreateNewPasswordEndpoint } from 'state/concepts/session/endpoints';
import userCreateNewPasswordOperation from '../userCreateNewPassword';
import { resetPasswordErrorResponse } from '../../__mocks__/resetPasswordResponse';

jest.mock('next/router', () => ({ push: jest.fn() }));

describe('userCreateNewPasswordOperation', () => {
  let dispatch;
  const { url } = userCreateNewPasswordEndpoint;

  const params = {
    email_token: 'example-token',
    password: '12345',
  };

  const action = {
    values: {
      ...params,
    },
    form: {
      setErrors: jest.fn(),
      setSubmitting: jest.fn(),
      setStatus: jest.fn(),
      resetForm: jest.fn(),
    },
  };

  const beforeFunction = (httpClient) => (done) => {
    jest.clearAllMocks();
    dispatch = jest.fn(() => done());
    userCreateNewPasswordOperation.process(
      {
        action,
        httpClient,
      },
      dispatch,
      done,
    );
  };

  const expectSetSubmittingFalse = () => expect(action.form.setSubmitting)
    .toHaveBeenCalledWith(false);

  it('has valid attributes', () => {
    expect(userCreateNewPasswordOperation).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'patch' });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint with right params', () => {
      expect(httpClient.patch).toHaveBeenCalledWith(url, params);
    });

    it('reset form', () => {
      expect(action.form.resetForm).toHaveBeenCalledTimes(1);

      expect(action.form.resetForm).toHaveBeenCalledWith({
        password: '',
      });
    });

    it('Router.push()', () => {
      expect(Router.push).toHaveBeenCalledTimes(1);

      expect(Router.push).toHaveBeenCalledWith({
        pathname: ROUTES.LOGIN.PATH,
        query: { passwordUpdate: 'success' },
      });
    });

    it('sets submitting to false', expectSetSubmittingFalse);
  });

  describe('failure', () => {
    const httpClient = mockHttpClient({
      method: 'patch',
      response: resetPasswordErrorResponse,
      reject: true,
    });

    beforeEach(beforeFunction(httpClient));

    it('sets errors', () => {
      const formattedErrors = formatJsonApiErrors(resetPasswordErrorResponse.response.data.errors);
      expect(action.form.setStatus).toHaveBeenCalledWith(pick(['emailToken'], formattedErrors));
      expect(action.form.setErrors).toHaveBeenCalledWith(omit(['emailToken'], formattedErrors));
    });

    it('sets submitting to false', expectSetSubmittingFalse);
  });
});
