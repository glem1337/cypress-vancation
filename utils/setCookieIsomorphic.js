import nodeCookie from 'cookie';
import browserCookie from 'component-cookie';

const setCookieIsomorphic = (ctx, name, value, options) => {
  if (ctx && typeof window === 'undefined') {
    ctx.res.setHeader('Set-Cookie', nodeCookie.serialize(name, value, options));
  } else {
    browserCookie(name, value, options);
  }
};

export default setCookieIsomorphic;
