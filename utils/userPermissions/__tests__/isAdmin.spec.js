import isAdmin from '../isAdmin';

describe('isAdmin()', () => {
  describe('when roleName is administrator', () => {
    it('returns true', () => {
      expect(isAdmin({ roleName: 'administrator' })).toEqual(true);
    });
  });

  describe('when roleName is user', () => {
    it('returns false', () => {
      expect(isAdmin({ roleName: 'user' })).toEqual(false);
    });
  });

  describe('when user is missing', () => {
    it('returns false', () => {
      expect(isAdmin(null)).toEqual(null);
    });
  });
});
