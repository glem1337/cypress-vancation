import cookies from 'component-cookie';

export default () => {
  const cookieOptions = { path: '/' };

  cookies('currentUser', null, cookieOptions);
  cookies('access', null, cookieOptions);
  cookies('csrf', null, cookieOptions);
  cookies('refresh', null, cookieOptions);
};
