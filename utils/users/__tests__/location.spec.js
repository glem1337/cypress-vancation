import profileLocation from '../location';

describe('profileLocation()', () => {
  it('returns user profile', () => {
    expect(profileLocation({ city: 'New York', country: 'United States' })).toEqual('New York, United States');
  });
});
