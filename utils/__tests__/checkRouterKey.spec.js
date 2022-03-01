import isRouteActive from '../isRouteActive';

describe('isRouteActive()', () => {
  it('right all arguments', () => {
    expect(isRouteActive({ active: 'test-path', key: 'TEST_PATH' })).toEqual(true);
  });

  it('first arg null', () => {
    expect(isRouteActive({ active: null, key: 'TEST_PATH' })).toEqual(false);
  });

  it('first arg null', () => {
    expect(isRouteActive({ active: 'test-path', key: null })).toEqual(false);
  });

  it('all arg null', () => {
    expect(isRouteActive({ active: null, key: null })).toEqual(false);
  });
});
