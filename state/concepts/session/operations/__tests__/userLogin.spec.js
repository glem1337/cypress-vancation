import { userSessionRoute } from 'lib/apiRoutes';
import { omit, pick } from 'ramda';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import formatJsonApiErrors from 'utils/formatJsonApiErrors';
import { currentUserSuccessResponse } from '../../__mocks__/currentUser';
import { loginErrorResponse } from '../../__mocks__/loginResponse';
import userLoginOperation from '../userLogin';

describe('userLoginOperation', () => {
  let dispatch;

  const params = {
    email: 'test@example.com',
    password: 'password',
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

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    userLoginOperation.process({ action, httpClient }, dispatch, jest.fn());
  };

  const expectSetSubmittingFalse = () => expect(action.form.setSubmitting)
    .toHaveBeenCalledWith(false);

  it('has valid attributes', () => {
    expect(userLoginOperation).toMatchSnapshot();
  });

  describe('success dispatch success dispatch userCreateSession', () => {
    const httpClient = mockHttpClient({ method: 'post', response: currentUserSuccessResponse.data });

    httpClient.defaults = { headers: { common: {} } };
    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint with right params', () => {
      expect(httpClient.post).toHaveBeenCalledWith(userSessionRoute, params);
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
    const httpClient = mockHttpClient({ method: 'post', response: loginErrorResponse, reject: true });

    beforeEach(beforeFunction(httpClient));

    it('does not dispatches actions', () => {
      expect(dispatch.mock.calls.length).toBe(0);
    });

    it('sets errors', () => {
      const formattedErrors = formatJsonApiErrors(loginErrorResponse.response.data.errors);
      expect(action.form.setStatus).toHaveBeenCalledWith(pick(['base'], formattedErrors));
      expect(action.form.setErrors).toHaveBeenCalledWith(omit(['base'], formattedErrors));
    });

    it('sets submitting to false', expectSetSubmittingFalse);
  });
});
