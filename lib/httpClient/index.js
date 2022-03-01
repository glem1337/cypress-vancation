import Axios from 'axios';
import qs from 'qs';

import { API_HOST } from 'constants';

const buildHttpClient = () => Axios.create({
  baseURL: `${API_HOST}/api/v1`,
  // workaround for axios bug https://github.com/axios/axios/issues/1664#issuecomment-415492981
  headers: {
    common: {},
  },
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' }),
});

export { default as mountInterceptors } from './mountInterceptors';
export default buildHttpClient;
