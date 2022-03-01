import endpoint from 'utils/endpoint';
import {
  USER_AUTH_SOCIAL,
  USER_SIGNOUT,
  USER_CREATE_NEW_PASSWORD,
  USER_RESET_PASSWORD,
  USER_CHECK_EMAIL_TOKEN,
  USER_CHECK_EMAIL_VERIFICATION_TOKEN,
} from 'state/concepts/session/types';
import {
  userAuthSocialRoute,
  userSessionRoute,
  userResetPasswordRoute,
  userEmailVerificationRoute,
} from 'lib/apiRoutes';

export const userAuthSocialEndpoint = (social) => endpoint(USER_AUTH_SOCIAL, 'POST', userAuthSocialRoute(social));
export const userSignOutEndpoint = endpoint(
  USER_SIGNOUT,
  'DELETE',
  userSessionRoute,
);
export const userResetPasswordEndpoint = endpoint(
  USER_RESET_PASSWORD,
  'POST',
  userResetPasswordRoute,
);
export const userCreateNewPasswordEndpoint = endpoint(
  USER_CREATE_NEW_PASSWORD,
  'PATCH',
  userResetPasswordRoute,
);

export const userCheckEmailTokenEndpoint = endpoint(
  USER_CHECK_EMAIL_TOKEN,
  'PATCH',
  userResetPasswordRoute,
);

export const userCheckEmailVerificationTokenEndpoint = endpoint(
  USER_CHECK_EMAIL_VERIFICATION_TOKEN,
  'GET',
  userEmailVerificationRoute,
);
