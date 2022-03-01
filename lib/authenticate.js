import cookies from 'next-cookies';
import redirect from 'utils/redirect';
import { USERS_STATUS } from 'constants';
import ROUTER from 'constants/routes';

const checkUser = ({ ctx, access }) => (!access ? redirect(ROUTER.LOGIN.PATH, ctx) : true);
const checkGuest = ({ ctx, access }) => (access ? redirect(ROUTER.INDEX.PATH, ctx) : true);

export default (accessLevel, ctx) => {
  const { access } = cookies(ctx);

  switch (accessLevel) {
    case USERS_STATUS.USER:
      return checkUser({ ctx, access });
    case USERS_STATUS.GUSTS:
      return checkGuest({ ctx, access });
    default:
      return checkGuest({ ctx, access });
  }
};
