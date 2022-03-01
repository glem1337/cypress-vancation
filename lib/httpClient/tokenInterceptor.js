import cookies from 'next-cookies';

export default (ctx) => (config) => {
  const { access } = cookies(ctx);

  // eslint-disable-next-line no-param-reassign
  config.headers.common.Authorization = access ? `Bear ${access}` : null;
  return config;
};
