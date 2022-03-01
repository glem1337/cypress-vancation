import Router from 'next/router';

export default (destination, ctx, method = 'push') => {
  // check if server-side render
  if (ctx && ctx.res) {
    ctx.res.writeHead(302, {
      Location: destination,
    });
    ctx.res.end();
  } else {
    Router[method](destination);
  }
};
