import { fetchOwnerProfile } from '../actions';

it('fetchOwnerProfile()', () => {
  const expectedAction = {
    type: 'owner/FETCH_OWNER_PROFILE',
  };

  expect(fetchOwnerProfile()).toEqual(expectedAction);
});
