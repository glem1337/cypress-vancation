import nodeCookie from 'cookie';
import browserCookie from 'component-cookie';

const removeCookieIsomorphic = (ctx, name, options = { path: '/' }) => {
  if (ctx && typeof window === 'undefined') {
    if (ctx.res.finished) { return; }
    const setCookieHeader = ctx.res.getHeader('Set-Cookie') || [];
    ctx.res.setHeader('Set-Cookie', [
      ...setCookieHeader,
      nodeCookie.serialize(name, '', { expires: new Date(), ...options }),
    ]);
  } else {
    browserCookie(name, null, options);
  }
};

export default removeCookieIsomorphic;
