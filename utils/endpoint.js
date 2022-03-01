const endpoint = (feature, method, route) => ({
  endpoint: `${feature} ${method} ${route}`,
  url: route,
});

export default endpoint;
