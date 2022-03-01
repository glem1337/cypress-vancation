import cookies from 'component-cookie';

export default (currentUser, { access, csrf, refresh }) => {
  const cookieOptions = { path: '/' };

  cookies('currentUser', JSON.stringify(currentUser), cookieOptions);
  cookies('access', access, cookieOptions);
  cookies('csrf', csrf, cookieOptions);
  cookies('refresh', refresh, cookieOptions);
};
