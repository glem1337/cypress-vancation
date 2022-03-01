import cookies from 'next-cookies';
import redirect from 'utils/redirect';
import { USERS_STATUS } from 'constants';
import ROUTES from 'constants/routes';
import authenticate from '../authenticate';

jest.mock('next-cookies', () => jest.fn(() => ({})));
jest.mock('utils/redirect', () => jest.fn());

describe('authenticate()', () => {
  const ctx = { ctxKey: 'ctx value' };
  const tokens = { access: 'access' };

  beforeEach(() => redirect.mockClear());

  describe('when accessLevel == user', () => {
    const accessLevel = USERS_STATUS.USER;

    it('triggers redirect if tokens absent', () => {
      expect(authenticate(accessLevel, ctx)).toEqual(undefined);
      expect(redirect).toHaveBeenCalledWith(ROUTES.LOGIN.PATH, ctx);
    });

    it('returns true if tokens exists', () => {
      cookies.mockReturnValueOnce(tokens);
      expect(authenticate(accessLevel, ctx)).toEqual(true);
    });
  });

  describe('when accessLevel == guest', () => {
    const accessLevel = USERS_STATUS.GUSTS;

    it('triggers redirect if tokens present', () => {
      cookies.mockReturnValueOnce(tokens);
      expect(authenticate(accessLevel, ctx)).toEqual(undefined);
      expect(redirect).toHaveBeenCalledWith(ROUTES.INDEX.PATH, ctx);
    });

    it('returns true if tokens absent', () => {
      cookies.mockReturnValueOnce(tokens);
      expect(authenticate('trash_accessLevel', ctx)).toEqual(undefined);
      expect(redirect).toHaveBeenCalledWith(ROUTES.INDEX.PATH, ctx);
    });

    it('returns true if tokens absent', () => {
      expect(authenticate(accessLevel, ctx)).toEqual(true);
    });
  });
});
