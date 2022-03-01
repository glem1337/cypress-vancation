import { omit, pick } from 'ramda';
import { userRegistrationRoute } from 'lib/apiRoutes';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import formatJsonApiErrors from 'utils/formatJsonApiErrors';
import { signUpErrorResponse } from '../../__mocks__/signUpResponse';
import { currentUserSuccessResponse } from '../../__mocks__/currentUser';
import userSignUpOperation from '../userSignUp';

describe('userSignUpOperation', () => {
  let dispatch;

  const params = {
    email: 'test@example.com',
    password: 'password',
    phone_number: '12345648979',
    user: {
      first_name: 'Foo',
      last_name: 'Bar',
    },
  };

  const action = {
    values: {
      email: 'test@example.com',
      password: 'password',
      phoneNumber: '12345648979',
      firstName: 'Foo',
      lastName: 'Bar',
    },
    form: {
      setErrors: jest.fn(),
      setSubmitting: jest.fn(),
      setStatus: jest.fn(),
    },
  };

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    userSignUpOperation.process({ httpClient, action }, dispatch, jest.fn());
  };

  const expectSetSubmittingFalse = () => expect(action.form.setSubmitting)
    .toHaveBeenCalledWith(false);

  it('has valid attributes', () => {
    expect(userSignUpOperation).toMatchSnapshot();
  });

  describe('success dispatch userCreateSession', () => {
    const httpClient = mockHttpClient({ method: 'post', response: currentUserSuccessResponse.data });

    httpClient.defaults = { headers: { common: {} } };
    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint with right params', () => {
      expect(httpClient.post).toHaveBeenCalledWith(userRegistrationRoute, params);
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenCalledWith({
        type: 'session/USER_CREATE_SESSION',
        isServer: false,
        sessionData: currentUserSuccessResponse.data.data,
      });
    });

    it('sets submitting to false', expectSetSubmittingFalse);
  });

  describe('failure', () => {
    const httpClient = mockHttpClient({ method: 'post', response: signUpErrorResponse, reject: true });

    beforeEach(beforeFunction(httpClient));

    it('does not dispatches actions', () => {
      expect(dispatch.mock.calls.length).toBe(0);
    });

    it('sets errors', () => {
      const formattedErrors = formatJsonApiErrors(signUpErrorResponse.response.data.errors);
      expect(action.form.setStatus).toHaveBeenCalledWith(pick(['base'], formattedErrors));
      expect(action.form.setErrors).toHaveBeenCalledWith(omit(['base'], formattedErrors));
    });

    it('sets submitting to false', expectSetSubmittingFalse);
  });
});
