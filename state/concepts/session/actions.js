import makeFormSubmitAction from 'utils/form/makeFormSubmitAction';
import * as types from './types';

export const userLogin = makeFormSubmitAction(types.USER_LOGIN);

export const userLoginSuccess = currentUser => ({
  type: types.USER_LOGIN_SUCCESS,
  currentUser,
});

export const userSignUp = makeFormSubmitAction(types.USER_SIGNUP);

export const userAuthSocial = ({ social, token, redirectRoute }) => ({
  type: types.USER_AUTH_SOCIAL,
  social,
  token,
  redirectRoute,
});

export const userSignOut = () => ({
  type: types.USER_SIGNOUT,
});

export const userSignOutSuccess = () => ({
  type: types.USER_LOGOUT_SUCCESS,
});

export const userCreateSession = (sessionData, isServer = false, redirectRoute) => ({
  type: types.USER_CREATE_SESSION,
  sessionData,
  isServer,
  redirectRoute,
});

export const userResetPassword = makeFormSubmitAction(
  types.USER_RESET_PASSWORD,
);

export const userResendRecoveryLink = makeFormSubmitAction(
  types.USER_RESEND_RECOVERY_LINK,
);

export const userCreateNewPassword = makeFormSubmitAction(
  types.USER_CREATE_NEW_PASSWORD,
);

export const userCheckEmailToken = (token) => ({
  type: types.USER_CHECK_EMAIL_TOKEN,
  token,
});

export const userCheckEmailVerificationToken = (token) => ({
  type: types.USER_CHECK_EMAIL_VERIFICATION_TOKEN,
  token,
});

export const userSetEmailVerification = (verified) => ({
  type: types.USER_SET_EMAIL_VERIFICATION,
  verified,
});
