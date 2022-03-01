import cookies from 'component-cookie';
import ROUTES from 'constants/routes';

export default ({ prevPage, currentPage }) => {
  const cookieOptions = { path: ROUTES.INDEX.PATH };

  cookies('prevPage', prevPage, cookieOptions);
  cookies('currentPage', currentPage, cookieOptions);
};
