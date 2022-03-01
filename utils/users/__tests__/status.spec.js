import profileStatus from '../status';

describe('profileStatus()', () => {
  describe('when user active', () => {
    it('returns user profile status', () => {
      const user = { invited: false, active: true };

      expect(profileStatus(user)).toEqual('profileStatus.active');
    });
  });

  describe('when user deactivated', () => {
    it('returns user profile status', () => {
      const user = { invited: false, active: false };

      expect(profileStatus(user)).toEqual('profileStatus.deactivated');
    });
  });

  describe('when user invited', () => {
    it('returns user profile status', () => {
      const user = { invited: true, active: false };

      expect(profileStatus(user)).toEqual('profileStatus.pending');
    });
  });
});
