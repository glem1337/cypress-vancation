import normalize from 'json-api-normalizer';
import build from 'redux-object';

import fetchSelfResponse from 'state/concepts/users/__mocks__/fetchSelfResponse';
import profileInitials from '../initials';

const currentUserResponse = normalize(fetchSelfResponse.data);
const currentUser = build(currentUserResponse, 'users', fetchSelfResponse.data.data.id);

it('returns profile initials', () => {
  expect(profileInitials(currentUser)).toEqual(`${currentUser.firstName[0]}${currentUser.lastName[0]}`);
});
