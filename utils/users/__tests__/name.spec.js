import profileName from '../name';

describe('profileName()', () => {
  it('returns user profile full name', () => {
    expect(profileName({ firstName: 'Robert', lastName: 'Doe' })).toEqual('Robert Doe');
  });

  it('returns the dash when `firstName` or `lastName` is null', () => {
    expect(profileName({ firstName: null, lastName: null })).toEqual('—');
  });
});
