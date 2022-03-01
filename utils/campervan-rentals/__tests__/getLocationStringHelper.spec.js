import getLocationStringHelper from '../getLocationStringHelper';

describe('getLocationStringHelper helper', () => {
  it('should return state and location', () => {
    const args = {
      state: 'state',
      location: 'location',
    };

    const result = getLocationStringHelper(args);

    expect(result).toBe(`${args.state} - ${args.location}`);
  });

  it('should return state only', () => {
    const args = {
      state: 'state',
      location: undefined,
    };

    const result = getLocationStringHelper(args);

    expect(result).toBe(args.state);
  });
});
