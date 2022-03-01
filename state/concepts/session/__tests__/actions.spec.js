import assertFormSubmitAction from 'utils/testHelpers/assertFormSubmitAction';
import * as actions from '../actions';
import { currentUserSuccessResponse } from '../__mocks__/currentUser';

it('userLogin()', () => {
  assertFormSubmitAction(actions.userLogin, 'session/USER_LOGIN');
});

it('userLoginSuccess()', () => {
  const currentUser = { id: '777', firstName: 'FName', lastName: 'LName' };
  const expectedAction = { type: 'session/USER_LOGIN_SUCCESS', currentUser };

  expect(actions.userLoginSuccess(currentUser)).toEqual(expectedAction);
});

it('userSignUp()', () => {
  assertFormSubmitAction(actions.userSignUp, 'session/USER_SIGNUP');
});

it('userAuthSocial()', () => {
  const sessionData = { social: 'test_social', token: 'test_token' };
  const expectedAction = { type: 'session/USER_AUTH_SOCIAL', ...sessionData };

  expect(actions.userAuthSocial(sessionData)).toEqual(expectedAction);
});

it('userSignUpSuccess()', () => {
  const currentUser = { id: '777', firstName: 'FName', lastName: 'LName' };
  const expectedAction = { type: 'session/USER_LOGIN_SUCCESS', currentUser };

  expect(actions.userLoginSuccess(currentUser)).toEqual(expectedAction);
});

it('userSignOut()', () => {
  const expectedAction = { type: 'session/USER_SIGNOUT' };

  expect(actions.userSignOut()).toEqual(expectedAction);
});

it('userCreateSession()', () => {
  const expectedAction = {
    type: 'session/USER_CREATE_SESSION',
    sessionData: currentUserSuccessResponse,
    isServer: false,
    redirectRoute: 'Test redirectRoute',
  };

  expect(actions.userCreateSession(
    currentUserSuccessResponse,
    false,
    'Test redirectRoute',
  )).toEqual(expectedAction);
});

it('userResetPassword()', () => {
  assertFormSubmitAction(actions.userResetPassword, 'session/USER_RESET_PASSWORD');
});

it('userResendRecoveryLink()', () => {
  assertFormSubmitAction(actions.userResendRecoveryLink, 'session/USER_RESEND_RECOVERY_LINK');
});

it('userCreateNewPassword()', () => {
  assertFormSubmitAction(actions.userCreateNewPassword, 'session/USER_CREATE_NEW_PASSWORD');
});

it('userCheckEmailToken()', () => {
  const token = 'token';
  const expectedAction = {
    type: 'session/USER_CHECK_EMAIL_TOKEN',
    token,
  };
  expect(actions.userCheckEmailToken(token)).toEqual(expectedAction);
});

it('userCheckEmailVerificationToken()', () => {
  const token = 'token';
  const expectedAction = {
    type: 'session/USER_CHECK_EMAIL_VERIFICATION_TOKEN',
    token,
  };
  expect(actions.userCheckEmailVerificationToken(token)).toEqual(
    expectedAction,
  );
});

it('userSetEmailVerification()', () => {
  const expectedAction = {
    type: 'session/USER_SET_EMAIL_VERIFICATION',
    verified: true,
  };
  expect(actions.userSetEmailVerification(true)).toEqual(
    expectedAction,
  );
});
