export default (httpClient, accessToken) => {
  httpClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`; // eslint-disable-line no-param-reassign
};
