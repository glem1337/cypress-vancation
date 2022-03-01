import { SOCIAL_LIST } from 'constants';
import { USER_AUTH_SOCIAL } from 'state/concepts/session/types';
import * as endpoints from '../endpoints';

it('userSignUpSocial()', () => {
  const social = SOCIAL_LIST.FACEBOOK.NAME;
  const expectedEndpoints = {
    url: `/accounts/session_with_${social}`,
    endpoint: `${USER_AUTH_SOCIAL} POST /accounts/session_with_${social}`,
  };

  expect(endpoints.userAuthSocialEndpoint(social)).toEqual(expectedEndpoints);
});
